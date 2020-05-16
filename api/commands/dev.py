import os,subprocess
from framework.lamb.command import command
from framework.commands.dev import dev as lamb_dev

# override the default lamb dev server to also start the frontend
class dev(command):
    def run(self, data):
        # start the dev servers
        dev   = subprocess.Popen(lamb_dev().command, shell=True)
        react = subprocess.Popen("cd frontend && REACT_APP_API_URL=http://localhost:5000/api yarn start", shell=True)
        
        # wait for them to finish or w/e
        try:
            dev.communicate()
            react.communicate()
        except KeyboardInterrupt:
            print("exiting...")