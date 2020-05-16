from framework.lamb.model import model

class user(model):
    def __init__(self, username="", password=""):
        super(user, self).__init__()
        self.table = "user"
        self.fillable = [ 'username' ]
        self.indexes = [ 'username' ]
        self.username = username
        self.password = password