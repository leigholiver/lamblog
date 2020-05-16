from getpass import getpass
from framework.lamb.command import command
from support.auth_util import auth_util
from models.user import user

class adminuser(command):
    def run(self, data):
        auth = auth_util()
        username = input("enter admin username: ")
        password = getpass()
        u = user(username, auth.hash(password))
        u.save()        
        print("admin user " + username + " created with id " + u.id)
        print("log in with these details at /login")
        return True