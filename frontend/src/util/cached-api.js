import { getList as api_getList, getBySlug as api_getBySlug, save as api_save } from './api';
const cacheTime = 60 * 1000;

export async function getList(before = null) {
    const key = JSON.stringify({'list': before});
    let cached = retrieve(key);
    if(!!cached) return cached;

    let data = await api_getList(before);
    store(key, data);
    cacheSlugsFromList(data);
    return data;
}

export async function getBySlug(slug) {
    const key = JSON.stringify({slug: slug});
    let cached = retrieve(key);
    if(!!cached) return cached;
    
    let data = await api_getBySlug(slug);
    store(key, data);
    return data;
}

export async function save(blog) {
    invalidateSlug(blog.slug);
    const data = await api_save(blog);
    store(getBlogCacheKey(data), data);
    return data;
}

function invalidateSlug(slug) {
    // invalidate the /latest page
    invalidate(JSON.stringify({'list': null}));

    // invalidate any pages that have the slug
    Object.keys(window.sessionStorage).map(function(c){
        const data = retrieve(c, true);
        if(!!data && data.includes(slug)) invalidate(c);
        return true;
    });
}

function cacheSlugsFromList(blogs) {
    for(let i=0; i<blogs.length; i++) {
        store(getBlogCacheKey(blogs[i]), blogs[i]);
    }
}

function getBlogCacheKey(blog) {
    return JSON.stringify({slug: blog.slug});
}

function store(key, data) {
    let obj = { cachedTime: Date.now(), data: data }
    window.sessionStorage.setItem(key, JSON.stringify(obj));
}

function retrieve(key, raw = false) {
    let item = window.sessionStorage.getItem(key);
    if(!item) return false;
    if(raw) return item;
    
    let data = JSON.parse(item);
    if(data.cachedTime + cacheTime < Date.now()) return false;
    return data.data;
}

function invalidate(key) {
    window.sessionStorage.removeItem(key);
}