##
# {
#     methods: [ "GET" and/or "POST" ]
#     action: controller_class.function
#     middleware: [] # array of middleware class names to apply to the route
# }
##
routes = {
    "/blog/(id)": { 
        "methods": [ "GET" ],
        "action": "default.get",
        "middleware": []
    },
    "/slug/(slug)": { 
        "methods": [ "GET" ],
        "action": "default.get_slug",
        "middleware": []
    },
    "/list": { 
        "methods": [ "GET" ],
        "action": "default.list",
        "middleware": []
    },
    "/latest": { 
        "methods": [ "GET" ],
        "action": "default.latest",
        "middleware": []
    },
    "/new": { 
        "methods": [ "POST" ],
        "action": "default.create",
        "middleware": [ "auth" ]
    },
    "/blog/(id)/edit": { 
        "methods": [ "POST" ],
        "action": "default.edit",
        "middleware": [ "auth" ]
    },
    "/login": { 
        "methods": [ "POST" ],
        "action": "default.login",
        "middleware": []
    },
}