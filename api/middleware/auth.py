from framework.lamb.middleware import middleware
from support.auth_util import auth_util

class auth(middleware):
    def process(self, event):
        auth = auth_util()
        token = self.header("token", event)
        userid = self.header("userid", event)
        
        if token and userid and auth.verify_token(token, userid):
            return event
        self.reject()
