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

# Authentication

* API Key (AccessToken)
    - Parameter Name: **Authorization**, in: header. Authorization: AccessToken {cluster-uuid}:{access-token}

- HTTP Authentication, scheme: bearer

# Default {% #ocm-service-log-api-default %}

## get__api_service_logs_v1_cluster_logs

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

{% /codesamples %}

`GET /api/service_logs/v1/cluster_logs`

*Get all service logs*

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer(int32)|false|Page number of record list when record list exceeds specified page size|
|size|query|integer(int32)|false|Maximum number of records to return|
|search|query|string|false|Specifies the search criteria. The syntax of this parameter is|
|orderBy|query|string|false|Specifies the order by criteria. The syntax of this parameter is|
|fields|query|string|false|Supplies a comma-separated list of fields to be returned.|
|format|query|string|false|Get log records in various format types (eg. csv/json)|
|fetchAccounts|query|boolean|false|If true, includes the account reference information in the output. Could slow request response time.|

#### Detailed descriptions

**search**: Specifies the search criteria. The syntax of this parameter is
similar to the syntax of the _where_ clause of an SQL statement,
using the names of the json attributes / column names of the account. 
For example, in order to retrieve all the accounts with a username
starting with `my`:

```sql
username like 'my%'
```

The search criteria can also be applied on related resource.
For example, in order to retrieve all the subscriptions labeled by `foo=bar`,

```sql
subscription_labels.key = 'foo' and subscription_labels.value = 'bar'
```

If the parameter isn't provided, or if the value is empty, then
all the accounts that the user has permission to see will be
returned.

**orderBy**: Specifies the order by criteria. The syntax of this parameter is
similar to the syntax of the _order by_ clause of an SQL statement,
but using the names of the json attributes / column of the account.
For example, in order to retrieve all accounts ordered by username:

```sql
username asc
```

Or in order to retrieve all accounts ordered by username _and_ first name:

```sql
username asc, firstName asc
```

If the parameter isn't provided, or if the value is empty, then
no explicit ordering will be applied.

**fields**: Supplies a comma-separated list of fields to be returned.
Fields of sub-structures and of arrays use <structure>.<field> notation.
<stucture>.* means all field of a structure
Example: For each Subscription to get id, href, plan(id and kind) and labels (all fields)

