from framework.lamb.controller import controller
from models.blog import blog
from models.user import user
from support.auth_util import auth_util

class default(controller):
    def get(self, event, id):
        b = blog.get(id)
        if b:
            return self.respond(200, b.data)
        else:
            return self.respond(404, "Not Found")
    
    def get_slug(self, event, slug):
        slugs = blog.find({"slug": slug})
        if len(slugs) > 0:
            return self.respond(200, slugs[0].data)
        else:
            return self.respond(404, "Not Found")

    def list(self, event):
        before = self.query(event, "before") if self.query(event, "before") != False else ""
        blogs = blog.list(before=before,
                    direction="desc",
                    limit=5)
        output = []
        for b in blogs:
            output.append(b.data)
        return self.respond(200, output)

    def latest(self, event):
        b = blog.list(direction="desc", limit=1)
        if b and len(b) == 1:
            return self.respond(200, b[0].data)
        return self.respond(404, "Not Found")

    def create(self, event):
        b = blog()
        return self.update_blog(b, event)

    def edit(self, event, id):
        b = blog.get(id)
        if not b:
            return self.respond(404, "Not Found")
        return self.update_blog(b, event)

    def update_blog(self, b, event):
        b.update(event['body'])
        if not b.is_valid():
            return self.respond(400, "Bad Request")
        b.save()
        return self.respond(200, b.data)

    def login(self, event):
        if not event['body']['username'] or not event['body']['password']:
            print("a")
            return self.respond(400, "Bad Request")

        u = user.find({'username': event['body']['username']})
        if len(u) != 1:
            print("b")
            return self.respond(403, "Forbidden")

        auth = auth_util()
        if not auth.verify_hash(event['body']['password'], u[0].password):
            print("c")
            return self.respond(403, "Forbidden")

        return self.respond(200, {
            "userid": u[0].id,
            "token": auth.token(u[0].id)
        })

