import json
from framework.lamb.test import test
from support.auth_util import auth_util
from models.blog import blog
from models.user import user

class blogauth(test):
    name = "blogauth"
    
    def get_edit_endpoint(self, id):
        return "/blog/"+id+"/edit"

    def run(self):
        create_endpoint    = "/new"

        test_blog_id       = ""
        test_user_username = "test-user"
        test_user_password = "hunter2"
        test_blog_data     = {
            'title': "test blog title",
            'slug': "test-blog-slug",
            'text': "test blog text"
        }

        # create a temporary authenticated user        
        auth = auth_util()
        test_user = user(test_user_username, auth.hash(test_user_password))
        test_user_token = auth.token(test_user.id)

        # post create unauthorized reject test
        self.header("POST create unauthorized test")
        rsp = self.post_request({
            "path": create_endpoint,
        }, test_blog_data)
        expected = {'statusCode': 403, 'body': '"Forbidden"'}
        result = rsp['statusCode'] == 403 and rsp['body'] == '"Forbidden"'
        self.record(result, expected, rsp)

        # post create test
        self.header("POST create test")
        rsp = self.post_request({
            "path": create_endpoint,
            "headers": { "token": test_user_token, "userid": test_user.id }
        }, test_blog_data)
        expected = "'statusCode': 200 and 'id' in rsp['body'].keys()"
        rsp['body'] = json.loads(rsp['body'])
        result = rsp['statusCode'] == 200 and 'id' in rsp['body'].keys()
        self.record(result, expected, rsp)
        
        # so that we can remove test blog
        try:
            test_blog_id = rsp['body']['id']

            # duplicate reject test 
            self.header("POST create reject duplicate slug")
            rsp = self.post_request({
                "path": create_endpoint,
                "headers": { "token": test_user_token, "userid": test_user.id }
            }, test_blog_data)
            expected = "'statusCode': 400"
            result = rsp['statusCode'] == 400
            self.record(result, expected, rsp)

            test_blog_data.update({
                'title': test_blog_data['title'] + "-edited",
                'slug': test_blog_data['slug'] + "-edited",
                'text': test_blog_data['text'] + "-edited"
            })

            # unauthorized edit reject
            self.header("POST edit reject unauthorized")
            rsp = self.post_request({
                "path": self.get_edit_endpoint(test_blog_id)
            }, test_blog_data)
            expected = "'statusCode': 403"
            result = rsp['statusCode'] == 403
            self.record(result, expected, rsp)

            # successful edit
            self.header("POST edit successful")
            rsp = self.post_request({
                "path": self.get_edit_endpoint(test_blog_id),
                "headers": { "token": test_user_token, "userid": test_user.id }
            }, test_blog_data)

            expected = "'statusCode': 200 and " + test_blog_data['title'] + " in rsp['body'] and " + test_blog_data['slug'] + " in rsp['body'] and " + test_blog_data['text'] + " in rsp['body']"
            result = rsp['statusCode'] == 200 and test_blog_data['title'] in rsp['body'] and test_blog_data['slug'] in rsp['body'] and test_blog_data['text'] in rsp['body']
            self.record(result, expected, rsp)

        except Exception as e:
            self.fail(str(e))
            self.skip("cannot continue with blogauth tests, skipping")

        test_blog = blog.get(test_blog_id)
        if test_blog:
            test_blog.delete()

        return self.successful