```
ocm get subscriptions --parameter fields=id,href,plan.id,plan.kind,labels.* --parameter fetchLabels=true
```

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

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

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON array of Cluster Service records|[ClusterLogList](#schemaclusterloglist)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Auth token is invalid|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to perform operation|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected error occurred|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
Bearer, AccessToken
{% /paragraph %}

## post__api_service_logs_v1_cluster_logs

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

{% /codesamples %}

`POST /api/service_logs/v1/cluster_logs`

*Create a new log record*

### Body parameter

{% jsonsnippet title="Body parameters" %}
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

{% /jsonsnippet %}

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[ClusterLog](#schemaclusterlog)|true|Log record|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 201 Response

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

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Log record was Created|[ClusterLog](#schemaclusterlog)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Validation errors occurred|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Auth token is invalid|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to perform operation|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An unexpected error occurred creating the log|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
Bearer, AccessToken
{% /paragraph %}

## delete__api_service_logs_v1_cluster_logs_{id}

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

{% /codesamples %}

`DELETE /api/service_logs/v1/cluster_logs/{id}`

*Delete log record by record id*

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the record|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 401 Response

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

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Log record successfully deleted|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Auth token is invalid|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to perform operation|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|No log record with specified id exist|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An unexpected error occurred deleting the log records|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
Bearer, AccessToken
{% /paragraph %}

## get__api_service_logs_v1_cluster_logs_{id}

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

{% /codesamples %}

`GET /api/service_logs/v1/cluster_logs/{id}`

*Get log by record id*

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|The id of the record|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

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

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON of the log record|[ClusterLog](#schemaclusterlog)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Auth token is invalid|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to perform operation|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected error occurred|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
Bearer, AccessToken
{% /paragraph %}

## get__api_service_logs_v1_clusters_{uuid}_cluster_logs

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

{% /codesamples %}

`GET /api/service_logs/v1/clusters/{uuid}/cluster_logs`

*Get all service logs for a specific cluster*

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string|true|The uuid of the record (clusterUUID)|
|page|query|integer(int32)|false|Page number of record list when record list exceeds specified page size|
|size|query|integer(int32)|false|Maximum number of records to return|
|search|query|string|false|Specifies the search criteria. The syntax of this parameter is|
|orderBy|query|string|false|Specifies the order by criteria. The syntax of this parameter is|
|fields|query|string|false|Supplies a comma-separated list of fields to be returned.|
|format|query|string|false|Get log records in various format types (eg. csv/json)|
|fetchAccounts|query|boolean|false|If true, includes the account reference information in the output. Could slow request response time.|

#### Detailed descriptions

**search**: Specifies the search criteria. The syntax of this parameter is
similar to the syntax of the _where_ clause of an SQL statement,
using the names of the json attributes / column names of the account. 
For example, in order to retrieve all the accounts with a username
starting with `my`:

```sql
username like 'my%'
```

The search criteria can also be applied on related resource.
For example, in order to retrieve all the subscriptions labeled by `foo=bar`,

```sql
subscription_labels.key = 'foo' and subscription_labels.value = 'bar'
```

If the parameter isn't provided, or if the value is empty, then
all the accounts that the user has permission to see will be
returned.

**orderBy**: Specifies the order by criteria. The syntax of this parameter is
similar to the syntax of the _order by_ clause of an SQL statement,
but using the names of the json attributes / column of the account.
For example, in order to retrieve all accounts ordered by username:

```sql
username asc
```

Or in order to retrieve all accounts ordered by username _and_ first name:

```sql
username asc, firstName asc
```

If the parameter isn't provided, or if the value is empty, then
no explicit ordering will be applied.

**fields**: Supplies a comma-separated list of fields to be returned.
Fields of sub-structures and of arrays use <structure>.<field> notation.
<stucture>.* means all field of a structure
Example: For each Subscription to get id, href, plan(id and kind) and labels (all fields)

```
ocm get subscriptions --parameter fields=id,href,plan.id,plan.kind,labels.* --parameter fetchLabels=true
```

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

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

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A JSON array or CSV of Cluster Service records|string|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Auth token is invalid|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Unauthorized to perform operation|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Unexpected error occurred|[Error](#schemaerror)|

{% paragraph .warning %}
To perform this operation, you must be authenticated by means of one of the following methods:
Bearer
{% /paragraph %}

# Schemas

## ClusterLog {% #tocS_ClusterLog %}

{% span #schemaclusterlog /%}
{% span #schema_ClusterLog /%}
{% span #tocSclusterlog /%}
{% span #tocsclusterlog /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

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

{% span #schemaclusterloglist /%}
{% span #schema_ClusterLogList /%}
{% span #tocSclusterloglist /%}
{% span #tocsclusterloglist /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

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

{% span #schemaerror /%}
{% span #schema_Error /%}
{% span #tocSerror /%}
{% span #tocserror /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

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

{% span #schemaerrorlist /%}
{% span #schema_ErrorList /%}
{% span #tocSerrorlist /%}
{% span #tocserrorlist /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

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

{% span #schemalist /%}
{% span #schema_List /%}
{% span #tocSlist /%}
{% span #tocslist /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|kind|string|true|none|none|
|page|integer(int32)|true|none|none|
|size|integer(int32)|true|none|none|
|total|integer(int32)|true|none|none|

## ObjectReference {% #tocS_ObjectReference %}

{% span #schemaobjectreference /%}
{% span #schema_ObjectReference /%}
{% span #tocSobjectreference /%}
{% span #tocsobjectreference /%}

{% jsonsnippet title="Sample" %}
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
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|href|string|false|none|none|
|id|string|false|none|none|
|kind|string|false|none|none|

