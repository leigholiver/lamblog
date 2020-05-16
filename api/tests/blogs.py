import json, datetime
from framework.lamb.test import test
from models.blog import blog

class blogs(test):
    name = "blogs"
    test_slug = "test-blog-slug"
    
    def run(self):
        tmp_blogs = []
        test_blog_data = {
            'title': "test blog title",
            'slug': self.test_slug,
            'text': "test blog text"
        }

        # lets make ourselves a test blog here
        test_blog = blog()
        test_blog.update(test_blog_data)

        # whole test wrapped in a try catch so that 
        # we can clean up the test blogs afterwards 
        try:        
            test_blog.save()

            one_blog_time = datetime.datetime.now().isoformat()

            # make 10 blogs
            for i in range(0, 10):
                b = blog()
                test_blog_data.update({
                    'slug': self.test_slug  + "-" + str(i) 
                })
                b.update(test_blog_data)
                b.save()
                tmp_blogs.append(b)

            # blog 404 test 
            self.header("get 404")
            rsp = self.get_request({
                "path":"/blog/this-id-probably-doesnt-exist-2342jasrasrdfjsdfmnweor"
            })
            expected = {'statusCode': 404, 'body': '"Not Found"'}
            result = rsp['statusCode'] == 404 and rsp['body'] == '"Not Found"'
            self.record(result, expected, rsp)

            # get by id test
            self.header("get blog by id")
            rsp = self.get_request({
                "path":"/blog/" + test_blog.id
            })
            expected = "'statusCode': 200 and " + test_blog.id + " in body"
            result = rsp['statusCode'] == 200 and test_blog.id in rsp['body']
            self.record(result, expected, rsp)

            # get by slug test 
            self.header("get blog by slug")
            rsp = self.get_request({
                "path":"/slug/" + test_blog.slug
            })
            expected = "'statusCode': 200 and " + test_blog.id + " in body"
            result = rsp['statusCode'] == 200 and test_blog.id in rsp['body']
            self.record(result, expected, rsp)

            # latest 5
            self.header("/list latest 5")
            rsp = self.get_request({
                "path":"/list"
            })
            expected = "'statusCode': 200 and '" + tmp_blogs[5].id + "' in rsp body and '" + tmp_blogs[9].id + "' in rsp body"
            result = rsp['statusCode'] == 200 and tmp_blogs[5].id in rsp['body'] and tmp_blogs[9].id in rsp['body']
            self.record(result, expected, rsp)
            if not result:
                for bl in tmp_blogs:
                    self.info(bl.id + " - " + str(bl.id in rsp['body']))


            # list before we started the tmp_blogs
            self.header("/list before test 1 (one_blog_time)")
            rsp = self.get_request({
                "path":"/list",
                "queryStringParameters": {
                    "before": one_blog_time
                }
            })
            expected = "'statusCode': 200 and '" + test_blog.id + "' in rsp body"
            result = rsp['statusCode'] == 200 and test_blog.id in rsp['body']
            self.record(result, expected, rsp)

            # get latest test 
            self.header("get latest blog")
            rsp = self.get_request({
                "path":"/latest"
            })
            expected = "'statusCode': 200 and " + tmp_blogs[-1].id + " in body"
            result = rsp['statusCode'] == 200 and tmp_blogs[-1].id in rsp['body']
            self.record(result, expected, rsp)

        except Exception as e:
            self.fail(e)

        # cleanup
        test_blog.delete()
        for b in tmp_blogs:
            b.delete()            

        return self.successful