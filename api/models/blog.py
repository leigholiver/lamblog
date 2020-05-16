import datetime
from framework.lamb.model import model

class blog(model):
    def __init__(self):
        super(blog, self).__init__()
        self.table = "blog"
        self.fillable = ["slug", "title", "text"]
        self.indexes = ["slug"]
        self.sort_key = "created"
        self.created = datetime.datetime.now().isoformat()

    def is_valid(self):
        slugs = self.find({ "slug": self.slug })
        valid_slug = len(slugs) == 0 or (len(slugs) == 1 and slugs[0].id == self.id)
        try:
            return self.slug and self.title and self.text and valid_slug
        except:
            pass
        return False