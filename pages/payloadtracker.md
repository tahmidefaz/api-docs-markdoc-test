---
title: Insights Platform Payload Tracker API v1
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

# Insights Platform Payload Tracker API v1 {% #insights-platform-payload-tracker-api %}

A REST API to track payloads in the Insights Platform.

Base URLs:

- [/v1](/v1)

# Default {% #insights-platform-payload-tracker-api-default %}

## 

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
    req, err := http.NewRequest("GET", "/v1/payloads", data)
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

fetch('/v1/payloads',
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

r = requests.get('/v1/payloads', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /payloads`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|A page number within the paginated result set.|
|page_size|query|integer|false|Size of the page|
|sort_by|query|string|false|Attribute to sort results by|
|sort_dir|query|string|false|Direction to sort|
|account|query|string|false|filter for account|
|org_id|query|string|false|filter for org_id|
|inventory_id|query|string(uuid)|false|filter for inventory_id|
|system_id|query|string(uuid)|false|none|
|created_at_lt|query|string(date-time)|false|none|
|created_at_lte|query|string(date-time)|false|none|
|created_at_gt|query|string(date-time)|false|none|
|created_at_gte|query|string(date-time)|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort_by|account|
|sort_by|org_id|
|sort_by|inventory_id|
|sort_by|system_id|
|sort_by|created_at|
|sort_dir|asc|
|sort_dir|desc|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "required": [
    "count",
    "elapsed",
    "data"
  ],
  "properties": {
    "count": {
      "type": "integer",
      "description": "Total number of payloads with filters only"
    },
    "elapsed": {
      "type": "number",
      "description": "Total elapsed time in seconds of API request"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "title": "ID",
            "type": "integer"
          },
          "request_id": {
            "title": "Request ID",
            "type": "string",
            "minLength": 1,
            "format": "uuid"
          },
          "account": {
            "title": "Account",
            "type": "string"
          },
          "org_id": {
            "title": "Org ID",
            "type": "string"
          },
          "inventory_id": {
            "title": "Inventory ID",
            "type": "string",
            "format": "uuid"
          },
          "system_id": {
            "title": "System ID",
            "type": "string",
            "format": "uuid"
          },
          "created_at": {
            "title": "Created at",
            "type": "string",
            "format": "date-time",
            "readOnly": true
          }
        }
      },
      "description": "List of payloads based on the filters, page size and offset"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified resource was not found|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» count|integer|true|none|Total number of payloads with filters only|
|» elapsed|number|true|none|Total elapsed time in seconds of API request|
|» data|[[PayloadRetrieve](#schemapayloadretrieve)]|true|none|List of payloads based on the filters, page size and offset|
|»» id|integer|false|none|none|
|»» request_id|string(uuid)|false|none|none|
|»» account|string|false|none|none|
|»» org_id|string|false|none|none|
|»» inventory_id|string(uuid)|false|none|none|
|»» system_id|string(uuid)|false|none|none|
|»» created_at|string(date-time)|false|read-only|none|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/payloads/{request_id}", data)
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

fetch('/v1/payloads/{request_id}',
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

r = requests.get('/v1/payloads/{request_id}', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /payloads/{request_id}`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|request_id|path|string(uuid)|true|A unique value identifying this payload.|
|sort_by|query|string|false|Attribute to sort results by|
|sort_dir|query|string|false|Direction to sort|
|verbosity|query|integer|false|Parameter to control verbosity of returned data object|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort_by|service|
|sort_by|source|
|sort_by|status|
|sort_by|status_msg|
|sort_by|date|
|sort_by|created_at|
|sort_dir|asc|
|sort_dir|desc|
|verbosity|0|
|verbosity|1|
|verbosity|2|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "required": [
    "data",
    "duration"
  ],
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "required": [
          "service",
          "status"
        ],
        "type": "object",
        "properties": {
          "id": {
            "title": "Id",
            "type": "integer"
          },
          "service": {
            "title": "Service",
            "type": "string"
          },
          "source": {
            "title": "Source",
            "type": "string"
          },
          "account": {
            "title": "Account",
            "type": "string"
          },
          "org_id": {
            "title": "Org ID",
            "description": "Identifies the organization that the given resource belongs to",
            "type": "string"
          },
          "request_id": {
            "title": "Request ID",
            "type": "string",
            "minLength": 1,
            "format": "uuid"
          },
          "inventory_id": {
            "title": "Inventory ID",
            "type": "string",
            "format": "uuid"
          },
          "system_id": {
            "title": "System ID",
            "type": "string",
            "format": "uuid"
          },
          "status": {
            "title": "Status",
            "type": "string"
          },
          "status_msg": {
            "title": "Status Message",
            "type": "string"
          },
          "date": {
            "title": "Status Date",
            "type": "string",
            "format": "date-time",
            "readOnly": true
          },
          "created_at": {
            "title": "Created at",
            "type": "string",
            "format": "date-time",
            "readOnly": true
          }
        }
      },
      "description": "List of payloads based on the filters, page size and offset"
    },
    "duration": {
      "type": "object",
      "items": {
        "type": "object",
        "properties": {
          "service": {
            "type": "string"
          },
          "timedelta": {
            "type": "string"
          }
        }
      },
      "description": "Object with each service as a key and timedelta as an object"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Get single payload successful response|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified resource was not found|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|[[PayloadRetrieveByID](#schemapayloadretrievebyid)]|true|none|List of payloads based on the filters, page size and offset|
|»» id|integer|false|none|none|
|»» service|string|true|none|none|
|»» source|string|false|none|none|
|»» account|string|false|none|none|
|»» org_id|string|false|none|Identifies the organization that the given resource belongs to|
|»» request_id|string(uuid)|false|none|none|
|»» inventory_id|string(uuid)|false|none|none|
|»» system_id|string(uuid)|false|none|none|
|»» status|string|true|none|none|
|»» status_msg|string|false|none|none|
|»» date|string(date-time)|false|read-only|none|
|»» created_at|string(date-time)|false|read-only|none|
|» duration|object|true|none|Object with each service as a key and timedelta as an object|
|»» service|string|false|none|none|
|»» timedelta|string|false|none|none|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/payloads/{request_id}/archiveLink", data)
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

fetch('/v1/payloads/{request_id}/archiveLink',
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

r = requests.get('/v1/payloads/{request_id}/archiveLink', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /payloads/{request_id}/archiveLink`

Get the download URL for a payload's archive

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|request_id|path|string(uuid)|true|A unique value identifying this payload.|

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
      "type": "object",
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "URL to download the payload",
          "format": "url"
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[Error](#schemaerror)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The user is not authorized to access this resource|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The user does not have the permissions to access this resource|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified resource was not found|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|object|true|none|none|
|»» url|string(url)|true|none|URL to download the payload|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/payloads/{request_id}/kibanaLink", data)
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

fetch('/v1/payloads/{request_id}/kibanaLink',
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

r = requests.get('/v1/payloads/{request_id}/kibanaLink', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /payloads/{request_id}/kibanaLink`

Get the URL for a payload's Kibana dashboard

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|request_id|path|string(uuid)|true|A unique value identifying this payload.|
|service|query|string|false|Service to get archive link for|

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
      "type": "object",
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "URL to the payload's Kibana dashboard",
          "format": "url"
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The user does not have the permissions to access this resource|[Error](#schemaerror)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified resource was not found|[Error](#schemaerror)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|An error occured within the service or in the services it replies upon|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» data|object|true|none|none|
|»» url|string(url)|true|none|URL to the payload's Kibana dashboard|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/roles/archiveLink", data)
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

fetch('/v1/roles/archiveLink',
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

r = requests.get('/v1/roles/archiveLink', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /roles/archiveLink`

Check if the user has the required LDAP role in their Identity Header to request archive download links

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "required": [
    "allowed"
  ],
  "properties": {
    "allowed": {
      "type": "boolean",
      "description": "True if the user has the required LDAP role"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User has the required LDAP role for the downloading archives|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|The user is not authorized to access this resource|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|The user does not have the permissions to access this resource|[Error](#schemaerror)|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» allowed|boolean|true|none|True if the user has the required LDAP role|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/statuses", data)
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

fetch('/v1/statuses',
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

r = requests.get('/v1/statuses', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /statuses`

Get individual payload statuses for payloads.

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|A page number within the paginated result set.|
|page_size|query|integer|false|Size of the page|
|sort_by|query|string|false|Attribute to sort results by|
|sort_dir|query|string|false|Direction to sort|
|service|query|string|false|filter for service|
|source|query|string|false|none|
|status|query|string|false|filter for status|
|status_msg|query|string|false|none|
|date_lt|query|string(date-time)|false|none|
|date_lte|query|string(date-time)|false|none|
|date_gt|query|string(date-time)|false|none|
|date_gte|query|string(date-time)|false|none|
|created_at_lt|query|string(date-time)|false|none|
|created_at_lte|query|string(date-time)|false|none|
|created_at_gt|query|string(date-time)|false|none|
|created_at_gte|query|string(date-time)|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort_by|service|
|sort_by|source|
|sort_by|request_id|
|sort_by|status|
|sort_by|status_msg|
|sort_by|date|
|sort_by|created_at|
|sort_dir|asc|
|sort_dir|desc|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "required": [
    "count",
    "elapsed",
    "data"
  ],
  "properties": {
    "count": {
      "type": "integer",
      "description": "Total number of statuses with filters only"
    },
    "elapsed": {
      "type": "number",
      "description": "Total elapsed time in seconds of API request"
    },
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "title": "Id",
            "type": "string"
          },
          "service": {
            "title": "Service",
            "type": "string"
          },
          "source": {
            "title": "Source",
            "type": "string"
          },
          "request_id": {
            "title": "Request ID",
            "type": "string",
            "minLength": 1,
            "format": "uuid"
          },
          "status": {
            "title": "Status",
            "type": "string"
          },
          "status_msg": {
            "title": "Status Message",
            "type": "string"
          },
          "date": {
            "title": "Status Date",
            "type": "string",
            "format": "date-time",
            "readOnly": true
          },
          "created_at": {
            "title": "Created at",
            "type": "string",
            "format": "date-time",
            "readOnly": true
          }
        }
      },
      "description": "List of statuses based on the filters, page size and offset"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Response Schema

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» count|integer|true|none|Total number of statuses with filters only|
|» elapsed|number|true|none|Total elapsed time in seconds of API request|
|» data|[[StatusRetrieve](#schemastatusretrieve)]|true|none|List of statuses based on the filters, page size and offset|
|»» id|string|false|none|none|
|»» service|string|false|none|none|
|»» source|string|false|none|none|
|»» request_id|string(uuid)|false|none|none|
|»» status|string|false|none|none|
|»» status_msg|string|false|none|none|
|»» date|string(date-time)|false|read-only|none|
|»» created_at|string(date-time)|false|read-only|none|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/health", data)
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

fetch('/v1/health',
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

r = requests.get('/v1/health', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /health`

runs liveness checks for the api and service and returns 200 or 404

{% jsonsnippet title="Example Response" omitFirst=true %}

> 202 Response

```json
{
  "description": "The tests run were successful",
  "content": {
    "application/json": {
      "schema": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        },
        "required": [
          "message"
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
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|liveness checks successful|[#/components/responses/TestPassed](#schema#/components/responses/testpassed)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|liveness checks failed|[#/components/responses/TestFailed](#schema#/components/responses/testfailed)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## 

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
    req, err := http.NewRequest("GET", "/v1/stats", data)
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

fetch('/v1/stats',
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

r = requests.get('/v1/stats', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /stats`

### Query Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stat|query|string|false|Stat to use|

#### Enumerated Values

|Parameter|Value|
|---|---|
|stat|SuccessRate|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "required": [
    "message"
  ],
  "type": "object",
  "properties": {
    "message": {
      "type": "string"
    }
  }
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|successfully returned requested stats|[StatsRetrieve](#schemastatsretrieve)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|The specified resource was not found|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
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
|message|string|true|none|none|

## Success {% #tocS_Success %}

{% span #schemasuccess /%}
{% span #schema_Success /%}
{% span #tocSsuccess /%}
{% span #tocssuccess /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

## PayloadRetrieveByID {% #tocS_PayloadRetrieveByID %}

{% span #schemapayloadretrievebyid /%}
{% span #schema_PayloadRetrieveByID /%}
{% span #tocSpayloadretrievebyid /%}
{% span #tocspayloadretrievebyid /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|service|string|true|none|none|
|source|string|false|none|none|
|account|string|false|none|none|
|org_id|string|false|none|Identifies the organization that the given resource belongs to|
|request_id|string(uuid)|false|none|none|
|inventory_id|string(uuid)|false|none|none|
|system_id|string(uuid)|false|none|none|
|status|string|true|none|none|
|status_msg|string|false|none|none|
|date|string(date-time)|false|read-only|none|
|created_at|string(date-time)|false|read-only|none|

## PayloadRetrieve {% #tocS_PayloadRetrieve %}

{% span #schemapayloadretrieve /%}
{% span #schema_PayloadRetrieve /%}
{% span #tocSpayloadretrieve /%}
{% span #tocspayloadretrieve /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|false|none|none|
|request_id|string(uuid)|false|none|none|
|account|string|false|none|none|
|org_id|string|false|none|none|
|inventory_id|string(uuid)|false|none|none|
|system_id|string(uuid)|false|none|none|
|created_at|string(date-time)|false|read-only|none|

## StatusRetrieve {% #tocS_StatusRetrieve %}

{% span #schemastatusretrieve /%}
{% span #schema_StatusRetrieve /%}
{% span #tocSstatusretrieve /%}
{% span #tocsstatusretrieve /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|service|string|false|none|none|
|source|string|false|none|none|
|request_id|string(uuid)|false|none|none|
|status|string|false|none|none|
|status_msg|string|false|none|none|
|date|string(date-time)|false|read-only|none|
|created_at|string(date-time)|false|read-only|none|

## DurationsRetrieve {% #tocS_DurationsRetrieve %}

{% span #schemadurationsretrieve /%}
{% span #schema_DurationsRetrieve /%}
{% span #tocSdurationsretrieve /%}
{% span #tocsdurationsretrieve /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|service|string|false|none|none|
|timedelta|string|false|none|none|

## StatsRetrieve {% #tocS_StatsRetrieve %}

{% span #schemastatsretrieve /%}
{% span #schema_StatsRetrieve /%}
{% span #tocSstatsretrieve /%}
{% span #tocsstatsretrieve /%}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

