---
title: Role Based Access Control v1.0.0
language_tabs:
  - go: Go
  - javascript: JavaScript
  - python: Python
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

# Role Based Access Control v1.0.0 {% #role-based-access-control %}

The API for Role Based Access Control.

Base URLs:

- [/api/rbac/v1](/api/rbac/v1)

# Authentication

- HTTP Authentication, scheme: basic<br/>The userid/password is needed when accessing this API externally

# Principal {% #role-based-access-control-principal %}

Operations about principals

##  List the principals for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/principals/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/principals/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/principals/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /principals/`

By default, responses are sorted in ascending order by username

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|match_criteria|query|string|false|Parameter for specifying the matching criteria for an object's name and/or email. Currently, match_criteria of partial searches for a username/email using "starts with" pattern.|
|usernames|query|string|false|Comma separated usernames of principals to get. If match_criteria is specified, only the first username will be picked up for search.|
|sort_order|query|string|false|The sort order of the query, either ascending or descending. Defaults to ascending.|
|email|query|string|false|E-mail address of principal to search for. Could be combined with match_criteria for searching.|
|status|query|string|false|Set the status of users to get back.|
|admin_only|query|string|false|Get only admin users within an account. Setting this would ignore the parameters: usernames, email|
|order_by|query|string|false|Parameter for ordering principals by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-username|
|username_only|query|boolean|false|Parameter for optionally returning only usernames for principals, bypassing a call to IT.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|match_criteria|partial|
|match_criteria|exact|
|sort_order|asc|
|sort_order|desc|
|status|enabled|
|status|disabled|
|status|all|
|admin_only|true|
|admin_only|false|
|order_by|username|
|username_only|true|
|username_only|false|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "required": [
                  "username",
                  "email"
                ],
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "smithj"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "example": "smithj@mytechco.com"
                  },
                  "first_name": {
                    "type": "string",
                    "example": "John"
                  },
                  "last_name": {
                    "type": "string",
                    "example": "Smith"
                  },
                  "is_active": {
                    "type": "boolean"
                  },
                  "is_org_admin": {
                    "type": "boolean"
                  }
                }
              },
              {
                "required": [
                  "username"
                ],
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "smithj"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of principals|[PrincipalPagination](#schemaprincipalpagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list principals|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Group {% #role-based-access-control-group %}

Operations about groups

##  Create a group in a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/groups/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "GroupA"
    },
    "description": {
      "type": "string",
      "example": "A description of GroupA"
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/groups/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /groups/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "GroupA"
    },
    "description": {
      "type": "string",
      "example": "A description of GroupA"
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[Group](#schemagroup)|true|Group to create in tenant|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 201 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "GroupA"
        },
        "description": {
          "type": "string",
          "example": "A description of GroupA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "properties": {
        "principalCount": {
          "type": "integer",
          "minimum": 0
        },
        "roleCount": {
          "type": "integer",
          "minimum": 0
        },
        "system": {
          "type": "boolean",
          "default": false
        },
        "platform_default": {
          "type": "boolean",
          "default": false
        },
        "admin_default": {
          "type": "boolean",
          "default": false
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the group|[GroupOut](#schemagroupout)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to create group|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  List the groups for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/groups/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/groups/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /groups/`

By default, responses are sorted in ascending order by group name

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|name|query|string|false|Parameter for filtering resource by name using string contains search.|
|name_match|query|string|false|Parameter for specifying the matching criteria for an object's name or display_name.|
|scope|query|string|false|Parameter for filtering resource by scope.|
|username|query|string|false|A username for a principal to filter for groups|
|uuid|query|array[string]|false|A list of UUIDs to filter listed groups.|
|role_names|query|array[string]|false|List of role name to filter for groups. It is exact match but case-insensitive|
|role_discriminator|query|string|false|Discriminator that works with role_names to indicate matching all/any of the role names|
|order_by|query|string|false|Parameter for ordering groups by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-name|
|platform_default|query|boolean|false|An optional flag to return either platform default or non-platform default groups.|
|admin_default|query|boolean|false|An optional flag to return either admin default or non-admin default groups.|
|system|query|boolean|false|An optional flag to return either system or non-system groups.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|name_match|partial|
|name_match|exact|
|scope|account|
|scope|principal|
|role_discriminator|all|
|role_discriminator|any|
|order_by|name|
|order_by|modified|
|order_by|principalCount|
|order_by|policyCount|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "GroupA"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of GroupA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "principalCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "roleCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of group objects|[GroupPagination](#schemagrouppagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list groups|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/groups/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/groups/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /groups/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to get|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "GroupA"
        },
        "description": {
          "type": "string",
          "example": "A description of GroupA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "principals",
        "roles"
      ],
      "properties": {
        "principals": {
          "type": "array",
          "items": {
            "required": [
              "username",
              "email"
            ],
            "properties": {
              "username": {
                "type": "string",
                "example": "smithj"
              },
              "email": {
                "type": "string",
                "format": "email",
                "example": "smithj@mytechco.com"
              },
              "first_name": {
                "type": "string",
                "example": "John"
              },
              "last_name": {
                "type": "string",
                "example": "Smith"
              },
              "is_active": {
                "type": "boolean"
              },
              "is_org_admin": {
                "type": "boolean"
              }
            }
          }
        },
        "roles": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Group object|[GroupWithPrincipalsAndRoles](#schemagroupwithprincipalsandroles)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Update a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/api/rbac/v1/groups/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "GroupA"
    },
    "description": {
      "type": "string",
      "example": "A description of GroupA"
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/rbac/v1/groups/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PUT /groups/{uuid}/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "example": "GroupA"
    },
    "description": {
      "type": "string",
      "example": "A description of GroupA"
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to update|
|body|body|[Group](#schemagroup)|true|Group to update in tenant|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "GroupA"
        },
        "description": {
          "type": "string",
          "example": "A description of GroupA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "properties": {
        "principalCount": {
          "type": "integer",
          "minimum": 0
        },
        "roleCount": {
          "type": "integer",
          "minimum": 0
        },
        "system": {
          "type": "boolean",
          "default": false
        },
        "platform_default": {
          "type": "boolean",
          "default": false
        },
        "admin_default": {
          "type": "boolean",
          "default": false
        }
      }
    }
  ]
}
```

> 404 Response

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Group updated|[GroupOut](#schemagroupout)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to update group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Delete a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/rbac/v1/groups/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/rbac/v1/groups/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /groups/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to delete|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 403 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "You do not have permission to perform this action."
          },
          "source": {
            "type": "string",
            "example": "detail"
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

> 404 Response

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Group deleted|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to delete group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Add a principal to a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/groups/{uuid}/principals/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "principals"
  ],
  "properties": {
    "principals": {
      "type": "array",
      "items": {
        "required": [
          "username"
        ],
        "properties": {
          "username": {
            "type": "string",
            "example": "smithj"
          }
        }
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/principals/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/groups/{uuid}/principals/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /groups/{uuid}/principals/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "principals"
  ],
  "properties": {
    "principals": {
      "type": "array",
      "items": {
        "required": [
          "username"
        ],
        "properties": {
          "username": {
            "type": "string",
            "example": "smithj"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to update|
|body|body|[GroupPrincipalIn](#schemagroupprincipalin)|true|Principal to add to a group|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "GroupA"
        },
        "description": {
          "type": "string",
          "example": "A description of GroupA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "principals",
        "roles"
      ],
      "properties": {
        "principals": {
          "type": "array",
          "items": {
            "required": [
              "username",
              "email"
            ],
            "properties": {
              "username": {
                "type": "string",
                "example": "smithj"
              },
              "email": {
                "type": "string",
                "format": "email",
                "example": "smithj@mytechco.com"
              },
              "first_name": {
                "type": "string",
                "example": "John"
              },
              "last_name": {
                "type": "string",
                "example": "Smith"
              },
              "is_active": {
                "type": "boolean"
              },
              "is_org_admin": {
                "type": "boolean"
              }
            }
          }
        },
        "roles": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Group updated|[GroupWithPrincipalsAndRoles](#schemagroupwithprincipalsandroles)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to update principals in group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get a list of principals from a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/groups/{uuid}/principals/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/principals/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/groups/{uuid}/principals/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /groups/{uuid}/principals/`

By default, responses are sorted in ascending order by username

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group from which to get principals|
|principal_username|query|string|false|Parameter for filtering group principals by principal `username` using string contains search.|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|order_by|query|string|false|Parameter for ordering principals by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-username|
|username_only|query|boolean|false|Parameter for optionally returning only usernames for principals, bypassing a call to IT.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|username|
|username_only|true|
|username_only|false|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "required": [
                  "username",
                  "email"
                ],
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "smithj"
                  },
                  "email": {
                    "type": "string",
                    "format": "email",
                    "example": "smithj@mytechco.com"
                  },
                  "first_name": {
                    "type": "string",
                    "example": "John"
                  },
                  "last_name": {
                    "type": "string",
                    "example": "Smith"
                  },
                  "is_active": {
                    "type": "boolean"
                  },
                  "is_org_admin": {
                    "type": "boolean"
                  }
                }
              },
              {
                "required": [
                  "username"
                ],
                "properties": {
                  "username": {
                    "type": "string",
                    "example": "smithj"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of principals attached to group|[PrincipalPagination](#schemaprincipalpagination)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Remove a principal from a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/rbac/v1/groups/{uuid}/principals/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/principals/?usernames=type,string',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/rbac/v1/groups/{uuid}/principals/', params={
  'usernames': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /groups/{uuid}/principals/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to update|
|usernames|query|string|true|A comma separated list of usernames for principals to remove from the group|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 403 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "You do not have permission to perform this action."
          },
          "source": {
            "type": "string",
            "example": "detail"
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Principals removed from group|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to remove principals from group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  List the roles for a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/groups/{uuid}/roles/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/roles/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/groups/{uuid}/roles/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /groups/{uuid}/roles/`

By default, responses are sorted in ascending order by role name

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group|
|exclude|query|boolean|false|If this is set to true, the result would be roles excluding the ones in the group|
|role_name|query|string|false|Parameter for filtering group roles by role `name` using string contains search.|
|role_display_name|query|string|false|Parameter for filtering group roles by role `display_name` using string contains search.|
|role_description|query|string|false|Parameter for filtering group roles by role `description` using string contains search.|
|role_system|query|boolean|false|Parameter for filtering group roles by system flag.|
|role_external_tenant|query|string|false|Parameter for filtering group roles by role `external_tenant` using string search.|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|order_by|query|string|false|Parameter for ordering roles by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|name|
|order_by|display_name|
|order_by|modified|
|order_by|policyCount|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of roles for a group|[GroupRolesPagination](#schemagrouprolespagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list roles for group|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Add a role to a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/groups/{uuid}/roles/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "roles"
  ],
  "properties": {
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid",
        "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/roles/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/groups/{uuid}/roles/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /groups/{uuid}/roles/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "roles"
  ],
  "properties": {
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "format": "uuid",
        "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
      }
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to update|
|body|body|[GroupRoleIn](#schemagrouprolein)|true|Role to add to a group|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "required": [
    "data"
  ],
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "allOf": [
          {
            "required": [
              "name"
            ],
            "properties": {
              "name": {
                "type": "string",
                "example": "RoleA"
              },
              "display_name": {
                "type": "string",
                "example": "ARoleName"
              },
              "description": {
                "type": "string",
                "example": "A description of RoleA"
              }
            }
          },
          {
            "type": "object",
            "required": [
              "uuid"
            ],
            "properties": {
              "uuid": {
                "type": "string",
                "format": "uuid",
                "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
              }
            }
          },
          {
            "type": "object",
            "required": [
              "created",
              "modified"
            ],
            "properties": {
              "created": {
                "type": "string",
                "format": "date-time",
                "example": "2019-01-21T17:32:28Z"
              },
              "modified": {
                "type": "string",
                "format": "date-time",
                "example": "2019-03-04T07:25:58Z"
              }
            }
          },
          {
            "properties": {
              "policyCount": {
                "type": "integer",
                "minimum": 0
              },
              "accessCount": {
                "type": "integer",
                "minimum": 0
              },
              "applications": {
                "type": "array",
                "items": {
                  "type": "string",
                  "example": "catalog"
                }
              },
              "system": {
                "type": "boolean",
                "default": false
              },
              "platform_default": {
                "type": "boolean",
                "default": false
              },
              "admin_default": {
                "type": "boolean",
                "default": false
              },
              "external_role_id": {
                "type": "string",
                "example": "ExternalRoleId"
              },
              "external_tenant": {
                "type": "string",
                "example": "ExternalTenant"
              }
            }
          }
        ]
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Group updated|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to update roles for group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[allOf]|true|none|none|

*allOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|object|false|none|none|
|»»» name|string|true|none|none|
|»»» display_name|string|false|none|none|
|»»» description|string|false|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[UUID](#schemauuid)|false|none|none|
|»»» uuid|string(uuid)|true|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[Timestamped](#schematimestamped)|false|none|none|
|»»» created|string(date-time)|true|none|none|
|»»» modified|string(date-time)|true|none|none|

*and*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|object|false|none|none|
|»»» policyCount|integer|false|none|none|
|»»» accessCount|integer|false|none|none|
|»»» applications|[string]|false|none|none|
|»»» system|boolean|false|none|none|
|»»» platform_default|boolean|false|none|none|
|»»» admin_default|boolean|false|none|none|
|»»» external_role_id|string|false|none|none|
|»»» external_tenant|string|false|none|none|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Remove a role from a group in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/rbac/v1/groups/{uuid}/roles/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/groups/{uuid}/roles/?roles=type,string',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/rbac/v1/groups/{uuid}/roles/', params={
  'roles': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /groups/{uuid}/roles/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of group to update|
|roles|query|string|true|A comma separated list of role UUIDs for roles to remove from the group|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 403 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "You do not have permission to perform this action."
          },
          "source": {
            "type": "string",
            "example": "detail"
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Roles removed from group|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Input|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to remove roles from group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Role {% #role-based-access-control-role %}

Operations about roles

##  Create a roles for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/roles/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "RoleA"
        },
        "display_name": {
          "type": "string",
          "example": "ARoleName"
        },
        "description": {
          "type": "string",
          "example": "A description of RoleA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/roles/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /roles/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "RoleA"
        },
        "display_name": {
          "type": "string",
          "example": "ARoleName"
        },
        "description": {
          "type": "string",
          "example": "A description of RoleA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RoleIn](#schemarolein)|true|Role to create|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 201 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "RoleA"
            },
            "display_name": {
              "type": "string",
              "example": "ARoleName"
            },
            "description": {
              "type": "string",
              "example": "A description of RoleA"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "uuid"
          ],
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid",
              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "created",
            "modified"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "modified": {
              "type": "string",
              "format": "date-time",
              "example": "2019-03-04T07:25:58Z"
            }
          }
        },
        {
          "properties": {
            "policyCount": {
              "type": "integer",
              "minimum": 0
            },
            "accessCount": {
              "type": "integer",
              "minimum": 0
            },
            "applications": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "catalog"
              }
            },
            "system": {
              "type": "boolean",
              "default": false
            },
            "platform_default": {
              "type": "boolean",
              "default": false
            },
            "admin_default": {
              "type": "boolean",
              "default": false
            },
            "external_role_id": {
              "type": "string",
              "example": "ExternalRoleId"
            },
            "external_tenant": {
              "type": "string",
              "example": "ExternalTenant"
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the role|[RoleWithAccess](#schemarolewithaccess)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to create role|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  List the roles for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/roles/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/roles/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /roles/`

By default, responses are sorted in ascending order by role name

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|name|query|string|false|Parameter for filtering resource by name using string contains search.|
|system|query|boolean|false|Parameter for filtering resource by system flag.|
|display_name|query|string|false|Parameter for filtering resource by display_name using string contains search.|
|name_match|query|string|false|Parameter for specifying the matching criteria for an object's name or display_name.|
|scope|query|string|false|Parameter for filtering resource by scope.|
|order_by|query|string|false|Parameter for ordering roles by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-name|
|add_fields|query|array[string]|false|Parameter for add list of fields to display for roles.|
|username|query|string|false|Unique username of the principal to obtain roles for (only available for admins, and if supplied, takes precedence over the identity header).|
|application|query|string|false|The application name(s) to filter roles by, from permissions. This is an exact match. You may also use a comma-separated list to match on multiple applications.|
|permission|query|string|false|The permission(s) to filter roles by. This is an exact match. You may also use a comma-separated list to match on multiple permissions.|
|external_tenant|query|string|false|Parameter for filtering roles by external tenant name using string search.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|name_match|partial|
|name_match|exact|
|scope|account|
|scope|principal|
|order_by|name|
|order_by|display_name|
|order_by|modified|
|order_by|policyCount|
|add_fields|groups_in|
|add_fields|groups_in_count|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "policyCount",
                  "accessCount",
                  "applications",
                  "system",
                  "platform_default",
                  "admin_default"
                ],
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "groups_in_count": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "groups_in": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "name": {
                          "type": "string",
                          "example": "GroupA"
                        },
                        "description": {
                          "type": "string",
                          "example": "GroupA Description"
                        },
                        "uuid": {
                          "type": "string",
                          "example": "234df936-abb4-4238-a1c9-d91fc540c702"
                        }
                      }
                    }
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of role objects|[RolePaginationDynamic](#schemarolepaginationdynamic)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list roles|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get a role in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/roles/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/{uuid}/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/roles/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /roles/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of role to get|
|scope|query|string|false|Parameter for filtering resource by scope.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|scope|account|
|scope|principal|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "RoleA"
            },
            "display_name": {
              "type": "string",
              "example": "ARoleName"
            },
            "description": {
              "type": "string",
              "example": "A description of RoleA"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "uuid"
          ],
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid",
              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "created",
            "modified"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "modified": {
              "type": "string",
              "format": "date-time",
              "example": "2019-03-04T07:25:58Z"
            }
          }
        },
        {
          "properties": {
            "policyCount": {
              "type": "integer",
              "minimum": 0
            },
            "accessCount": {
              "type": "integer",
              "minimum": 0
            },
            "applications": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "catalog"
              }
            },
            "system": {
              "type": "boolean",
              "default": false
            },
            "platform_default": {
              "type": "boolean",
              "default": false
            },
            "admin_default": {
              "type": "boolean",
              "default": false
            },
            "external_role_id": {
              "type": "string",
              "example": "ExternalRoleId"
            },
            "external_tenant": {
              "type": "string",
              "example": "ExternalTenant"
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Role object|[RoleWithAccess](#schemarolewithaccess)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get role|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Delete a role in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/rbac/v1/roles/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/{uuid}/',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/rbac/v1/roles/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /roles/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of role to delete|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 403 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "You do not have permission to perform this action."
          },
          "source": {
            "type": "string",
            "example": "detail"
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Role deleted|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to delete role|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Update a Role in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/api/rbac/v1/roles/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "allOf": [
    {
      "allOf": [
        {
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "RoleA"
            },
            "display_name": {
              "type": "string",
              "example": "ARoleName"
            },
            "description": {
              "type": "string",
              "example": "A description of RoleA"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "uuid"
          ],
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid",
              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "created",
            "modified"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "modified": {
              "type": "string",
              "format": "date-time",
              "example": "2019-03-04T07:25:58Z"
            }
          }
        },
        {
          "properties": {
            "policyCount": {
              "type": "integer",
              "minimum": 0
            },
            "accessCount": {
              "type": "integer",
              "minimum": 0
            },
            "applications": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "catalog"
              }
            },
            "system": {
              "type": "boolean",
              "default": false
            },
            "platform_default": {
              "type": "boolean",
              "default": false
            },
            "admin_default": {
              "type": "boolean",
              "default": false
            },
            "external_role_id": {
              "type": "string",
              "example": "ExternalRoleId"
            },
            "external_tenant": {
              "type": "string",
              "example": "ExternalTenant"
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/{uuid}/',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/rbac/v1/roles/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PUT /roles/{uuid}/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "allOf": [
    {
      "allOf": [
        {
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "RoleA"
            },
            "display_name": {
              "type": "string",
              "example": "ARoleName"
            },
            "description": {
              "type": "string",
              "example": "A description of RoleA"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "uuid"
          ],
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid",
              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "created",
            "modified"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "modified": {
              "type": "string",
              "format": "date-time",
              "example": "2019-03-04T07:25:58Z"
            }
          }
        },
        {
          "properties": {
            "policyCount": {
              "type": "integer",
              "minimum": 0
            },
            "accessCount": {
              "type": "integer",
              "minimum": 0
            },
            "applications": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "catalog"
              }
            },
            "system": {
              "type": "boolean",
              "default": false
            },
            "platform_default": {
              "type": "boolean",
              "default": false
            },
            "admin_default": {
              "type": "boolean",
              "default": false
            },
            "external_role_id": {
              "type": "string",
              "example": "ExternalRoleId"
            },
            "external_tenant": {
              "type": "string",
              "example": "ExternalTenant"
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of role to update|
|body|body|[RoleWithAccess](#schemarolewithaccess)|true|Update to a Role|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 403 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "You do not have permission to perform this action."
          },
          "source": {
            "type": "string",
            "example": "detail"
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Role updated|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to update role|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Patch a Role in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/api/rbac/v1/roles/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "properties": {
    "name": {
      "type": "string",
      "example": "RoleA"
    },
    "display_name": {
      "type": "string",
      "example": "ARoleName"
    },
    "description": {
      "type": "string",
      "example": "A description of RoleA"
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/{uuid}/',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.patch('/api/rbac/v1/roles/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PATCH /roles/{uuid}/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "properties": {
    "name": {
      "type": "string",
      "example": "RoleA"
    },
    "display_name": {
      "type": "string",
      "example": "ARoleName"
    },
    "description": {
      "type": "string",
      "example": "A description of RoleA"
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of role to update|
|body|body|[RolePatch](#schemarolepatch)|false|Patch to a Role|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "allOf": [
        {
          "required": [
            "name"
          ],
          "properties": {
            "name": {
              "type": "string",
              "example": "RoleA"
            },
            "display_name": {
              "type": "string",
              "example": "ARoleName"
            },
            "description": {
              "type": "string",
              "example": "A description of RoleA"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "uuid"
          ],
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid",
              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
            }
          }
        },
        {
          "type": "object",
          "required": [
            "created",
            "modified"
          ],
          "properties": {
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "modified": {
              "type": "string",
              "format": "date-time",
              "example": "2019-03-04T07:25:58Z"
            }
          }
        },
        {
          "properties": {
            "policyCount": {
              "type": "integer",
              "minimum": 0
            },
            "accessCount": {
              "type": "integer",
              "minimum": 0
            },
            "applications": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "catalog"
              }
            },
            "system": {
              "type": "boolean",
              "default": false
            },
            "platform_default": {
              "type": "boolean",
              "default": false
            },
            "admin_default": {
              "type": "boolean",
              "default": false
            },
            "external_role_id": {
              "type": "string",
              "example": "ExternalRoleId"
            },
            "external_tenant": {
              "type": "string",
              "example": "ExternalTenant"
            }
          }
        }
      ]
    },
    {
      "type": "object",
      "required": [
        "access"
      ],
      "properties": {
        "access": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Role patched|[RoleWithAccess](#schemarolewithaccess)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to patch role|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get access for a role in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/roles/{uuid}/access/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/roles/{uuid}/access/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/roles/{uuid}/access/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /roles/{uuid}/access/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of the role|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of the access objects for a role|[AccessPagination](#schemaaccesspagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get access for role|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Policy {% #role-based-access-control-policy %}

Operations about policies

##  Create a policy in a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/policies/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "type": "string",
          "format": "uuid",
          "example": "83ee048e-3c1d-43ef-b945-108225ae52f4"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid",
            "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
          }
        }
      }
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/policies/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/policies/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /policies/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "type": "string",
          "format": "uuid",
          "example": "83ee048e-3c1d-43ef-b945-108225ae52f4"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid",
            "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[PolicyIn](#schemapolicyin)|true|Policy to create|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 201 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "allOf": [
            {
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "GroupA"
                },
                "description": {
                  "type": "string",
                  "example": "A description of GroupA"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "uuid"
              ],
              "properties": {
                "uuid": {
                  "type": "string",
                  "format": "uuid",
                  "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "created",
                "modified"
              ],
              "properties": {
                "created": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-01-21T17:32:28Z"
                },
                "modified": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-03-04T07:25:58Z"
                }
              }
            },
            {
              "properties": {
                "principalCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "roleCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "system": {
                  "type": "boolean",
                  "default": false
                },
                "platform_default": {
                  "type": "boolean",
                  "default": false
                },
                "admin_default": {
                  "type": "boolean",
                  "default": false
                }
              }
            }
          ]
        },
        "roles": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the policy|[PolicyExtended](#schemapolicyextended)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  List the policies in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/policies/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/policies/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/policies/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /policies/`

By default, responses are sorted in ascending order by policy name

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|name|query|string|false|Parameter for filtering resource by name using string contains search.|
|scope|query|string|false|Parameter for filtering resource by scope.|
|group_name|query|string|false|Parameter for filtering resource by group name using string contains search.|
|group_uuid|query|string(uuid)|false|Parameter for filtering resource by group uuid using UUID exact match.|
|order_by|query|string|false|Parameter for ordering policies by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|scope|account|
|scope|principal|
|order_by|name|
|order_by|modified|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "PolicyA"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of PolicyA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "group",
                  "roles"
                ],
                "properties": {
                  "group": {
                    "allOf": [
                      {
                        "required": [
                          "name"
                        ],
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "GroupA"
                          },
                          "description": {
                            "type": "string",
                            "example": "A description of GroupA"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "required": [
                          "uuid"
                        ],
                        "properties": {
                          "uuid": {
                            "type": "string",
                            "format": "uuid",
                            "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                          }
                        }
                      },
                      {
                        "type": "object",
                        "required": [
                          "created",
                          "modified"
                        ],
                        "properties": {
                          "created": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2019-01-21T17:32:28Z"
                          },
                          "modified": {
                            "type": "string",
                            "format": "date-time",
                            "example": "2019-03-04T07:25:58Z"
                          }
                        }
                      },
                      {
                        "properties": {
                          "principalCount": {
                            "type": "integer",
                            "minimum": 0
                          },
                          "roleCount": {
                            "type": "integer",
                            "minimum": 0
                          },
                          "system": {
                            "type": "boolean",
                            "default": false
                          },
                          "platform_default": {
                            "type": "boolean",
                            "default": false
                          },
                          "admin_default": {
                            "type": "boolean",
                            "default": false
                          }
                        }
                      }
                    ]
                  },
                  "roles": {
                    "type": "array",
                    "items": {
                      "allOf": [
                        {
                          "required": [
                            "name"
                          ],
                          "properties": {
                            "name": {
                              "type": "string",
                              "example": "RoleA"
                            },
                            "display_name": {
                              "type": "string",
                              "example": "ARoleName"
                            },
                            "description": {
                              "type": "string",
                              "example": "A description of RoleA"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "required": [
                            "uuid"
                          ],
                          "properties": {
                            "uuid": {
                              "type": "string",
                              "format": "uuid",
                              "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                            }
                          }
                        },
                        {
                          "type": "object",
                          "required": [
                            "created",
                            "modified"
                          ],
                          "properties": {
                            "created": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2019-01-21T17:32:28Z"
                            },
                            "modified": {
                              "type": "string",
                              "format": "date-time",
                              "example": "2019-03-04T07:25:58Z"
                            }
                          }
                        },
                        {
                          "properties": {
                            "policyCount": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "accessCount": {
                              "type": "integer",
                              "minimum": 0
                            },
                            "applications": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "example": "catalog"
                              }
                            },
                            "system": {
                              "type": "boolean",
                              "default": false
                            },
                            "platform_default": {
                              "type": "boolean",
                              "default": false
                            },
                            "admin_default": {
                              "type": "boolean",
                              "default": false
                            },
                            "external_role_id": {
                              "type": "string",
                              "example": "ExternalRoleId"
                            },
                            "external_tenant": {
                              "type": "string",
                              "example": "ExternalTenant"
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of policy objects|[PolicyPagination](#schemapolicypagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get a policy in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/policies/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/policies/{uuid}/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/policies/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /policies/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of policy to get|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "allOf": [
            {
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "GroupA"
                },
                "description": {
                  "type": "string",
                  "example": "A description of GroupA"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "uuid"
              ],
              "properties": {
                "uuid": {
                  "type": "string",
                  "format": "uuid",
                  "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "created",
                "modified"
              ],
              "properties": {
                "created": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-01-21T17:32:28Z"
                },
                "modified": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-03-04T07:25:58Z"
                }
              }
            },
            {
              "properties": {
                "principalCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "roleCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "system": {
                  "type": "boolean",
                  "default": false
                },
                "platform_default": {
                  "type": "boolean",
                  "default": false
                },
                "admin_default": {
                  "type": "boolean",
                  "default": false
                }
              }
            }
          ]
        },
        "roles": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Policy object|[PolicyExtended](#schemapolicyextended)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Update a policy in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/api/rbac/v1/policies/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "type": "string",
          "format": "uuid",
          "example": "83ee048e-3c1d-43ef-b945-108225ae52f4"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid",
            "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
          }
        }
      }
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/policies/{uuid}/',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/rbac/v1/policies/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PUT /policies/{uuid}/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "type": "string",
          "format": "uuid",
          "example": "83ee048e-3c1d-43ef-b945-108225ae52f4"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "uuid",
            "example": "94846f2f-cced-474f-b7f3-47e2ec51dd11"
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of policy to update|
|body|body|[PolicyIn](#schemapolicyin)|true|Policy to update|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "example": "PolicyA"
        },
        "description": {
          "type": "string",
          "example": "A description of PolicyA"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "uuid"
      ],
      "properties": {
        "uuid": {
          "type": "string",
          "format": "uuid",
          "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "created",
        "modified"
      ],
      "properties": {
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "modified": {
          "type": "string",
          "format": "date-time",
          "example": "2019-03-04T07:25:58Z"
        }
      }
    },
    {
      "type": "object",
      "required": [
        "group",
        "roles"
      ],
      "properties": {
        "group": {
          "allOf": [
            {
              "required": [
                "name"
              ],
              "properties": {
                "name": {
                  "type": "string",
                  "example": "GroupA"
                },
                "description": {
                  "type": "string",
                  "example": "A description of GroupA"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "uuid"
              ],
              "properties": {
                "uuid": {
                  "type": "string",
                  "format": "uuid",
                  "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                }
              }
            },
            {
              "type": "object",
              "required": [
                "created",
                "modified"
              ],
              "properties": {
                "created": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-01-21T17:32:28Z"
                },
                "modified": {
                  "type": "string",
                  "format": "date-time",
                  "example": "2019-03-04T07:25:58Z"
                }
              }
            },
            {
              "properties": {
                "principalCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "roleCount": {
                  "type": "integer",
                  "minimum": 0
                },
                "system": {
                  "type": "boolean",
                  "default": false
                },
                "platform_default": {
                  "type": "boolean",
                  "default": false
                },
                "admin_default": {
                  "type": "boolean",
                  "default": false
                }
              }
            }
          ]
        },
        "roles": {
          "type": "array",
          "items": {
            "allOf": [
              {
                "required": [
                  "name"
                ],
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "RoleA"
                  },
                  "display_name": {
                    "type": "string",
                    "example": "ARoleName"
                  },
                  "description": {
                    "type": "string",
                    "example": "A description of RoleA"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "uuid"
                ],
                "properties": {
                  "uuid": {
                    "type": "string",
                    "format": "uuid",
                    "example": "57e60f90-8c0c-4bd1-87a0-2143759aae1c"
                  }
                }
              },
              {
                "type": "object",
                "required": [
                  "created",
                  "modified"
                ],
                "properties": {
                  "created": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-01-21T17:32:28Z"
                  },
                  "modified": {
                    "type": "string",
                    "format": "date-time",
                    "example": "2019-03-04T07:25:58Z"
                  }
                }
              },
              {
                "properties": {
                  "policyCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "accessCount": {
                    "type": "integer",
                    "minimum": 0
                  },
                  "applications": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "example": "catalog"
                    }
                  },
                  "system": {
                    "type": "boolean",
                    "default": false
                  },
                  "platform_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "admin_default": {
                    "type": "boolean",
                    "default": false
                  },
                  "external_role_id": {
                    "type": "string",
                    "example": "ExternalRoleId"
                  },
                  "external_tenant": {
                    "type": "string",
                    "example": "ExternalTenant"
                  }
                }
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A Policy object|[PolicyExtended](#schemapolicyextended)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Delete a policy in the tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/api/rbac/v1/policies/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/policies/{uuid}/',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/api/rbac/v1/policies/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /policies/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of policy to delete|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 404 Response

```json
{
  "required": [
    "errors"
  ],
  "properties": {
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "string",
            "example": "Not found."
          },
          "status": {
            "type": "string",
            "example": "403"
          }
        }
      }
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Policy deleted|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Access {% #role-based-access-control-access %}

Operations about access

##  Get the permitted access for a principal in the tenant (defaults to principal from the identity header) 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/access/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/access/?application=type,string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/access/', params={
  'application': {
  "type": "string"
}
}, headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /access/`

Access responses are sorted in ascending order by an ID internal to the database

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|application|query|string|true|The application name(s) to obtain access for the principal. This is an exact match. When no application is supplied, all permissions for the principal are returned. You may also use a comma-separated list to match on multiple applications.|
|username|query|string|false|Unique username of the principal to obtain access for (only available for admins, and if supplied, takes precedence over the identity header).|
|order_by|query|string|false|Parameter for ordering roles by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-application|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|application|
|order_by|resource_type|
|order_by|verb|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "required": [
              "permission",
              "resourceDefinitions"
            ],
            "properties": {
              "permission": {
                "type": "string",
                "example": "cost-management:*:read"
              },
              "resourceDefinitions": {
                "type": "array",
                "items": {
                  "required": [
                    "attributeFilter"
                  ],
                  "properties": {
                    "attributeFilter": {
                      "required": [
                        "key",
                        "operation",
                        "value"
                      ],
                      "properties": {
                        "key": {
                          "type": "string",
                          "example": "cost-management.aws.account"
                        },
                        "operation": {
                          "type": "string",
                          "enum": [
                            "equal",
                            "in"
                          ]
                        },
                        "value": {
                          "type": "string",
                          "example": "123456"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of access objects|[AccessPagination](#schemaaccesspagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Status {% #role-based-access-control-status %}

Operations about status

##  Obtain server status 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/status/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/status/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/status/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /status/`

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "required": [
    "api_version"
  ],
  "properties": {
    "api_version": {
      "type": "integer",
      "format": "int64",
      "example": 1
    },
    "commit": {
      "type": "string",
      "example": "178d2ea"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|An object describing the server status|[Status](#schemastatus)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# CrossAccountRequest {% #role-based-access-control-crossaccountrequest %}

Operations about cross account requests

##  List the cross account requests for a user or account 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/cross-account-requests/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/cross-account-requests/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/cross-account-requests/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /cross-account-requests/`

By default, responses are sorted in ascending order by created_at

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|query_by|query|string|false|Parameter for filtering resource by either a user's ID, or a client's org. The default value is target_org.|
|account|query|string|false|Parameter for filtering resource by an account number. Value can be a comma-separated list of ids. To be used in tandem with ?query_by=user_id to further filter a user's requests by account number.|
|org_id|query|string|false|Parameter for filtering resource by an org id. Value can be a comma-separated list of ids. To be used in tandem with ?query_by=user_id to further filter a user's requests by org id.|
|approved_only|query|string|false|Parameter for filtering resource which have been approved.|
|status|query|string|false|Parameter for filtering resource based on status.|
|order_by|query|string|false|Parameter for ordering by field. For inverse ordering, use '-', e.g. ?order_by=-start_date.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|query_by|user_id|
|query_by|target_org|
|approved_only|true|
|status|pending|
|status|approved|
|status|denied|
|status|cancelled|
|status|expired|
|order_by|request_id|
|order_by|start_date|
|order_by|end_date|
|order_by|created|
|order_by|modified|
|order_by|status|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "oneOf": [
              {
                "allOf": [
                  {
                    "properties": {
                      "request_id": {
                        "type": "string",
                        "format": "uuid",
                        "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
                      },
                      "target_account": {
                        "type": "string",
                        "example": "12345"
                      },
                      "target_org": {
                        "type": "string",
                        "example": "12345"
                      },
                      "status": {
                        "type": "string",
                        "example": "pending"
                      },
                      "created": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      },
                      "start_date": {
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      },
                      "end_date": {
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "first_name": {
                        "type": "string",
                        "example": "Jane"
                      },
                      "last_name": {
                        "type": "string",
                        "example": "Doe"
                      },
                      "email": {
                        "type": "string",
                        "example": "test@redhat.com"
                      }
                    }
                  }
                ]
              },
              {
                "allOf": [
                  {
                    "properties": {
                      "request_id": {
                        "type": "string",
                        "format": "uuid",
                        "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
                      },
                      "target_account": {
                        "type": "string",
                        "example": "12345"
                      },
                      "target_org": {
                        "type": "string",
                        "example": "12345"
                      },
                      "status": {
                        "type": "string",
                        "example": "pending"
                      },
                      "created": {
                        "type": "string",
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      },
                      "start_date": {
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      },
                      "end_date": {
                        "format": "date-time",
                        "example": "2019-01-21T17:32:28Z"
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "user_id": {
                        "type": "string",
                        "example": "1234"
                      }
                    }
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of cross account request objects|[CrossAccountRequestPagination](#schemacrossaccountrequestpagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list cross account requests|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Create a cross account request 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/api/rbac/v1/cross-account-requests/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "target_account",
    "start_date",
    "end_date",
    "roles"
  ],
  "properties": {
    "target_account": {
      "type": "string",
      "example": "12345"
    },
    "target_org": {
      "type": "string",
      "example": "12345"
    },
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/cross-account-requests/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/api/rbac/v1/cross-account-requests/', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /cross-account-requests/`

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "target_account",
    "start_date",
    "end_date",
    "roles"
  ],
  "properties": {
    "target_account": {
      "type": "string",
      "example": "12345"
    },
    "target_org": {
      "type": "string",
      "example": "12345"
    },
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CrossAccountRequestIn](#schemacrossaccountrequestin)|true|CrossAccountRequest to create|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 201 Response

```json
{
  "allOf": [
    {
      "properties": {
        "request_id": {
          "type": "string",
          "format": "uuid",
          "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
        },
        "target_account": {
          "type": "string",
          "example": "12345"
        },
        "target_org": {
          "type": "string",
          "example": "12345"
        },
        "start_date": {
          "type": "string",
          "example": "01/01/2021"
        },
        "end_date": {
          "type": "string",
          "example": "01/01/2021"
        },
        "status": {
          "type": "string",
          "example": "pending"
        },
        "created": {
          "type": "string",
          "format": "date-time",
          "example": "2019-01-21T17:32:28Z"
        },
        "roles": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "display_name": {
                "type": "string",
                "example": "display_name"
              },
              "description": {
                "type": "string",
                "example": "description"
              },
              "permissions": {
                "type": "array",
                "items": {
                  "properties": {
                    "application": {
                      "type": "string",
                      "example": "rbac"
                    },
                    "resource_type": {
                      "type": "string",
                      "example": "group"
                    },
                    "verb": {
                      "type": "string",
                      "example": "read"
                    },
                    "permission": {
                      "type": "string",
                      "example": "rbac:group:read"
                    },
                    "description": {
                      "type": "string",
                      "example": "Describe the usage of permission."
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "type": "object",
      "properties": {
        "user_id": {
          "type": "string",
          "example": "1234"
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the cross account request|[CrossAccountRequestOut](#schemacrossaccountrequestout)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to create cross account request|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Get a cross account request 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/cross-account-requests/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/cross-account-requests/{uuid}/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/cross-account-requests/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /cross-account-requests/{uuid}/`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of cross account request to get|
|query_by|query|string|false|Parameter for filtering resource by either a user's ID, or a client's org. The default value is target_org.|
|account|query|string|false|Parameter for filtering resource by an account number. Value can be a comma-separated list of ids. To be used in tandem with ?query_by=user_id to further filter a user's requests by account number.|
|approved_only|query|string|false|Parameter for filtering resource which have been approved.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|query_by|user_id|
|query_by|target_org|
|approved_only|true|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "oneOf": [
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "first_name": {
              "format": "string",
              "example": "first_name"
            },
            "last_name": {
              "format": "string",
              "example": "last_name"
            },
            "email": {
              "format": "string",
              "example": "email"
            }
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "user_id": {
              "format": "string",
              "example": "1234"
            }
          }
        }
      ]
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A cross account request object|[CrossAccountRequestDetail](#schemacrossaccountrequestdetail)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Update a cross account request 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "/api/rbac/v1/cross-account-requests/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "required": [
    "start_date",
    "end_date",
    "roles"
  ],
  "properties": {
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/cross-account-requests/{uuid}/',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.put('/api/rbac/v1/cross-account-requests/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PUT /cross-account-requests/{uuid}/`

For TAM requestor to update the start_date/end_date/roles of an existing cross account request.

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "required": [
    "start_date",
    "end_date",
    "roles"
  ],
  "properties": {
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of cross account request to get|
|body|body|[CrossAccountRequestUpdateIn](#schemacrossaccountrequestupdatein)|true|Updates to CrossAccountRequest|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "oneOf": [
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "first_name": {
              "format": "string",
              "example": "first_name"
            },
            "last_name": {
              "format": "string",
              "example": "last_name"
            },
            "email": {
              "format": "string",
              "example": "email"
            }
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "user_id": {
              "format": "string",
              "example": "1234"
            }
          }
        }
      ]
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A cross account request object|[CrossAccountRequestDetail](#schemacrossaccountrequestdetail)|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the cross account request|[CrossAccountRequestOut](#schemacrossaccountrequestout)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  Patch a cross account request 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/api/rbac/v1/cross-account-requests/{uuid}/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "properties": {
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "approved",
        "expired",
        "cancelled",
        "denied"
      ]
    }
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/rbac/v1/cross-account-requests/{uuid}/',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.patch('/api/rbac/v1/cross-account-requests/{uuid}/', headers = headers)

print(r.json())

```

{% /codesamples %}

`PATCH /cross-account-requests/{uuid}/`

Patch the start_date/end_date/roles of an existing request. Could be used by TAM requestor to cancel request or target account admin to approve/deny request.

### Request Body Schema

{% jsonsnippet title="Request Body Schema" %}
```json
{
  "properties": {
    "start_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "end_date": {
      "type": "string",
      "example": "01/01/2021"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "example": "Role Name"
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "approved",
        "expired",
        "cancelled",
        "denied"
      ]
    }
  }
}
```

{% /jsonsnippet %}

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string(uuid)|true|ID of cross account request to get|
|body|body|[CrossAccountRequestPatch](#schemacrossaccountrequestpatch)|true|Updates to CrossAccountRequest|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "oneOf": [
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "first_name": {
              "format": "string",
              "example": "first_name"
            },
            "last_name": {
              "format": "string",
              "example": "last_name"
            },
            "email": {
              "format": "string",
              "example": "email"
            }
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "properties": {
            "request_id": {
              "type": "string",
              "format": "uuid",
              "example": "2ad8cac5-336e-44c6-9b16-15ac84224d4b"
            },
            "target_account": {
              "type": "string",
              "example": "12345"
            },
            "target_org": {
              "type": "string",
              "example": "12345"
            },
            "start_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "end_date": {
              "type": "string",
              "example": "01/01/2021"
            },
            "status": {
              "type": "string",
              "example": "pending"
            },
            "created": {
              "type": "string",
              "format": "date-time",
              "example": "2019-01-21T17:32:28Z"
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "display_name": {
                    "type": "string",
                    "example": "display_name"
                  },
                  "description": {
                    "type": "string",
                    "example": "description"
                  },
                  "permissions": {
                    "type": "array",
                    "items": {
                      "properties": {
                        "application": {
                          "type": "string",
                          "example": "rbac"
                        },
                        "resource_type": {
                          "type": "string",
                          "example": "group"
                        },
                        "verb": {
                          "type": "string",
                          "example": "read"
                        },
                        "permission": {
                          "type": "string",
                          "example": "rbac:group:read"
                        },
                        "description": {
                          "type": "string",
                          "example": "Describe the usage of permission."
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        {
          "type": "object",
          "properties": {
            "user_id": {
              "format": "string",
              "example": "1234"
            }
          }
        }
      ]
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A cross account request object|[CrossAccountRequestDetail](#schemacrossaccountrequestdetail)|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|An object describing the cross account request|[CrossAccountRequestOut](#schemacrossaccountrequestout)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to get group|[Error403](#schemaerror403)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Permission {% #role-based-access-control-permission %}

##  List the permissions for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/permissions/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/permissions/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/permissions/', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /permissions/`

By default, responses are sorted in ascending order by permission application.

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|order_by|query|string|false|Parameter for ordering permissions by value. For inverse ordering, supply '-' before the param value, such as: ?order_by=-application|
|application|query|string|false|Exact match for the application name of a permission. You may also use a comma-separated list to match on multiple applications.|
|resource_type|query|string|false|Exact match for the resource type name of a permission. You may also use a comma-separated list to match on multiple resource_types.|
|verb|query|string|false|Exact match for the operation verb name of a permission You may also use a comma-separated list to match on multiple verbs.|
|permission|query|string|false|Partial match for the aggregate permission value name of a permission object.|
|exclude_globals|query|string|false|If set to 'true', this will exclude any permission with a global allowance on either 'application', 'resource_type' or 'verb'. The default is 'false'.|
|exclude_roles|query|string|false|An optional string filter which accepts one or more role UUIDs, comma-separated, to return permissions not associated with the supplied role(s).|
|allowed_only|query|string|false|If set to 'true', this will exclude any permission with a role where the 'application' is not in the role create allow list.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|application|
|order_by|resource_type|
|order_by|verb|
|order_by|permission|
|exclude_globals|true|
|exclude_globals|false|
|allowed_only|true|
|allowed_only|false|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "properties": {
              "application": {
                "type": "string",
                "example": "rbac"
              },
              "resource_type": {
                "type": "string",
                "example": "group"
              },
              "verb": {
                "type": "string",
                "example": "read"
              },
              "permission": {
                "type": "string",
                "example": "rbac:group:read"
              },
              "description": {
                "type": "string",
                "example": "Describe the usage of permission."
              }
            }
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A paginated list of permission objects|[PermissionPagination](#schemapermissionpagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list permissions|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

##  List the available options for fields of permissions for a tenant 

{% codesamples %}
```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/rbac/v1/permissions/options/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/api/rbac/v1/permissions/options/?field=type,string,enum,application%2Cresource_type%2Cverb',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/api/rbac/v1/permissions/options/', params={
  'field': {
  "type": "string",
  "enum": [
    "application",
    "resource_type",
    "verb"
  ]
}
}, headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /permissions/options/`

By default, options of application is returned. And could be resource_type or verb on demand.

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|limit|query|integer|false|Parameter for selecting the amount of data returned.|
|offset|query|integer|false|Parameter for selecting the offset of data.|
|field|query|string|true|specify which fields of permission to display|
|application|query|string|false|Filter returned options based on application. You may also use a comma-separated list to filter on multiple applications.|
|resource_type|query|string|false|Filter returned options based on resource_type. You may also use a comma-separated list to filter on multiple resource_types.|
|verb|query|string|false|Filter returned options based on verb. You may also use a comma-separated list to filter on multiple verbs.|
|exclude_globals|query|string|false|If set to 'true', this will exclude any permission option with a global allowance on the supplied '?field=' value of 'application', 'resource_type' or 'verb'. The default is 'false'.|
|allowed_only|query|string|false|If set to 'true', this will exclude any permission with a role where the 'application' is not in the role create allow list.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|field|application|
|field|resource_type|
|field|verb|
|exclude_globals|true|
|exclude_globals|false|
|allowed_only|true|
|allowed_only|false|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "allOf": [
    {
      "properties": {
        "meta": {
          "properties": {
            "count": {
              "type": "integer",
              "format": "int64",
              "example": 30
            }
          }
        },
        "links": {
          "properties": {
            "first": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=0&limit=10"
            },
            "previous": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=20&limit=10"
            },
            "next": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=40&limit=10"
            },
            "last": {
              "type": "string",
              "format": "uri",
              "example": "/api/v1/(resources)/?offset=90&limit=10"
            }
          }
        }
      }
    },
    {
      "type": "object",
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    }
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of options for field of permission|[PermissionOptionsPagination](#schemapermissionoptionspagination)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to list permissions|[Error403](#schemaerror403)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected Error|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
basic_auth
{% /paragraph %}

# Schemas

## Error {% #tocS_Error %}

{% span #schemaerror /%}
{% span #schema_Error /%}
{% span #tocSerror /%}
{% span #tocserror /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|errors|[object]|true|none|none|
|» detail|string|false|none|none|
|» status|string|false|none|none|

## Error403 {% #tocS_Error403 %}

{% span #schemaerror403 /%}
{% span #schema_Error403 /%}
{% span #tocSerror403 /%}
{% span #tocserror403 /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|errors|[object]|true|none|none|
|» detail|string|false|none|none|
|» source|string|false|none|none|
|» status|string|false|none|none|

## UUID {% #tocS_UUID %}

{% span #schemauuid /%}
{% span #schema_UUID /%}
{% span #tocSuuid /%}
{% span #tocsuuid /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|uuid|string(uuid)|true|none|none|

## Timestamped {% #tocS_Timestamped %}

{% span #schematimestamped /%}
{% span #schema_Timestamped /%}
{% span #tocStimestamped /%}
{% span #tocstimestamped /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|created|string(date-time)|true|none|none|
|modified|string(date-time)|true|none|none|

## PaginationMeta {% #tocS_PaginationMeta %}

{% span #schemapaginationmeta /%}
{% span #schema_PaginationMeta /%}
{% span #tocSpaginationmeta /%}
{% span #tocspaginationmeta /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer(int64)|false|none|none|

## PaginationLinks {% #tocS_PaginationLinks %}

{% span #schemapaginationlinks /%}
{% span #schema_PaginationLinks /%}
{% span #tocSpaginationlinks /%}
{% span #tocspaginationlinks /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|first|string(uri)|false|none|none|
|previous|string(uri)|false|none|none|
|next|string(uri)|false|none|none|
|last|string(uri)|false|none|none|

## ListPagination {% #tocS_ListPagination %}

{% span #schemalistpagination /%}
{% span #schema_ListPagination /%}
{% span #tocSlistpagination /%}
{% span #tocslistpagination /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|meta|[PaginationMeta](#schemapaginationmeta)|false|none|none|
|links|[PaginationLinks](#schemapaginationlinks)|false|none|none|

## Principal {% #tocS_Principal %}

{% span #schemaprincipal /%}
{% span #schema_Principal /%}
{% span #tocSprincipal /%}
{% span #tocsprincipal /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|
|email|string(email)|true|none|none|
|first_name|string|false|none|none|
|last_name|string|false|none|none|
|is_active|boolean|false|none|none|
|is_org_admin|boolean|false|none|none|

## PrincipalMinimal {% #tocS_PrincipalMinimal %}

{% span #schemaprincipalminimal /%}
{% span #schema_PrincipalMinimal /%}
{% span #tocSprincipalminimal /%}
{% span #tocsprincipalminimal /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|

## PrincipalIn {% #tocS_PrincipalIn %}

{% span #schemaprincipalin /%}
{% span #schema_PrincipalIn /%}
{% span #tocSprincipalin /%}
{% span #tocsprincipalin /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|username|string|true|none|none|

## PrincipalOut {% #tocS_PrincipalOut %}

{% span #schemaprincipalout /%}
{% span #schema_PrincipalOut /%}
{% span #tocSprincipalout /%}
{% span #tocsprincipalout /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Principal](#schemaprincipal)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

## PrincipalPagination {% #tocS_PrincipalPagination %}

{% span #schemaprincipalpagination /%}
{% span #schema_PrincipalPagination /%}
{% span #tocSprincipalpagination /%}
{% span #tocsprincipalpagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[oneOf]|true|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[Principal](#schemaprincipal)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[PrincipalMinimal](#schemaprincipalminimal)|false|none|none|

## Group {% #tocS_Group %}

{% span #schemagroup /%}
{% span #schema_Group /%}
{% span #tocSgroup /%}
{% span #tocsgroup /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|false|none|none|

## AdditionalGroup {% #tocS_AdditionalGroup %}

{% span #schemaadditionalgroup /%}
{% span #schema_AdditionalGroup /%}
{% span #tocSadditionalgroup /%}
{% span #tocsadditionalgroup /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|description|string|false|none|none|
|uuid|string|false|none|none|

## GroupOut {% #tocS_GroupOut %}

{% span #schemagroupout /%}
{% span #schema_GroupOut /%}
{% span #tocSgroupout /%}
{% span #tocsgroupout /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Group](#schemagroup)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» principalCount|integer|false|none|none|
|» roleCount|integer|false|none|none|
|» system|boolean|false|none|none|
|» platform_default|boolean|false|none|none|
|» admin_default|boolean|false|none|none|

## GroupPrincipalIn {% #tocS_GroupPrincipalIn %}

{% span #schemagroupprincipalin /%}
{% span #schema_GroupPrincipalIn /%}
{% span #tocSgroupprincipalin /%}
{% span #tocsgroupprincipalin /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|principals|[[PrincipalIn](#schemaprincipalin)]|true|none|none|

## GroupRoleIn {% #tocS_GroupRoleIn %}

{% span #schemagrouprolein /%}
{% span #schema_GroupRoleIn /%}
{% span #tocSgrouprolein /%}
{% span #tocsgrouprolein /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|roles|[string]|true|none|none|

## GroupWithPrincipals {% #tocS_GroupWithPrincipals %}

{% span #schemagroupwithprincipals /%}
{% span #schema_GroupWithPrincipals /%}
{% span #tocSgroupwithprincipals /%}
{% span #tocsgroupwithprincipals /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Group](#schemagroup)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» principals|[[Principal](#schemaprincipal)]|true|none|none|

## GroupWithPrincipalsAndRoles {% #tocS_GroupWithPrincipalsAndRoles %}

{% span #schemagroupwithprincipalsandroles /%}
{% span #schema_GroupWithPrincipalsAndRoles /%}
{% span #tocSgroupwithprincipalsandroles /%}
{% span #tocsgroupwithprincipalsandroles /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Group](#schemagroup)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» principals|[[Principal](#schemaprincipal)]|true|none|none|
|» roles|[[RoleOut](#schemaroleout)]|true|none|none|

## GroupRolesPagination {% #tocS_GroupRolesPagination %}

{% span #schemagrouprolespagination /%}
{% span #schema_GroupRolesPagination /%}
{% span #tocSgrouprolespagination /%}
{% span #tocsgrouprolespagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[RoleOut](#schemaroleout)]|true|none|none|

## GroupPagination {% #tocS_GroupPagination %}

{% span #schemagrouppagination /%}
{% span #schema_GroupPagination /%}
{% span #tocSgrouppagination /%}
{% span #tocsgrouppagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[GroupOut](#schemagroupout)]|true|none|none|

## CrossAccountRequestDetail {% #tocS_CrossAccountRequestDetail %}

{% span #schemacrossaccountrequestdetail /%}
{% span #schema_CrossAccountRequestDetail /%}
{% span #tocScrossaccountrequestdetail /%}
{% span #tocscrossaccountrequestdetail /%}

### Properties

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequestDetailByAccount](#schemacrossaccountrequestdetailbyaccount)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequestDetailByUseId](#schemacrossaccountrequestdetailbyuseid)|false|none|none|

## CrossAccountRequestDetailByAccount {% #tocS_CrossAccountRequestDetailByAccount %}

{% span #schemacrossaccountrequestdetailbyaccount /%}
{% span #schema_CrossAccountRequestDetailByAccount /%}
{% span #tocScrossaccountrequestdetailbyaccount /%}
{% span #tocscrossaccountrequestdetailbyaccount /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequestWithRoles](#schemacrossaccountrequestwithroles)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» first_name|any|false|none|none|
|» last_name|any|false|none|none|
|» email|any|false|none|none|

## CrossAccountRequestDetailByUseId {% #tocS_CrossAccountRequestDetailByUseId %}

{% span #schemacrossaccountrequestdetailbyuseid /%}
{% span #schema_CrossAccountRequestDetailByUseId /%}
{% span #tocScrossaccountrequestdetailbyuseid /%}
{% span #tocscrossaccountrequestdetailbyuseid /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequestWithRoles](#schemacrossaccountrequestwithroles)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» user_id|any|false|none|none|

## CrossAccountRequestPagination {% #tocS_CrossAccountRequestPagination %}

{% span #schemacrossaccountrequestpagination /%}
{% span #schema_CrossAccountRequestPagination /%}
{% span #tocScrossaccountrequestpagination /%}
{% span #tocscrossaccountrequestpagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[oneOf]|true|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[CrossAccountRequestByAccount](#schemacrossaccountrequestbyaccount)|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[CrossAccountRequestByUserId](#schemacrossaccountrequestbyuserid)|false|none|none|

## CrossAccountRequestIn {% #tocS_CrossAccountRequestIn %}

{% span #schemacrossaccountrequestin /%}
{% span #schema_CrossAccountRequestIn /%}
{% span #tocScrossaccountrequestin /%}
{% span #tocscrossaccountrequestin /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|target_account|string|true|none|none|
|target_org|string|false|none|none|
|start_date|string|true|none|none|
|end_date|string|true|none|none|
|roles|[string]|true|none|none|

## CrossAccountRequestUpdateIn {% #tocS_CrossAccountRequestUpdateIn %}

{% span #schemacrossaccountrequestupdatein /%}
{% span #schema_CrossAccountRequestUpdateIn /%}
{% span #tocScrossaccountrequestupdatein /%}
{% span #tocscrossaccountrequestupdatein /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|string|true|none|none|
|end_date|string|true|none|none|
|roles|[string]|true|none|none|

## CrossAccountRequestPatch {% #tocS_CrossAccountRequestPatch %}

{% span #schemacrossaccountrequestpatch /%}
{% span #schema_CrossAccountRequestPatch /%}
{% span #tocScrossaccountrequestpatch /%}
{% span #tocscrossaccountrequestpatch /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start_date|string|false|none|none|
|end_date|string|false|none|none|
|roles|[string]|false|none|none|
|status|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|approved|
|status|expired|
|status|cancelled|
|status|denied|

## CrossAccountRequestByAccount {% #tocS_CrossAccountRequestByAccount %}

{% span #schemacrossaccountrequestbyaccount /%}
{% span #schema_CrossAccountRequestByAccount /%}
{% span #tocScrossaccountrequestbyaccount /%}
{% span #tocscrossaccountrequestbyaccount /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequest](#schemacrossaccountrequest)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» first_name|string|false|none|none|
|» last_name|string|false|none|none|
|» email|string|false|none|none|

## CrossAccountRequestByUserId {% #tocS_CrossAccountRequestByUserId %}

{% span #schemacrossaccountrequestbyuserid /%}
{% span #schema_CrossAccountRequestByUserId /%}
{% span #tocScrossaccountrequestbyuserid /%}
{% span #tocscrossaccountrequestbyuserid /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequest](#schemacrossaccountrequest)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» user_id|string|false|none|none|

## CrossAccountRequest {% #tocS_CrossAccountRequest %}

{% span #schemacrossaccountrequest /%}
{% span #schema_CrossAccountRequest /%}
{% span #tocScrossaccountrequest /%}
{% span #tocscrossaccountrequest /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|request_id|string(uuid)|false|none|none|
|target_account|string|false|none|none|
|target_org|string|false|none|none|
|status|string|false|none|none|
|created|string(date-time)|false|none|none|
|start_date|any|false|none|none|
|end_date|any|false|none|none|

## CrossAccountRequestWithRoles {% #tocS_CrossAccountRequestWithRoles %}

{% span #schemacrossaccountrequestwithroles /%}
{% span #schema_CrossAccountRequestWithRoles /%}
{% span #tocScrossaccountrequestwithroles /%}
{% span #tocscrossaccountrequestwithroles /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|request_id|string(uuid)|false|none|none|
|target_account|string|false|none|none|
|target_org|string|false|none|none|
|start_date|string|false|none|none|
|end_date|string|false|none|none|
|status|string|false|none|none|
|created|string(date-time)|false|none|none|
|roles|[object]|false|none|none|
|» display_name|string|false|none|none|
|» description|string|false|none|none|
|» permissions|[[Permission](#schemapermission)]|false|none|none|

## CrossAccountRequestOut {% #tocS_CrossAccountRequestOut %}

{% span #schemacrossaccountrequestout /%}
{% span #schema_CrossAccountRequestOut /%}
{% span #tocScrossaccountrequestout /%}
{% span #tocscrossaccountrequestout /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[CrossAccountRequestWithRoles](#schemacrossaccountrequestwithroles)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» user_id|string|false|none|none|

## ResourceDefinitionFilter {% #tocS_ResourceDefinitionFilter %}

{% span #schemaresourcedefinitionfilter /%}
{% span #schema_ResourceDefinitionFilter /%}
{% span #tocSresourcedefinitionfilter /%}
{% span #tocsresourcedefinitionfilter /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|key|string|true|none|none|
|operation|string|true|none|none|
|value|string|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|operation|equal|
|operation|in|

## ResourceDefinition {% #tocS_ResourceDefinition %}

{% span #schemaresourcedefinition /%}
{% span #schema_ResourceDefinition /%}
{% span #tocSresourcedefinition /%}
{% span #tocsresourcedefinition /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|attributeFilter|[ResourceDefinitionFilter](#schemaresourcedefinitionfilter)|true|none|none|

## Access {% #tocS_Access %}

{% span #schemaaccess /%}
{% span #schema_Access /%}
{% span #tocSaccess /%}
{% span #tocsaccess /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|permission|string|true|none|none|
|resourceDefinitions|[[ResourceDefinition](#schemaresourcedefinition)]|true|none|none|

## Role {% #tocS_Role %}

{% span #schemarole /%}
{% span #schema_Role /%}
{% span #tocSrole /%}
{% span #tocsrole /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|display_name|string|false|none|none|
|description|string|false|none|none|

## RoleIn {% #tocS_RoleIn %}

{% span #schemarolein /%}
{% span #schema_RoleIn /%}
{% span #tocSrolein /%}
{% span #tocsrolein /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Role](#schemarole)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» access|[[Access](#schemaaccess)]|true|none|none|

## RolePagination {% #tocS_RolePagination %}

{% span #schemarolepagination /%}
{% span #schema_RolePagination /%}
{% span #tocSrolepagination /%}
{% span #tocsrolepagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[RoleOut](#schemaroleout)]|true|none|none|

## RolePaginationDynamic {% #tocS_RolePaginationDynamic %}

{% span #schemarolepaginationdynamic /%}
{% span #schema_RolePaginationDynamic /%}
{% span #tocSrolepaginationdynamic /%}
{% span #tocsrolepaginationdynamic /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[RoleOutDynamic](#schemaroleoutdynamic)]|true|none|none|

## RoleOut {% #tocS_RoleOut %}

{% span #schemaroleout /%}
{% span #schema_RoleOut /%}
{% span #tocSroleout /%}
{% span #tocsroleout /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Role](#schemarole)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» policyCount|integer|false|none|none|
|» accessCount|integer|false|none|none|
|» applications|[string]|false|none|none|
|» system|boolean|false|none|none|
|» platform_default|boolean|false|none|none|
|» admin_default|boolean|false|none|none|
|» external_role_id|string|false|none|none|
|» external_tenant|string|false|none|none|

## RoleOutDynamic {% #tocS_RoleOutDynamic %}

{% span #schemaroleoutdynamic /%}
{% span #schema_RoleOutDynamic /%}
{% span #tocSroleoutdynamic /%}
{% span #tocsroleoutdynamic /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Role](#schemarole)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» policyCount|integer|true|none|none|
|» accessCount|integer|true|none|none|
|» applications|[string]|true|none|none|
|» system|boolean|true|none|none|
|» platform_default|boolean|true|none|none|
|» admin_default|boolean|true|none|none|
|» groups_in_count|integer|false|none|none|
|» groups_in|[[AdditionalGroup](#schemaadditionalgroup)]|false|none|none|
|» external_role_id|string|false|none|none|
|» external_tenant|string|false|none|none|

## RolePatch {% #tocS_RolePatch %}

{% span #schemarolepatch /%}
{% span #schema_RolePatch /%}
{% span #tocSrolepatch /%}
{% span #tocsrolepatch /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|display_name|string|false|none|none|
|description|string|false|none|none|

## RoleWithAccess {% #tocS_RoleWithAccess %}

{% span #schemarolewithaccess /%}
{% span #schema_RoleWithAccess /%}
{% span #tocSrolewithaccess /%}
{% span #tocsrolewithaccess /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[RoleOut](#schemaroleout)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» access|[[Access](#schemaaccess)]|true|none|none|

## Policy {% #tocS_Policy %}

{% span #schemapolicy /%}
{% span #schema_Policy /%}
{% span #tocSpolicy /%}
{% span #tocspolicy /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|false|none|none|

## PolicyIn {% #tocS_PolicyIn %}

{% span #schemapolicyin /%}
{% span #schema_PolicyIn /%}
{% span #tocSpolicyin /%}
{% span #tocspolicyin /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Policy](#schemapolicy)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» group|string(uuid)|true|none|none|
|» roles|[string]|true|none|none|

## PolicyExtended {% #tocS_PolicyExtended %}

{% span #schemapolicyextended /%}
{% span #schema_PolicyExtended /%}
{% span #tocSpolicyextended /%}
{% span #tocspolicyextended /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Policy](#schemapolicy)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[UUID](#schemauuid)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[Timestamped](#schematimestamped)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» group|[GroupOut](#schemagroupout)|true|none|none|
|» roles|[[RoleOut](#schemaroleout)]|true|none|none|

## PolicyPagination {% #tocS_PolicyPagination %}

{% span #schemapolicypagination /%}
{% span #schema_PolicyPagination /%}
{% span #tocSpolicypagination /%}
{% span #tocspolicypagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[PolicyExtended](#schemapolicyextended)]|true|none|none|

## AccessPagination {% #tocS_AccessPagination %}

{% span #schemaaccesspagination /%}
{% span #schema_AccessPagination /%}
{% span #tocSaccesspagination /%}
{% span #tocsaccesspagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[Access](#schemaaccess)]|true|none|none|

## Status {% #tocS_Status %}

{% span #schemastatus /%}
{% span #schema_Status /%}
{% span #tocSstatus /%}
{% span #tocsstatus /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|api_version|integer(int64)|true|none|none|
|commit|string|false|none|none|

## Permission {% #tocS_Permission %}

{% span #schemapermission /%}
{% span #schema_Permission /%}
{% span #tocSpermission /%}
{% span #tocspermission /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|application|string|false|none|none|
|resource_type|string|false|none|none|
|verb|string|false|none|none|
|permission|string|false|none|none|
|description|string|false|none|none|

## PermissionPagination {% #tocS_PermissionPagination %}

{% span #schemapermissionpagination /%}
{% span #schema_PermissionPagination /%}
{% span #tocSpermissionpagination /%}
{% span #tocspermissionpagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[[Permission](#schemapermission)]|true|none|none|

## PermissionOptionsPagination {% #tocS_PermissionOptionsPagination %}

{% span #schemapermissionoptionspagination /%}
{% span #schema_PermissionOptionsPagination /%}
{% span #tocSpermissionoptionspagination /%}
{% span #tocspermissionoptionspagination /%}

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ListPagination](#schemalistpagination)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» data|[string]|true|none|none|

