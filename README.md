### lamblog
 
blog made to try out [lamb](https://github.com/leigholiver/lamb) and some react integration

see it in action on [my website](https://leigholiver.com)


#### development server

`./lambctl dev` will start the local development server

`http://localhost:3000/` for react dev endpoint

`http://localhost:5000/api` for api endpoint

`./lambctl frontend` to build the frontend static files, which can be tested via the dev server at `http://localhost:5000/`

`./lambctl seed` will create some test blogs

`./lambctl adminuser` will create an admin user


#### deployment

terraform should use your aws cli configuration, you can set the `aws_profile` variable in your environment json to switch profiles

`cp secrets.env.example secrets.env` and fill in the required info

update `environment/deployments/master.json` and `environment/deployments/staging.json` with your domain names

update `environment/state.tfvars` with the information of an s3 bucket to store state in

deployment is handled through github actions scripts which:
- run tests on pull requests
- deploy on push to staging/master branches

you need to set a secret in your github repo called `secrets` containing a `secrets.env`

`./lambctl deploy [-auto-approve|-y] [--ignore-tests|--skip-tests]` to deploy manually 

`./lambctl adminuser --live` will create an admin user for your current environment