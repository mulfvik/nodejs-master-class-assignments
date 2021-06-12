define({ "api": [
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
    "url": "/menus",
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
          "content": "{\n  token: gid1btk4b0qg3wyqyivg\n}",
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
          "content": "{\n  token: gid1btk4b0qg3wyqyivg\n}",
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
          "content": "{\n  token: gid1btk4b0qg3wyqyivg\n}",
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
