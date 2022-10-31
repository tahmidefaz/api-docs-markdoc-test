---
title: OCM Service Log API v0.0.1
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

# OCM Service Log API v0.0.1 {% #ocm-service-log-api %}

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Receives and maintains logs from internal sources related to OpenShift clusters.

Base URLs:

- [http://localhost:8000](http://localhost:8000)

- [https://api.openshift.com](https://api.openshift.com)

- [https://api.stage.openshift.com](https://api.stage.openshift.com)

undefined

# Default {% #ocm-service-log-api-default %}

## get__api_service_logs_v1_cluster_logs

> Code samples
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
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:8000/api/service_logs/v1/cluster_logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/service_logs/v1/cluster_logs',
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
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:8000/api/service_logs/v1/cluster_logs', headers = headers)

print(r.json())

```

{% /codesamples%}

`GET /api/service_logs/v1/cluster_logs`

*Get all service logs*

undefined

undefined

undefined

undefined

## post__api_service_logs_v1_cluster_logs

> Code samples
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
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "http://localhost:8000/api/service_logs/v1/cluster_logs", data)
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
      "properties": {
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "type": "object"
    },
    {
      "properties": {
        "cluster_id": {
          "type": "string"
        },
        "cluster_uuid": {
          "type": "string"
        },
        "created_at": {
          "format": "date-time",
          "type": "string"
        },
        "created_by": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "event_stream_id": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "internal_only": {
          "default": false,
          "type": "boolean"
        },
        "last_name": {
          "type": "string"
        },
        "service_name": {
          "type": "string"
        },
        "severity": {
          "enum": [
            "Debug",
            "Info",
            "Warning",
            "Error",
            "Fatal"
          ],
          "type": "string"
        },
        "subscription_id": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        },
        "timestamp": {
          "format": "date-time",
          "type": "string"
        },
        "username": {
          "type": "string"
        }
      },
      "type": "object"
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/service_logs/v1/cluster_logs',
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
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.post('http://localhost:8000/api/service_logs/v1/cluster_logs', headers = headers)

print(r.json())

```

{% /codesamples%}

`POST /api/service_logs/v1/cluster_logs`

*Create a new log record*

> Body parameter

```json
{
  "allOf": [
    {
      "properties": {
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "type": "object"
    },
    {
      "properties": {
        "cluster_id": {
          "type": "string"
        },
        "cluster_uuid": {
          "type": "string"
        },
        "created_at": {
          "format": "date-time",
          "type": "string"
        },
        "created_by": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "event_stream_id": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "internal_only": {
          "default": false,
          "type": "boolean"
        },
        "last_name": {
          "type": "string"
        },
        "service_name": {
          "type": "string"
        },
        "severity": {
          "enum": [
            "Debug",
            "Info",
            "Warning",
            "Error",
            "Fatal"
          ],
          "type": "string"
        },
        "subscription_id": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        },
        "timestamp": {
          "format": "date-time",
          "type": "string"
        },
        "username": {
          "type": "string"
        }
      },
      "type": "object"
    }
  ]
}
```

undefined

undefined

undefined

undefined

## delete__api_service_logs_v1_cluster_logs_{id}

> Code samples
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
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "http://localhost:8000/api/service_logs/v1/cluster_logs/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/service_logs/v1/cluster_logs/{id}',
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
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.delete('http://localhost:8000/api/service_logs/v1/cluster_logs/{id}', headers = headers)

print(r.json())

```

{% /codesamples%}

`DELETE /api/service_logs/v1/cluster_logs/{id}`

*Delete log record by record id*

undefined

undefined

undefined

undefined

## get__api_service_logs_v1_cluster_logs_{id}

> Code samples
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
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:8000/api/service_logs/v1/cluster_logs/{id}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/service_logs/v1/cluster_logs/{id}',
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
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:8000/api/service_logs/v1/cluster_logs/{id}', headers = headers)

print(r.json())

```

{% /codesamples%}

`GET /api/service_logs/v1/cluster_logs/{id}`

*Get log by record id*

undefined

undefined

undefined

undefined

## get__api_service_logs_v1_clusters_{uuid}_cluster_logs

> Code samples
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
        "Authorization": []string{"Bearer {access-token}"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "http://localhost:8000/api/service_logs/v1/clusters/{uuid}/cluster_logs", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:8000/api/service_logs/v1/clusters/{uuid}/cluster_logs',
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
  'Accept': 'application/json',
  'Authorization': 'Bearer {access-token}'
}

r = requests.get('http://localhost:8000/api/service_logs/v1/clusters/{uuid}/cluster_logs', headers = headers)

print(r.json())

```

{% /codesamples%}

`GET /api/service_logs/v1/clusters/{uuid}/cluster_logs`

*Get all service logs for a specific cluster*

undefined

undefined

undefined

undefined

# Schemas

## ClusterLog {% #tocS_ClusterLog %}

[]() {% #schemaclusterlog %}
[]() {% #schema_ClusterLog %}
[]() {% #tocSclusterlog %}
[]() {% #tocsclusterlog %}

```json
{
  "allOf": [
    {
      "properties": {
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "type": "object"
    },
    {
      "properties": {
        "cluster_id": {
          "type": "string"
        },
        "cluster_uuid": {
          "type": "string"
        },
        "created_at": {
          "format": "date-time",
          "type": "string"
        },
        "created_by": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "event_stream_id": {
          "type": "string"
        },
        "first_name": {
          "type": "string"
        },
        "internal_only": {
          "default": false,
          "type": "boolean"
        },
        "last_name": {
          "type": "string"
        },
        "service_name": {
          "type": "string"
        },
        "severity": {
          "enum": [
            "Debug",
            "Info",
            "Warning",
            "Error",
            "Fatal"
          ],
          "type": "string"
        },
        "subscription_id": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        },
        "timestamp": {
          "format": "date-time",
          "type": "string"
        },
        "username": {
          "type": "string"
        }
      },
      "type": "object"
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ObjectReference](#schemaobjectreference)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» cluster_id|string|false|none|none|
|» cluster_uuid|string|false|none|none|
|» created_at|string(date-time)|false|none|none|
|» created_by|string|false|none|none|
|» description|string|false|none|none|
|» email|string|false|none|none|
|» event_stream_id|string|false|none|none|
|» first_name|string|false|none|none|
|» internal_only|boolean|false|none|none|
|» last_name|string|false|none|none|
|» service_name|string|false|none|none|
|» severity|string|false|none|none|
|» subscription_id|string|false|none|none|
|» summary|string|false|none|none|
|» timestamp|string(date-time)|false|none|none|
|» username|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|severity|Debug|
|severity|Info|
|severity|Warning|
|severity|Error|
|severity|Fatal|

## ClusterLogList {% #tocS_ClusterLogList %}

[]() {% #schemaclusterloglist %}
[]() {% #schema_ClusterLogList %}
[]() {% #tocSclusterloglist %}
[]() {% #tocsclusterloglist %}

```json
{
  "allOf": [
    {
      "properties": {
        "kind": {
          "type": "string"
        },
        "page": {
          "format": "int32",
          "type": "integer"
        },
        "size": {
          "format": "int32",
          "type": "integer"
        },
        "total": {
          "format": "int32",
          "type": "integer"
        }
      },
      "required": [
        "items",
        "kind",
        "page",
        "size",
        "total"
      ],
      "type": "object"
    },
    {
      "properties": {
        "items": {
          "items": {
            "allOf": [
              {
                "allOf": [
                  {
                    "properties": {
                      "href": {
                        "type": "string"
                      },
                      "id": {
                        "type": "string"
                      },
                      "kind": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  },
                  {
                    "properties": {
                      "cluster_id": {
                        "type": "string"
                      },
                      "cluster_uuid": {
                        "type": "string"
                      },
                      "created_at": {
                        "format": "date-time",
                        "type": "string"
                      },
                      "created_by": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "event_stream_id": {
                        "type": "string"
                      },
                      "first_name": {
                        "type": "string"
                      },
                      "internal_only": {
                        "default": false,
                        "type": "boolean"
                      },
                      "last_name": {
                        "type": "string"
                      },
                      "service_name": {
                        "type": "string"
                      },
                      "severity": {
                        "enum": [
                          "Debug",
                          "Info",
                          "Warning",
                          "Error",
                          "Fatal"
                        ],
                        "type": "string"
                      },
                      "subscription_id": {
                        "type": "string"
                      },
                      "summary": {
                        "type": "string"
                      },
                      "timestamp": {
                        "format": "date-time",
                        "type": "string"
                      },
                      "username": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                ]
              }
            ]
          },
          "type": "array"
        }
      },
      "type": "object"
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[List](#schemalist)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» items|[allOf]|false|none|none|

## Error {% #tocS_Error %}

[]() {% #schemaerror %}
[]() {% #schema_Error %}
[]() {% #tocSerror %}
[]() {% #tocserror %}

```json
{
  "allOf": [
    {
      "properties": {
        "href": {
          "type": "string"
        },
        "id": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        }
      },
      "type": "object"
    },
    {
      "properties": {
        "code": {
          "type": "string"
        },
        "operation_id": {
          "type": "string"
        },
        "reason": {
          "type": "string"
        }
      },
      "type": "object"
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[ObjectReference](#schemaobjectreference)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» code|string|false|none|none|
|» operation_id|string|false|none|none|
|» reason|string|false|none|none|

## ErrorList {% #tocS_ErrorList %}

[]() {% #schemaerrorlist %}
[]() {% #schema_ErrorList %}
[]() {% #tocSerrorlist %}
[]() {% #tocserrorlist %}

```json
{
  "allOf": [
    {
      "properties": {
        "kind": {
          "type": "string"
        },
        "page": {
          "format": "int32",
          "type": "integer"
        },
        "size": {
          "format": "int32",
          "type": "integer"
        },
        "total": {
          "format": "int32",
          "type": "integer"
        }
      },
      "required": [
        "items",
        "kind",
        "page",
        "size",
        "total"
      ],
      "type": "object"
    },
    {
      "properties": {
        "items": {
          "items": {
            "allOf": [
              {
                "properties": {
                  "href": {
                    "type": "string"
                  },
                  "id": {
                    "type": "string"
                  },
                  "kind": {
                    "type": "string"
                  }
                },
                "type": "object"
              },
              {
                "properties": {
                  "code": {
                    "type": "string"
                  },
                  "operation_id": {
                    "type": "string"
                  },
                  "reason": {
                    "type": "string"
                  }
                },
                "type": "object"
              }
            ]
          },
          "type": "array"
        }
      },
      "type": "object"
    }
  ]
}

```

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[List](#schemalist)|false|none|none|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» items|[[Error](#schemaerror)]|false|none|none|

## List {% #tocS_List %}

[]() {% #schemalist %}
[]() {% #schema_List %}
[]() {% #tocSlist %}
[]() {% #tocslist %}

```json
{
  "properties": {
    "kind": {
      "type": "string"
    },
    "page": {
      "format": "int32",
      "type": "integer"
    },
    "size": {
      "format": "int32",
      "type": "integer"
    },
    "total": {
      "format": "int32",
      "type": "integer"
    }
  },
  "required": [
    "items",
    "kind",
    "page",
    "size",
    "total"
  ],
  "type": "object"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|page|integer(int32)|true|none|none|
|size|integer(int32)|true|none|none|
|total|integer(int32)|true|none|none|

## ObjectReference {% #tocS_ObjectReference %}

[]() {% #schemaobjectreference %}
[]() {% #schema_ObjectReference %}
[]() {% #tocSobjectreference %}
[]() {% #tocsobjectreference %}

```json
{
  "properties": {
    "href": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "kind": {
      "type": "string"
    }
  },
  "type": "object"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|href|string|false|none|none|
|id|string|false|none|none|
|kind|string|false|none|none|

undefined

