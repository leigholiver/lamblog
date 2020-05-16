import request from './request';
import { getAuth } from './auth';

export async function getList(before = null) {
    return request("GET", "/list" + (before? "?before="+before : ""));
}

export async function getBySlug(slug) {
    return request("GET", "/slug/" + slug);
}

export async function save(blog) {
    const url = blog.id === "" ? "/new" : `/blog/${blog.id}/edit`;
    return request("POST", url, blog, getAuth());
}
