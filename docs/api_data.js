define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C:\\_MIUL\\GIT\\nodejs-master-class-assignments\\HomeworkAssignment2\\docs\\main.js",
    "groupTitle": "C:\\_MIUL\\GIT\\nodejs-master-class-assignments\\HomeworkAssignment2\\docs\\main.js",
    "name": ""
  },
  {
    "version": "1.0.0",
    "name": "CreateCart",
    "group": "Carts",
    "type": "post",
    "url": "/carts",
    "title": "Create cart",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "menuItems",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n    \"menuItems\": [\n        {\n            \"id\": 1,\n            \"name\": \"Margarita\",\n            \"price\": 92\n        },\n        {\n            \"id\": 2,\n            \"name\": \"Calzone\",\n            \"price\": 109\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n    \"id\": \"ui04nlivf96zbajkvaxz\",\n    \"email\": \"john.doe@email.com\",\n    \"menuItems\": [\n        {\n            \"id\": 1,\n            \"name\": \"Margarita\",\n            \"toppings\": \"\",\n            \"price\": 92\n        },\n        {\n            \"id\": 2,\n            \"name\": \"Calzone\",\n            \"toppings\": \"Ham\",\n            \"price\": 109\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/cartsHandler.js",
    "groupTitle": "Carts"
  },
  {
    "version": "1.0.0",
    "name": "DeleteCart",
    "group": "Carts",
    "type": "del",
    "url": "/carts",
    "title": "Delete cart",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "cartId",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/carts?id=uiszdaz19pch42yfqktk",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/cartsHandler.js",
    "groupTitle": "Carts"
  },
  {
    "version": "1.0.0",
    "name": "GetCart",
    "group": "Carts",
    "type": "get",
    "url": "/carts",
    "title": "Get cart",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "cartId",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/carts?id=uiszdaz19pch42yfqktk",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n    \"id\": \"uiszdaz19pch42yfqktk\",\n    \"email\": \"john.doe@email.com\",\n    \"menuItems\": [\n        {\n            \"id\": 1,\n            \"name\": \"Margarita\",\n            \"toppings\": \"\",\n            \"price\": 92\n        },\n        {\n            \"id\": 1,\n            \"name\": \"Margarita\",\n            \"toppings\": \"\",\n            \"price\": 109\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/cartsHandler.js",
    "groupTitle": "Carts"
  },
  {
    "version": "1.0.0",
    "name": "UpdateCart",
    "group": "Carts",
    "type": "put",
    "url": "/carts",
    "title": "Update cart",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "menuItems",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/carts?id=uiszdaz19pch42yfqktk",
          "type": "json"
        },
        {
          "title": "Request body example",
          "content": "{\n    \"menuItems\": [\n        {\n            \"id\": 1,\n            \"name\": \"Margarita\",\n            \"price\": 92\n        },\n        {\n            \"id\": 2,\n            \"name\": \"Calzone\",\n            \"price\": 109\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/cartsHandler.js",
    "groupTitle": "Carts"
  },
  {
    "version": "1.0.0",
    "name": "GetMenu",
    "group": "Menu",
    "type": "get",
    "url": "/menus",
    "title": "Get menu",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "menu",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n  \"menu\": \"pizza\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/menusHandler.js",
    "groupTitle": "Menu"
  },
  {
    "version": "1.0.0",
    "name": "GetMenuItem",
    "group": "Menu",
    "type": "get",
    "url": "/menuItem?id",
    "title": "Get menu item",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "menu",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request query example:",
          "content": "/menuItem?id=3",
          "type": "json"
        },
        {
          "title": "Request body example",
          "content": "{\n  \"menu\": \"pizza\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/menuItemsHandler.js",
    "groupTitle": "Menu"
  },
  {
    "version": "1.0.0",
    "name": "CreateOrder",
    "group": "Orders",
    "type": "post",
    "url": "/orders",
    "title": "Create order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "cartId",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n  \"cartId\": \"ui04nlivf96zbajkvaxz\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/ordersHandler.js",
    "groupTitle": "Orders"
  },
  {
    "version": "1.0.0",
    "name": "GetOrders",
    "group": "Orders",
    "type": "get",
    "url": "/orders",
    "title": "Get order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "orderId",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/orders?id=5chf43l8zge8r0too909",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n    \"id\": \"5chf43l8zge8r0too909\",\n    \"email\": \"john.doe@email.com\",\n    \"cartId\": \"ui04nlivf96zbajkvaxz\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/ordersHandler.js",
    "groupTitle": "Orders"
  },
  {
    "version": "1.0.0",
    "name": "CreateToken",
    "group": "Tokens",
    "type": "post",
    "url": "/tokens",
    "title": "Create token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n  \"email\": \"john.doe@email.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n  \"email\": \"john.doe@email.com\",\n  \"id\": \"gid1btk4b0qg3wyqyivg\",\n  \"expires\": 1554639663830\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/tokensHandler.js",
    "groupTitle": "Tokens"
  },
  {
    "version": "1.0.0",
    "name": "DeleteToken",
    "group": "Tokens",
    "type": "delete",
    "url": "/tokens?id",
    "title": "Delete token",
    "parameter": {
      "examples": [
        {
          "title": "Request example",
          "content": "/tokens?id=gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/tokensHandler.js",
    "groupTitle": "Tokens"
  },
  {
    "version": "1.0.0",
    "name": "GetToken",
    "group": "Tokens",
    "type": "get",
    "url": "/tokens?id",
    "title": "Get token",
    "parameter": {
      "examples": [
        {
          "title": "Request example:",
          "content": "/tokens?id=1234567890",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n  \"email\": \"john.doe@email.com\",\n  \"id\": \"gid1btk4b0qg3wyqyivg\",\n  \"expires\": 1554639663830\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/tokensHandler.js",
    "groupTitle": "Tokens"
  },
  {
    "version": "1.0.0",
    "name": "UpdateToken",
    "group": "Tokens",
    "type": "put",
    "url": "/tokens",
    "title": "Update token",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "extend",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n  \"id\": \"gid1btk4b0qg3wyqyivg\",\n  \"extend\": true\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Success body",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/tokensHandler.js",
    "groupTitle": "Tokens"
  },
  {
    "version": "1.0.0",
    "name": "CreateUser",
    "group": "Users",
    "type": "post",
    "url": "/users",
    "title": "Create user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "streetAdress",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example",
          "content": "{\n  \"name\": \"John Doe\",\n  \"streetAddress\": \"Street 7\",\n  \"email\": \"john.doe@email.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/usersHandler.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "name": "DeleteUser",
    "group": "Users",
    "type": "delete",
    "url": "/users?email",
    "title": "Delete user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/users?email=john.doe@email.com",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/usersHandler.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "name": "GetUser",
    "group": "Users",
    "type": "get",
    "url": "/users?email",
    "title": "Get user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request example",
          "content": "/users?email=john.doe@email.com",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        },
        {
          "title": "Response body example",
          "content": "{\n  \"name\": \"John Doe\",\n  \"streetAddress\": \"Street 7\",\n  \"email\": \"john.doe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/usersHandler.js",
    "groupTitle": "Users"
  },
  {
    "version": "1.0.0",
    "name": "UpdateUser",
    "group": "Users",
    "type": "put",
    "url": "/users",
    "title": "Update user",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "token",
            "description": "<p>Active token required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header example",
          "content": "token: gid1btk4b0qg3wyqyivg",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": "<p>Required</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "streetAdress",
            "description": "<p>Optional</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": "<p>Optional</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request body example (at least one optional must be specified)",
          "content": "{\n  \"email\": \"john.doe@email.com\",\n  \"name\": \"new name\",\n  \"streetAddress\": \"new street adress\",\n  \"password\": \"new password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "./handlers/usersHandler.js",
    "groupTitle": "Users"
  }
] });
