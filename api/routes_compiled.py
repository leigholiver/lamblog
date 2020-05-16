# this file is managed by lamb. any changes to it will be lost.
routes = {
    "GET": [
        {
            "action": "default.get",
            "middleware": [],
            "path": "\\/blog\\/(?P<id>.*?)\\/?$"
        },
        {
            "action": "default.get_slug",
            "middleware": [],
            "path": "\\/slug\\/(?P<slug>.*?)\\/?$"
        },
        {
            "action": "default.list",
            "middleware": [],
            "path": "\\/list\\/?$"
        },
        {
            "action": "default.latest",
            "middleware": [],
            "path": "\\/latest\\/?$"
        }
    ],
    "POST": [
        {
            "action": "default.create",
            "middleware": [
                "auth"
            ],
            "path": "\\/new\\/?$"
        },
        {
            "action": "default.edit",
            "middleware": [
                "auth"
            ],
            "path": "\\/blog\\/(?P<id>.*?)\\/edit\\/?$"
        },
        {
            "action": "default.login",
            "middleware": [],
            "path": "\\/login\\/?$"
        }
    ]
}