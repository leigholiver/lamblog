import os, jwt, datetime, bcrypt

class auth_util():
    secret    = os.getenv('JWT_SECRET') if os.getenv('JWT_SECRET') else "ThisIsNotASecret"
    algorithm = 'HS256'

    def hash(self, password):
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode("utf-8")

    def verify_hash(self, p_hash, password):
        try:
            return bcrypt.checkpw(p_hash.encode("utf-8"), password.encode())
        except Exception as e:
            pass    
        return False

    def token(self, userid):
        encoded_jwt = jwt.encode(self.default_token({'userid': userid}), self.secret, algorithm=self.algorithm).decode("utf-8")
        return encoded_jwt

    def verify_token(self, token, userid):
        try:
            decoded_jwt = jwt.decode(token, self.secret, algorithms=[self.algorithm])
        except:
            return False
        return decoded_jwt['userid'] == userid

    def default_token(self, fields):
        token = {
            "created": datetime.datetime.now().isoformat()
        }
        token.update(fields)
        return token