import json
from framework.lamb.test import test
from support.auth_util import auth_util
from models.user import user

class auth(test):
    name = "auth"
    
    def run(self):
        auth = auth_util()

        test_user_username = "test-user"
        test_user_password = "hunter2"
        test_user_hash = auth.hash(test_user_password)
        test_user = user(test_user_username, test_user_hash)
        test_user_token = auth.token(test_user.id)

        self.header("valid hash test")
        result = auth.verify_hash(test_user_password, test_user_hash)
        self.record(result, "valid hash", result)

        self.header("invalid hash test")
        result = auth.verify_hash("invalid-hash-probably-wouldnt-that-be-funny-though", test_user_password)
        self.record(result == False, "invalid hash", result)
        
        self.header("verify token test")
        result = auth.verify_token(test_user_token, test_user.id)
        self.record(result, "valid token", result)

        self.header("invalid token test")
        result = auth.verify_token("invalid-token-really-though-think-about-it", test_user.id)
        self.record(result == False, "invalid token", result)

        test_user.save()

        # wrapped in a try catch so that we can delete the test user
        try:
            self.header("failed login test")
            rsp = self.post_request({
                "path": "/login",
            }, {
                "username": test_user_username,
                "password": "this isnt my password"
            })
            expected = {'statusCode': 403, 'body': '"Forbidden"'}
            result = rsp['statusCode'] == 403 and rsp['body'] == '"Forbidden"'
            self.record(result, expected, rsp)

            self.header("successful login test")
            rsp = self.post_request({
                "path": "/login",
            }, {
                "username": test_user_username,
                "password": test_user_password
            })
            expected = "'statusCode': 200 and a valid token"
            token = json.loads(rsp['body'])
            token = token['token'] if 'token' in token.keys() else ""
            result = rsp['statusCode'] == 200 and auth.verify_token(token, test_user.id)
            self.record(result, expected, rsp)
        except Exception as e:
            self.fail(e)

        test_user.delete()

        return self.successful