---
title: System Baseline Backend Service v1.0
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

# System Baseline Backend Service v1.0 {% #system-baseline-backend-service %}

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Service that returns system baselines

Base URLs:

- [/api/system-baseline/v1](/api/system-baseline/v1)

# Authentication

* API Key (ApiKeyAuth)
    - Parameter Name: **x-rh-identity**, in: header. Identity header provided by 3scale

# Default {% #system-baseline-backend-service-default %}

## system_baseline.views.v1.get_baselines {% #system_baselineviewsv1get_baselines %}

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
    req, err := http.NewRequest("GET", "/api/system-baseline/v1/baselines", data)
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

fetch('/api/system-baseline/v1/baselines',
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

r = requests.get('/api/system-baseline/v1/baselines', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /baselines`

*fetch list of Baseline IDs*

Fetch the list of Baseline IDs

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|offset|query|integer|false|item number offset|
|limit|query|integer|false|A number of items to return|
|order_by|query|string|false|Ordering field name, defaults to display_name|
|order_how|query|string|false|Direction of the ordering, defaults to ASC|
|display_name|query|[DisplayName](#schemadisplayname)|false|string to search for in display name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|display_name|
|order_by|created_on|
|order_by|updated|
|order_how|ASC|
|order_how|DESC|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "properties": {
    "data": {
      "items": {
        "properties": {
          "account": {
            "type": "string"
          },
          "baseline_facts": {
            "items": {
              "additionalProperties": false,
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                },
                "values": {
                  "items": {
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "items": {
                              "type": "string"
                            },
                            "type": "array"
                          }
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "value"
                    ],
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "required": [
                "name"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "created": {
            "format": "date",
            "type": "string"
          },
          "display_name": {
            "description": "the baseline display name",
            "maxLength": 200,
            "minLength": 1,
            "type": "string"
          },
          "fact_count": {
            "type": "integer"
          },
          "id": {
            "format": "uuid",
            "type": "string"
          },
          "mapped_system_count": {
            "type": "integer"
          },
          "notifications_enabled": {
            "type": "boolean"
          },
          "org_id": {
            "type": "string"
          },
          "updated": {
            "format": "date",
            "type": "string"
          }
        },
        "required": [
          "account",
          "org_id",
          "created",
          "display_name",
          "id",
          "updated",
          "notifications_enabled"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "links": {
      "properties": {
        "first": {
          "format": "url",
          "type": "string"
        },
        "last": {
          "format": "url",
          "type": "string"
        },
        "next": {
          "format": "url",
          "type": "string"
        },
        "previous": {
          "format": "url",
          "type": "string"
        }
      },
      "required": [
        "first",
        "last",
        "next",
        "previous"
      ],
      "type": "object"
    },
    "meta": {
      "properties": {
        "count": {
          "type": "integer"
        },
        "total_available": {
          "type": "integer"
        }
      },
      "required": [
        "count",
        "total_available"
      ],
      "type": "object"
    }
  },
  "required": [
    "data",
    "links",
    "meta"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a paginated list of baselines|[DataPage](#schemadatapage)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.create_baseline {% #system_baselineviewsv1create_baseline %}

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
    req, err := http.NewRequest("POST", "/api/system-baseline/v1/baselines", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "additionalProperties": false,
  "properties": {
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "hsp_uuid": {
      "type": "string"
    },
    "inventory_uuid": {
      "type": "string"
    }
  },
  "required": [
    "display_name"
  ],
  "type": "object"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/system-baseline/v1/baselines',
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

r = requests.post('/api/system-baseline/v1/baselines', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /baselines`

*create a baseline*

create a baseline

### Body parameter

{% jsonsnippet title="Body parameters" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "hsp_uuid": {
      "type": "string"
    },
    "inventory_uuid": {
      "type": "string"
    }
  },
  "required": [
    "display_name"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BaselineIn](#schemabaselinein)|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "properties": {
    "account": {
      "type": "string"
    },
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "created": {
      "format": "date",
      "type": "string"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "fact_count": {
      "type": "integer"
    },
    "id": {
      "format": "uuid",
      "type": "string"
    },
    "mapped_system_count": {
      "type": "integer"
    },
    "notifications_enabled": {
      "type": "boolean"
    },
    "org_id": {
      "type": "string"
    },
    "updated": {
      "format": "date",
      "type": "string"
    }
  },
  "required": [
    "account",
    "org_id",
    "created",
    "display_name",
    "id",
    "updated",
    "notifications_enabled"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a created baseline object|[Baseline](#schemabaseline)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.create_deletion_request {% #system_baselineviewsv1create_deletion_request %}

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
    req, err := http.NewRequest("POST", "/api/system-baseline/v1/baselines/deletion_request", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "additionalProperties": false,
  "properties": {
    "baseline_ids": {
      "items": {
        "maxLength": 36,
        "minLength": 32,
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "baseline_ids"
  ],
  "type": "object"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/system-baseline/v1/baselines/deletion_request',
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

r = requests.post('/api/system-baseline/v1/baselines/deletion_request', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /baselines/deletion_request`

*create a request to delete one or more baselines*

create a request to delete one or more baselines

### Body parameter

{% jsonsnippet title="Body parameters" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "baseline_ids": {
      "items": {
        "maxLength": 36,
        "minLength": 32,
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "baseline_ids"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[BaselineIdsList](#schemabaselineidslist)|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "string"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a success message|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.delete_baselines_by_ids {% #system_baselineviewsv1delete_baselines_by_ids %}

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
    req, err := http.NewRequest("DELETE", "/api/system-baseline/v1/baselines/{baseline_ids}", data)
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

fetch('/api/system-baseline/v1/baselines/{baseline_ids}',
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

r = requests.delete('/api/system-baseline/v1/baselines/{baseline_ids}', headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /baselines/{baseline_ids}`

*delete one or more baselines*

delete one or more baselines

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|baseline_ids|path|array[string]|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "string"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a success message|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.get_baselines_by_ids {% #system_baselineviewsv1get_baselines_by_ids %}

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
    req, err := http.NewRequest("GET", "/api/system-baseline/v1/baselines/{baseline_ids}", data)
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

fetch('/api/system-baseline/v1/baselines/{baseline_ids}',
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

r = requests.get('/api/system-baseline/v1/baselines/{baseline_ids}', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /baselines/{baseline_ids}`

*fetch one or more Baseline objects*

Fetch one or more Baseline objects

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|offset|query|integer|false|item number offset|
|limit|query|integer|false|A number of items to return|
|order_by|query|string|false|Ordering field name, defaults to display_name|
|order_how|query|string|false|Direction of the ordering, defaults to ASC|
|baseline_ids|path|array[string]|true|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|order_by|display_name|
|order_by|created_on|
|order_by|updated|
|order_how|ASC|
|order_how|DESC|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "properties": {
    "data": {
      "items": {
        "properties": {
          "account": {
            "type": "string"
          },
          "baseline_facts": {
            "items": {
              "additionalProperties": false,
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                },
                "values": {
                  "items": {
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "items": {
                              "type": "string"
                            },
                            "type": "array"
                          }
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "value"
                    ],
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "required": [
                "name"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "created": {
            "format": "date",
            "type": "string"
          },
          "display_name": {
            "description": "the baseline display name",
            "maxLength": 200,
            "minLength": 1,
            "type": "string"
          },
          "fact_count": {
            "type": "integer"
          },
          "id": {
            "format": "uuid",
            "type": "string"
          },
          "mapped_system_count": {
            "type": "integer"
          },
          "notifications_enabled": {
            "type": "boolean"
          },
          "org_id": {
            "type": "string"
          },
          "updated": {
            "format": "date",
            "type": "string"
          }
        },
        "required": [
          "account",
          "org_id",
          "created",
          "display_name",
          "id",
          "updated",
          "notifications_enabled"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "links": {
      "properties": {
        "first": {
          "format": "url",
          "type": "string"
        },
        "last": {
          "format": "url",
          "type": "string"
        },
        "next": {
          "format": "url",
          "type": "string"
        },
        "previous": {
          "format": "url",
          "type": "string"
        }
      },
      "required": [
        "first",
        "last",
        "next",
        "previous"
      ],
      "type": "object"
    },
    "meta": {
      "properties": {
        "count": {
          "type": "integer"
        },
        "total_available": {
          "type": "integer"
        }
      },
      "required": [
        "count",
        "total_available"
      ],
      "type": "object"
    }
  },
  "required": [
    "data",
    "links",
    "meta"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a paginated list of baselines|[DataPage](#schemadatapage)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.update_baseline {% #system_baselineviewsv1update_baseline %}

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
    req, err := http.NewRequest("PATCH", "/api/system-baseline/v1/baselines/{baseline_id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "properties": {
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "facts_patch": {
      "items": {
        "description": "a JSON patch",
        "type": "object"
      },
      "type": "array"
    },
    "notifications_enabled": {
      "type": "boolean"
    }
  },
  "required": [
    "display_name",
    "facts_patch"
  ],
  "type": "object",
  "x-body-name": "system_baseline_patch"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/system-baseline/v1/baselines/{baseline_id}',
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

r = requests.patch('/api/system-baseline/v1/baselines/{baseline_id}', headers = headers)

print(r.json())

```

{% /codesamples %}

`PATCH /baselines/{baseline_id}`

*update a baseline*

update a baseline

### Body parameter

{% jsonsnippet title="Body parameters" %}
```json
{
  "properties": {
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "facts_patch": {
      "items": {
        "description": "a JSON patch",
        "type": "object"
      },
      "type": "array"
    },
    "notifications_enabled": {
      "type": "boolean"
    }
  },
  "required": [
    "display_name",
    "facts_patch"
  ],
  "type": "object",
  "x-body-name": "system_baseline_patch"
}
```

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|true|none|
|» display_name|body|[DisplayName](#schemadisplayname)|true|the baseline display name|
|» facts_patch|body|[[JsonPatch](#schemajsonpatch)]|true|[a JSON patch]|
|» notifications_enabled|body|boolean|false|none|
|baseline_id|path|string|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "items": {
    "properties": {
      "account": {
        "type": "string"
      },
      "baseline_facts": {
        "items": {
          "additionalProperties": false,
          "properties": {
            "name": {
              "type": "string"
            },
            "value": {
              "oneOf": [
                {
                  "type": "string"
                },
                {
                  "items": {
                    "type": "string"
                  },
                  "type": "array"
                }
              ]
            },
            "values": {
              "items": {
                "properties": {
                  "name": {
                    "type": "string"
                  },
                  "value": {
                    "oneOf": [
                      {
                        "type": "string"
                      },
                      {
                        "items": {
                          "type": "string"
                        },
                        "type": "array"
                      }
                    ]
                  }
                },
                "required": [
                  "name",
                  "value"
                ],
                "type": "object"
              },
              "type": "array"
            }
          },
          "required": [
            "name"
          ],
          "type": "object"
        },
        "type": "array"
      },
      "created": {
        "format": "date",
        "type": "string"
      },
      "display_name": {
        "description": "the baseline display name",
        "maxLength": 200,
        "minLength": 1,
        "type": "string"
      },
      "fact_count": {
        "type": "integer"
      },
      "id": {
        "format": "uuid",
        "type": "string"
      },
      "mapped_system_count": {
        "type": "integer"
      },
      "notifications_enabled": {
        "type": "boolean"
      },
      "org_id": {
        "type": "string"
      },
      "updated": {
        "format": "date",
        "type": "string"
      }
    },
    "required": [
      "account",
      "org_id",
      "created",
      "display_name",
      "id",
      "updated",
      "notifications_enabled"
    ],
    "type": "object"
  },
  "type": "array"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a list of updated Baseline objects|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Baseline](#schemabaseline)]|false|none|none|
|» account|string|true|none|none|
|» baseline_facts|[[BaselineFact](#schemabaselinefact)]|false|none|none|
|»» name|string|true|none|none|
|»» value|any|false|none|none|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|string|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»» *anonymous*|[string]|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» values|[object]|false|none|none|
|»»» name|string|true|none|none|
|»»» value|any|true|none|none|

*oneOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»» *anonymous*|string|false|none|none|

*xor*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»»»» *anonymous*|[string]|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» created|string(date)|true|none|none|
|» display_name|[DisplayName](#schemadisplayname)|true|none|the baseline display name|
|» fact_count|integer|false|none|none|
|» id|string(uuid)|true|none|none|
|» mapped_system_count|integer|false|none|none|
|» notifications_enabled|boolean|true|none|none|
|» org_id|string|true|none|none|
|» updated|string(date)|true|none|none|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.copy_baseline_by_id {% #system_baselineviewsv1copy_baseline_by_id %}

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
    req, err := http.NewRequest("POST", "/api/system-baseline/v1/baselines/{baseline_id}", data)
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

fetch('/api/system-baseline/v1/baselines/{baseline_id}?display_name=description,the%20baseline%20display%20name,maxLength,200,minLength,1,type,string',
{
  method: 'POST',

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

r = requests.post('/api/system-baseline/v1/baselines/{baseline_id}', params={
  'display_name': {
  "description": "the baseline display name",
  "maxLength": 200,
  "minLength": 1,
  "type": "string"
}
}, headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /baselines/{baseline_id}`

*copy a baseline*

copy a baseline, returning a new ID

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|display_name|query|[DisplayName](#schemadisplayname)|true|display name of the baseline|
|baseline_id|path|string|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "properties": {
    "account": {
      "type": "string"
    },
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "created": {
      "format": "date",
      "type": "string"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "fact_count": {
      "type": "integer"
    },
    "id": {
      "format": "uuid",
      "type": "string"
    },
    "mapped_system_count": {
      "type": "integer"
    },
    "notifications_enabled": {
      "type": "boolean"
    },
    "org_id": {
      "type": "string"
    },
    "updated": {
      "format": "date",
      "type": "string"
    }
  },
  "required": [
    "account",
    "org_id",
    "created",
    "display_name",
    "id",
    "updated",
    "notifications_enabled"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a created baseline object|[Baseline](#schemabaseline)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.list_systems_with_baseline {% #system_baselineviewsv1list_systems_with_baseline %}

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
    req, err := http.NewRequest("GET", "/api/system-baseline/v1/baselines/{baseline_id}/systems", data)
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

fetch('/api/system-baseline/v1/baselines/{baseline_id}/systems',
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

r = requests.get('/api/system-baseline/v1/baselines/{baseline_id}/systems', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /baselines/{baseline_id}/systems`

*list systems with baseline*

list systems with baseline

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|baseline_id|path|string|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a created list of system associations|[SystemIdsList](#schemasystemidslist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.create_systems_with_baseline {% #system_baselineviewsv1create_systems_with_baseline %}

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
    req, err := http.NewRequest("POST", "/api/system-baseline/v1/baselines/{baseline_id}/systems", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/system-baseline/v1/baselines/{baseline_id}/systems',
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

r = requests.post('/api/system-baseline/v1/baselines/{baseline_id}/systems', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /baselines/{baseline_id}/systems`

*add systems with baseline*

add systems with baseline

### Body parameter

{% jsonsnippet title="Body parameters" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SystemIdsList](#schemasystemidslist)|true|none|
|baseline_id|path|string|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a created list of system associations|[SystemIdsList](#schemasystemidslist)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.create_deletion_request_for_systems {% #system_baselineviewsv1create_deletion_request_for_systems %}

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
    req, err := http.NewRequest("POST", "/api/system-baseline/v1/baselines/{baseline_id}/systems/deletion_request", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript
const inputBody = '{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/api/system-baseline/v1/baselines/{baseline_id}/systems/deletion_request',
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

r = requests.post('/api/system-baseline/v1/baselines/{baseline_id}/systems/deletion_request', headers = headers)

print(r.json())

```

{% /codesamples %}

`POST /baselines/{baseline_id}/systems/deletion_request`

*delete systems with baseline*

delete systems with baseline

### Body parameter

{% jsonsnippet title="Body parameters" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}
```

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SystemIdsList](#schemasystemidslist)|true|none|
|baseline_id|path|string|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "string"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a success message|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.delete_systems_with_baseline {% #system_baselineviewsv1delete_systems_with_baseline %}

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
    req, err := http.NewRequest("DELETE", "/api/system-baseline/v1/baselines/{baseline_id}/systems/{system_ids}", data)
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

fetch('/api/system-baseline/v1/baselines/{baseline_id}/systems/{system_ids}',
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

r = requests.delete('/api/system-baseline/v1/baselines/{baseline_id}/systems/{system_ids}', headers = headers)

print(r.json())

```

{% /codesamples %}

`DELETE /baselines/{baseline_id}/systems/{system_ids}`

*delete one or more systems with baseline*

delete one or more systems with baselines

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|baseline_id|path|string|true|none|
|system_ids|path|array[string]|true|none|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "string"
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a success message|string|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|The server could not process the current request.|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Insufficient permissions to fulfill request.|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An internal server error has occurred.|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## system_baseline.views.v1.get_version {% #system_baselineviewsv1get_version %}

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
    req, err := http.NewRequest("GET", "/api/system-baseline/v1/version", data)
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

fetch('/api/system-baseline/v1/version',
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

r = requests.get('/api/system-baseline/v1/version', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /version`

*get the service version*

get the service version

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "properties": {
    "version": {
      "type": "string"
    }
  },
  "required": [
    "version"
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|a service version|[Version](#schemaversion)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

# Schemas

## Baseline {% #tocS_Baseline %}

{% span #schemabaseline /%}
{% span #schema_Baseline /%}
{% span #tocSbaseline /%}
{% span #tocsbaseline /%}

{% jsonsnippet title="Sample" %}
```json
{
  "properties": {
    "account": {
      "type": "string"
    },
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "created": {
      "format": "date",
      "type": "string"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "fact_count": {
      "type": "integer"
    },
    "id": {
      "format": "uuid",
      "type": "string"
    },
    "mapped_system_count": {
      "type": "integer"
    },
    "notifications_enabled": {
      "type": "boolean"
    },
    "org_id": {
      "type": "string"
    },
    "updated": {
      "format": "date",
      "type": "string"
    }
  },
  "required": [
    "account",
    "org_id",
    "created",
    "display_name",
    "id",
    "updated",
    "notifications_enabled"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|account|string|true|none|none|
|baseline_facts|[[BaselineFact](#schemabaselinefact)]|false|none|none|
|created|string(date)|true|none|none|
|display_name|[DisplayName](#schemadisplayname)|true|none|the baseline display name|
|fact_count|integer|false|none|none|
|id|string(uuid)|true|none|none|
|mapped_system_count|integer|false|none|none|
|notifications_enabled|boolean|true|none|none|
|org_id|string|true|none|none|
|updated|string(date)|true|none|none|

## BaselineFact {% #tocS_BaselineFact %}

{% span #schemabaselinefact /%}
{% span #schema_BaselineFact /%}
{% span #tocSbaselinefact /%}
{% span #tocsbaselinefact /%}

{% jsonsnippet title="Sample" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string"
    },
    "value": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "items": {
            "type": "string"
          },
          "type": "array"
        }
      ]
    },
    "values": {
      "items": {
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          }
        },
        "required": [
          "name",
          "value"
        ],
        "type": "object"
      },
      "type": "array"
    }
  },
  "required": [
    "name"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|value|any|false|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[string]|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|values|[object]|false|none|none|
|» name|string|true|none|none|
|» value|any|true|none|none|

oneOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

xor

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|[string]|false|none|none|

## BaselineIdsList {% #tocS_BaselineIdsList %}

{% span #schemabaselineidslist /%}
{% span #schema_BaselineIdsList /%}
{% span #tocSbaselineidslist /%}
{% span #tocsbaselineidslist /%}

{% jsonsnippet title="Sample" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "baseline_ids": {
      "items": {
        "maxLength": 36,
        "minLength": 32,
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "baseline_ids"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|baseline_ids|[string]|true|none|none|

## BaselineIn {% #tocS_BaselineIn %}

{% span #schemabaselinein /%}
{% span #schema_BaselineIn /%}
{% span #tocSbaselinein /%}
{% span #tocsbaselinein /%}

{% jsonsnippet title="Sample" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "baseline_facts": {
      "items": {
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "items": {
                  "type": "string"
                },
                "type": "array"
              }
            ]
          },
          "values": {
            "items": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                }
              },
              "required": [
                "name",
                "value"
              ],
              "type": "object"
            },
            "type": "array"
          }
        },
        "required": [
          "name"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "display_name": {
      "description": "the baseline display name",
      "maxLength": 200,
      "minLength": 1,
      "type": "string"
    },
    "hsp_uuid": {
      "type": "string"
    },
    "inventory_uuid": {
      "type": "string"
    }
  },
  "required": [
    "display_name"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|baseline_facts|[[BaselineFact](#schemabaselinefact)]|false|none|none|
|display_name|[DisplayName](#schemadisplayname)|true|none|the baseline display name|
|hsp_uuid|string|false|none|none|
|inventory_uuid|string|false|none|none|

## DataPage {% #tocS_DataPage %}

{% span #schemadatapage /%}
{% span #schema_DataPage /%}
{% span #tocSdatapage /%}
{% span #tocsdatapage /%}

{% jsonsnippet title="Sample" %}
```json
{
  "properties": {
    "data": {
      "items": {
        "properties": {
          "account": {
            "type": "string"
          },
          "baseline_facts": {
            "items": {
              "additionalProperties": false,
              "properties": {
                "name": {
                  "type": "string"
                },
                "value": {
                  "oneOf": [
                    {
                      "type": "string"
                    },
                    {
                      "items": {
                        "type": "string"
                      },
                      "type": "array"
                    }
                  ]
                },
                "values": {
                  "items": {
                    "properties": {
                      "name": {
                        "type": "string"
                      },
                      "value": {
                        "oneOf": [
                          {
                            "type": "string"
                          },
                          {
                            "items": {
                              "type": "string"
                            },
                            "type": "array"
                          }
                        ]
                      }
                    },
                    "required": [
                      "name",
                      "value"
                    ],
                    "type": "object"
                  },
                  "type": "array"
                }
              },
              "required": [
                "name"
              ],
              "type": "object"
            },
            "type": "array"
          },
          "created": {
            "format": "date",
            "type": "string"
          },
          "display_name": {
            "description": "the baseline display name",
            "maxLength": 200,
            "minLength": 1,
            "type": "string"
          },
          "fact_count": {
            "type": "integer"
          },
          "id": {
            "format": "uuid",
            "type": "string"
          },
          "mapped_system_count": {
            "type": "integer"
          },
          "notifications_enabled": {
            "type": "boolean"
          },
          "org_id": {
            "type": "string"
          },
          "updated": {
            "format": "date",
            "type": "string"
          }
        },
        "required": [
          "account",
          "org_id",
          "created",
          "display_name",
          "id",
          "updated",
          "notifications_enabled"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "links": {
      "properties": {
        "first": {
          "format": "url",
          "type": "string"
        },
        "last": {
          "format": "url",
          "type": "string"
        },
        "next": {
          "format": "url",
          "type": "string"
        },
        "previous": {
          "format": "url",
          "type": "string"
        }
      },
      "required": [
        "first",
        "last",
        "next",
        "previous"
      ],
      "type": "object"
    },
    "meta": {
      "properties": {
        "count": {
          "type": "integer"
        },
        "total_available": {
          "type": "integer"
        }
      },
      "required": [
        "count",
        "total_available"
      ],
      "type": "object"
    }
  },
  "required": [
    "data",
    "links",
    "meta"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Baseline](#schemabaseline)]|true|none|none|
|links|object|true|none|none|
|» first|string(url)|true|none|none|
|» last|string(url)|true|none|none|
|» next|string(url)|true|none|none|
|» previous|string(url)|true|none|none|
|meta|object|true|none|none|
|» count|integer|true|none|none|
|» total_available|integer|true|none|none|

## DisplayName {% #tocS_DisplayName %}

{% span #schemadisplayname /%}
{% span #schema_DisplayName /%}
{% span #tocSdisplayname /%}
{% span #tocsdisplayname /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "the baseline display name",
  "maxLength": 200,
  "minLength": 1,
  "type": "string"
}

```
{% /jsonsnippet %}

the baseline display name

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|the baseline display name|

## Error {% #tocS_Error %}

{% span #schemaerror /%}
{% span #schema_Error /%}
{% span #tocSerror /%}
{% span #tocserror /%}

{% jsonsnippet title="Sample" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "detail": {
      "type": "string"
    },
    "status": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "type": {
      "type": "string"
    }
  },
  "required": [
    "detail",
    "status",
    "title",
    "type"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|detail|string|true|none|none|
|status|integer|true|none|none|
|title|string|true|none|none|
|type|string|true|none|none|

## JsonPatch {% #tocS_JsonPatch %}

{% span #schemajsonpatch /%}
{% span #schema_JsonPatch /%}
{% span #tocSjsonpatch /%}
{% span #tocsjsonpatch /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "a JSON patch",
  "type": "object"
}

```
{% /jsonsnippet %}

a JSON patch

### Properties

*None*

## SystemIdsList {% #tocS_SystemIdsList %}

{% span #schemasystemidslist /%}
{% span #schema_SystemIdsList /%}
{% span #tocSsystemidslist /%}
{% span #tocssystemidslist /%}

{% jsonsnippet title="Sample" %}
```json
{
  "additionalProperties": false,
  "properties": {
    "system_ids": {
      "items": {
        "format": "uuid",
        "type": "string"
      },
      "type": "array"
    }
  },
  "required": [
    "system_ids"
  ],
  "type": "object"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|system_ids|[string]|true|none|none|

## Version {% #tocS_Version %}

{% span #schemaversion /%}
{% span #schema_Version /%}
{% span #tocSversion /%}
{% span #tocsversion /%}

{% jsonsnippet title="Sample" %}
```json
{
  "properties": {
    "version": {
      "type": "string"
    }
  },
  "required": [
    "version"
  ]
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|version|string|true|none|none|

