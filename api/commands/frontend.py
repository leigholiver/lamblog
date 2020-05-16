import os
from framework.lamb.command import command
from framework.util.hash_util import hash_util
from framework.util.env_util import env_util

class frontend(command):
    def run(self, data):
        hasher  = hash_util()
        e_util  = env_util()
        env     = e_util.get_full()
        
        api_url = "http://localhost:5000/api"
        if 'domain_name' in env.keys():
            api_url = "https://" + env['domain_name'] + "/api"

        dir_changed     = hasher.has_changed(os.getcwd() + "/frontend", [ "/frontend/node_modules", "/frontend/build" ])
        api_url_changed = hasher.key_changed('api_url', api_url)

        if dir_changed or api_url_changed or '-y' in data:
            os.chdir("frontend")
            result = os.system('REACT_APP_API_URL=' + api_url + ' yarn build')
            os.chdir("..")
            if result != 0:
                return False                
        else:
            print("no /frontend build needed, skipping")
        return True