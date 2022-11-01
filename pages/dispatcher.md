---
title: Playbook Dispatcher v1.0.0
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

# Playbook Dispatcher v1.0.0 {% #playbook-dispatcher %}

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Playbook Dispatcher is a service for running Ansible Playbooks on hosts connected via Cloud Connector.

Base URLs:

- [https://cloud.redhat.com](https://cloud.redhat.com)

- [/](/)

# Default {% #playbook-dispatcher-default %}

## api.runs.list {% #apirunslist %}

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
    req, err := http.NewRequest("GET", "https://cloud.redhat.com/api/playbook-dispatcher/v1/runs", data)
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

fetch('https://cloud.redhat.com/api/playbook-dispatcher/v1/runs',
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

r = requests.get('https://cloud.redhat.com/api/playbook-dispatcher/v1/runs', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /api/playbook-dispatcher/v1/runs`

*List Playbook runs*

Returns a list of Playbook runs for the given account. The list can be filtered using the `filter` parameter. The fields returned in the representation can be controller using `fields` parameter.

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|object|false|Allows for filtering based on various criteria|
|fields|query|object|false|Defines fields to be returned in the response.|
|sort_by|query|string|false|Sort order|
|limit|query|integer|false|Maximum number of results to return|
|offset|query|integer|false|Indicates the starting position of the query relative to the complete set of items that match the query|

#### Detailed descriptions

**fields**: Defines fields to be returned in the response.

#### Enumerated Values

|Parameter|Value|
|---|---|
|sort_by|created_at|
|sort_by|created_at:asc|
|sort_by|created_at:desc|

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "description": "Unique identifier of a Playbook run",
            "type": "string",
            "format": "uuid"
          },
          "account": {
            "description": "Identifier of the tenant",
            "type": "string",
            "minLength": 1,
            "maxLength": 10,
            "deprecated": true
          },
          "org_id": {
            "description": "Identifier of the tenant",
            "type": "string",
            "minLength": 1,
            "maxLength": 10,
            "example": "5318290"
          },
          "recipient": {
            "description": "Identifier of the host to which a given Playbook is addressed",
            "type": "string",
            "format": "uuid"
          },
          "correlation_id": {
            "description": "Unique identifier used to match work request with responses",
            "type": "string"
          },
          "name": {
            "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
            "type": "string",
            "example": "Fix Critical CVEs",
            "minLength": 1
          },
          "web_console_url": {
            "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
            "type": "string",
            "format": "url",
            "minLength": 1
          },
          "service": {
            "description": "Service that triggered the given Playbook run",
            "type": "string",
            "minLength": 1
          },
          "url": {
            "description": "URL hosting the Playbook",
            "type": "string",
            "format": "url"
          },
          "labels": {
            "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timeout": {
            "description": "Amount of seconds after which the run is considered failed due to timeout",
            "type": "integer",
            "default": 3600,
            "minimum": 0,
            "maximum": 604800
          },
          "status": {
            "description": "Current status of a Playbook run",
            "type": "string",
            "enum": [
              "running",
              "success",
              "failure",
              "timeout",
              "canceled"
            ]
          },
          "created_at": {
            "description": "A timestamp when the entry was created",
            "type": "string",
            "format": "date-time"
          },
          "updated_at": {
            "description": "A timestamp when the entry was last updated",
            "type": "string",
            "format": "date-time"
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "additionalProperties": false,
      "description": "Information about returned entities",
      "properties": {
        "count": {
          "type": "integer",
          "description": "number of results returned",
          "example": 50
        },
        "total": {
          "type": "integer",
          "description": "total number of results matching the query",
          "example": 114
        }
      },
      "required": [
        "count",
        "total"
      ]
    },
    "links": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "first",
        "last"
      ],
      "properties": {
        "first": {
          "type": "string",
          "description": "relative link to the first page of the query results"
        },
        "last": {
          "type": "string",
          "description": "relative link to the last page of the query results"
        },
        "next": {
          "type": "string",
          "description": "relative link to the next page of the query results"
        },
        "previous": {
          "type": "string",
          "description": "relative link to the previous page of the query results"
        }
      }
    }
  },
  "required": [
    "data",
    "meta",
    "links"
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Runs](#schemaruns)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access to the given resource is not allowed|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

## api.run.hosts.list {% #apirunhostslist %}

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
    req, err := http.NewRequest("GET", "https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts", data)
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

fetch('https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts',
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

r = requests.get('https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts', headers = headers)

print(r.json())

```

{% /codesamples %}

`GET /api/playbook-dispatcher/v1/run_hosts`

*List hosts involved in Playbook runs*

Returns a list of objects representing hosts involved in Playbook runs. Unless restricted using filters the resources spread across multiple Playbook runs. No merging or deduplication is performed by this resource - i.e. if a host X is involved in playbook runs A and B then two subresources with exist, one representing X running A and one for B.

### Parameters {% .parameters %}

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|object|false|Allows for filtering based on various criteria|
|fields|query|object|false|Defines fields to be returned in the response.|
|limit|query|integer|false|Maximum number of results to return|
|offset|query|integer|false|Indicates the starting position of the query relative to the complete set of items that match the query|

#### Detailed descriptions

**fields**: Defines fields to be returned in the response.

{% jsonsnippet title="Example Response" omitFirst=true %}

> 200 Response

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "host": {
            "description": "Name used to identify a host within Ansible inventory",
            "type": "string"
          },
          "stdout": {
            "description": "Output produced by running Ansible Playbook on the given host",
            "type": "string"
          },
          "status": {
            "description": "Current status of a Playbook run",
            "type": "string",
            "enum": [
              "running",
              "success",
              "failure",
              "timeout",
              "canceled"
            ]
          },
          "run": {
            "type": "object",
            "properties": {
              "id": {
                "description": "Unique identifier of a Playbook run",
                "type": "string",
                "format": "uuid"
              },
              "account": {
                "description": "Identifier of the tenant",
                "type": "string",
                "minLength": 1,
                "maxLength": 10,
                "deprecated": true
              },
              "org_id": {
                "description": "Identifier of the tenant",
                "type": "string",
                "minLength": 1,
                "maxLength": 10,
                "example": "5318290"
              },
              "recipient": {
                "description": "Identifier of the host to which a given Playbook is addressed",
                "type": "string",
                "format": "uuid"
              },
              "correlation_id": {
                "description": "Unique identifier used to match work request with responses",
                "type": "string"
              },
              "name": {
                "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
                "type": "string",
                "example": "Fix Critical CVEs",
                "minLength": 1
              },
              "web_console_url": {
                "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
                "type": "string",
                "format": "url",
                "minLength": 1
              },
              "service": {
                "description": "Service that triggered the given Playbook run",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "description": "URL hosting the Playbook",
                "type": "string",
                "format": "url"
              },
              "labels": {
                "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                }
              },
              "timeout": {
                "description": "Amount of seconds after which the run is considered failed due to timeout",
                "type": "integer",
                "default": 3600,
                "minimum": 0,
                "maximum": 604800
              },
              "status": {
                "description": "Current status of a Playbook run",
                "type": "string",
                "enum": [
                  "running",
                  "success",
                  "failure",
                  "timeout",
                  "canceled"
                ]
              },
              "created_at": {
                "description": "A timestamp when the entry was created",
                "type": "string",
                "format": "date-time"
              },
              "updated_at": {
                "description": "A timestamp when the entry was last updated",
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "inventory_id": {
            "type": "string",
            "format": "uuid"
          },
          "links": {
            "type": "object",
            "properties": {
              "inventory_host": {
                "type": "string",
                "nullable": true
              }
            }
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "additionalProperties": false,
      "description": "Information about returned entities",
      "properties": {
        "count": {
          "type": "integer",
          "description": "number of results returned",
          "example": 50
        },
        "total": {
          "type": "integer",
          "description": "total number of results matching the query",
          "example": 114
        }
      },
      "required": [
        "count",
        "total"
      ]
    },
    "links": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "first",
        "last"
      ],
      "properties": {
        "first": {
          "type": "string",
          "description": "relative link to the first page of the query results"
        },
        "last": {
          "type": "string",
          "description": "relative link to the last page of the query results"
        },
        "next": {
          "type": "string",
          "description": "relative link to the next page of the query results"
        },
        "previous": {
          "type": "string",
          "description": "relative link to the previous page of the query results"
        }
      }
    }
  },
  "required": [
    "data",
    "meta",
    "links"
  ]
}
```

{% /jsonsnippet %}

### Responses

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[RunHosts](#schemarunhosts)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access to the given resource is not allowed|[Error](#schemaerror)|

{% paragraph .success %}
This operation does not require authentication
{% /paragraph %}

# Schemas

## RunId {% #tocS_RunId %}

{% span #schemarunid /%}
{% span #schema_RunId /%}
{% span #tocSrunid /%}
{% span #tocsrunid /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Unique identifier of a Playbook run",
  "type": "string",
  "format": "uuid"
}

```
{% /jsonsnippet %}

Unique identifier of a Playbook run

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)|false|none|Unique identifier of a Playbook run|

## RunRecipient {% #tocS_RunRecipient %}

{% span #schemarunrecipient /%}
{% span #schema_RunRecipient /%}
{% span #tocSrunrecipient /%}
{% span #tocsrunrecipient /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Identifier of the host to which a given Playbook is addressed",
  "type": "string",
  "format": "uuid"
}

```
{% /jsonsnippet %}

Identifier of the host to which a given Playbook is addressed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)|false|none|Identifier of the host to which a given Playbook is addressed|

## RunTimeout {% #tocS_RunTimeout %}

{% span #schemaruntimeout /%}
{% span #schema_RunTimeout /%}
{% span #tocSruntimeout /%}
{% span #tocsruntimeout /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Amount of seconds after which the run is considered failed due to timeout",
  "type": "integer",
  "default": 3600,
  "minimum": 0,
  "maximum": 604800
}

```
{% /jsonsnippet %}

Amount of seconds after which the run is considered failed due to timeout

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|integer|false|none|Amount of seconds after which the run is considered failed due to timeout|

## RunCorrelationId {% #tocS_RunCorrelationId %}

{% span #schemaruncorrelationid /%}
{% span #schema_RunCorrelationId /%}
{% span #tocSruncorrelationid /%}
{% span #tocsruncorrelationid /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Unique identifier used to match work request with responses",
  "type": "string"
}

```
{% /jsonsnippet %}

Unique identifier used to match work request with responses

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Unique identifier used to match work request with responses|

## Account {% #tocS_Account %}

{% span #schemaaccount /%}
{% span #schema_Account /%}
{% span #tocSaccount /%}
{% span #tocsaccount /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Identifier of the tenant",
  "type": "string",
  "minLength": 1,
  "maxLength": 10,
  "deprecated": true
}

```
{% /jsonsnippet %}

Identifier of the tenant

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Identifier of the tenant|

## OrgId {% #tocS_OrgId %}

{% span #schemaorgid /%}
{% span #schema_OrgId /%}
{% span #tocSorgid /%}
{% span #tocsorgid /%}

{% jsonsnippet title="Sample" %}
```json
"5318290"

```
{% /jsonsnippet %}

Identifier of the tenant

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Identifier of the tenant|

## PlaybookName {% #tocS_PlaybookName %}

{% span #schemaplaybookname /%}
{% span #schema_PlaybookName /%}
{% span #tocSplaybookname /%}
{% span #tocsplaybookname /%}

{% jsonsnippet title="Sample" %}
```json
"Fix Critical CVEs"

```
{% /jsonsnippet %}

Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).|

## WebConsoleUrl {% #tocS_WebConsoleUrl %}

{% span #schemawebconsoleurl /%}
{% span #schema_WebConsoleUrl /%}
{% span #tocSwebconsoleurl /%}
{% span #tocswebconsoleurl /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
  "type": "string",
  "format": "url",
  "minLength": 1
}

```
{% /jsonsnippet %}

URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(url)|false|none|URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.|

## Service {% #tocS_Service %}

{% span #schemaservice /%}
{% span #schema_Service /%}
{% span #tocSservice /%}
{% span #tocsservice /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Service that triggered the given Playbook run",
  "type": "string",
  "minLength": 1
}

```
{% /jsonsnippet %}

Service that triggered the given Playbook run

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Service that triggered the given Playbook run|

## Url {% #tocS_Url %}

{% span #schemaurl /%}
{% span #schema_Url /%}
{% span #tocSurl /%}
{% span #tocsurl /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "URL hosting the Playbook",
  "type": "string",
  "format": "url"
}

```
{% /jsonsnippet %}

URL hosting the Playbook

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(url)|false|none|URL hosting the Playbook|

## Labels {% #tocS_Labels %}

{% span #schemalabels /%}
{% span #schema_Labels /%}
{% span #tocSlabels /%}
{% span #tocslabels /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
  "type": "object",
  "additionalProperties": {
    "type": "string"
  }
}

```
{% /jsonsnippet %}

Additional metadata about the Playbook run. Can be used for filtering purposes.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|string|false|none|none|

## RunStatus {% #tocS_RunStatus %}

{% span #schemarunstatus /%}
{% span #schema_RunStatus /%}
{% span #tocSrunstatus /%}
{% span #tocsrunstatus /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "Current status of a Playbook run",
  "type": "string",
  "enum": [
    "running",
    "success",
    "failure",
    "timeout",
    "canceled"
  ]
}

```
{% /jsonsnippet %}

Current status of a Playbook run

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Current status of a Playbook run|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|running|
|*anonymous*|success|
|*anonymous*|failure|
|*anonymous*|timeout|
|*anonymous*|canceled|

## CreatedAt {% #tocS_CreatedAt %}

{% span #schemacreatedat /%}
{% span #schema_CreatedAt /%}
{% span #tocScreatedat /%}
{% span #tocscreatedat /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "A timestamp when the entry was created",
  "type": "string",
  "format": "date-time"
}

```
{% /jsonsnippet %}

A timestamp when the entry was created

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(date-time)|false|none|A timestamp when the entry was created|

## UpdatedAt {% #tocS_UpdatedAt %}

{% span #schemaupdatedat /%}
{% span #schema_UpdatedAt /%}
{% span #tocSupdatedat /%}
{% span #tocsupdatedat /%}

{% jsonsnippet title="Sample" %}
```json
{
  "description": "A timestamp when the entry was last updated",
  "type": "string",
  "format": "date-time"
}

```
{% /jsonsnippet %}

A timestamp when the entry was last updated

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(date-time)|false|none|A timestamp when the entry was last updated|

## Runs {% #tocS_Runs %}

{% span #schemaruns /%}
{% span #schema_Runs /%}
{% span #tocSruns /%}
{% span #tocsruns /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "description": "Unique identifier of a Playbook run",
            "type": "string",
            "format": "uuid"
          },
          "account": {
            "description": "Identifier of the tenant",
            "type": "string",
            "minLength": 1,
            "maxLength": 10,
            "deprecated": true
          },
          "org_id": {
            "description": "Identifier of the tenant",
            "type": "string",
            "minLength": 1,
            "maxLength": 10,
            "example": "5318290"
          },
          "recipient": {
            "description": "Identifier of the host to which a given Playbook is addressed",
            "type": "string",
            "format": "uuid"
          },
          "correlation_id": {
            "description": "Unique identifier used to match work request with responses",
            "type": "string"
          },
          "name": {
            "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
            "type": "string",
            "example": "Fix Critical CVEs",
            "minLength": 1
          },
          "web_console_url": {
            "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
            "type": "string",
            "format": "url",
            "minLength": 1
          },
          "service": {
            "description": "Service that triggered the given Playbook run",
            "type": "string",
            "minLength": 1
          },
          "url": {
            "description": "URL hosting the Playbook",
            "type": "string",
            "format": "url"
          },
          "labels": {
            "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
            "type": "object",
            "additionalProperties": {
              "type": "string"
            }
          },
          "timeout": {
            "description": "Amount of seconds after which the run is considered failed due to timeout",
            "type": "integer",
            "default": 3600,
            "minimum": 0,
            "maximum": 604800
          },
          "status": {
            "description": "Current status of a Playbook run",
            "type": "string",
            "enum": [
              "running",
              "success",
              "failure",
              "timeout",
              "canceled"
            ]
          },
          "created_at": {
            "description": "A timestamp when the entry was created",
            "type": "string",
            "format": "date-time"
          },
          "updated_at": {
            "description": "A timestamp when the entry was last updated",
            "type": "string",
            "format": "date-time"
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "additionalProperties": false,
      "description": "Information about returned entities",
      "properties": {
        "count": {
          "type": "integer",
          "description": "number of results returned",
          "example": 50
        },
        "total": {
          "type": "integer",
          "description": "total number of results matching the query",
          "example": 114
        }
      },
      "required": [
        "count",
        "total"
      ]
    },
    "links": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "first",
        "last"
      ],
      "properties": {
        "first": {
          "type": "string",
          "description": "relative link to the first page of the query results"
        },
        "last": {
          "type": "string",
          "description": "relative link to the last page of the query results"
        },
        "next": {
          "type": "string",
          "description": "relative link to the next page of the query results"
        },
        "previous": {
          "type": "string",
          "description": "relative link to the previous page of the query results"
        }
      }
    }
  },
  "required": [
    "data",
    "meta",
    "links"
  ]
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Run](#schemarun)]|true|none|none|
|meta|[Meta](#schemameta)|true|none|Information about returned entities|
|links|[Links](#schemalinks)|true|none|none|

## Run {% #tocS_Run %}

{% span #schemarun /%}
{% span #schema_Run /%}
{% span #tocSrun /%}
{% span #tocsrun /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "properties": {
    "id": {
      "description": "Unique identifier of a Playbook run",
      "type": "string",
      "format": "uuid"
    },
    "account": {
      "description": "Identifier of the tenant",
      "type": "string",
      "minLength": 1,
      "maxLength": 10,
      "deprecated": true
    },
    "org_id": {
      "description": "Identifier of the tenant",
      "type": "string",
      "minLength": 1,
      "maxLength": 10,
      "example": "5318290"
    },
    "recipient": {
      "description": "Identifier of the host to which a given Playbook is addressed",
      "type": "string",
      "format": "uuid"
    },
    "correlation_id": {
      "description": "Unique identifier used to match work request with responses",
      "type": "string"
    },
    "name": {
      "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
      "type": "string",
      "example": "Fix Critical CVEs",
      "minLength": 1
    },
    "web_console_url": {
      "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
      "type": "string",
      "format": "url",
      "minLength": 1
    },
    "service": {
      "description": "Service that triggered the given Playbook run",
      "type": "string",
      "minLength": 1
    },
    "url": {
      "description": "URL hosting the Playbook",
      "type": "string",
      "format": "url"
    },
    "labels": {
      "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
      "type": "object",
      "additionalProperties": {
        "type": "string"
      }
    },
    "timeout": {
      "description": "Amount of seconds after which the run is considered failed due to timeout",
      "type": "integer",
      "default": 3600,
      "minimum": 0,
      "maximum": 604800
    },
    "status": {
      "description": "Current status of a Playbook run",
      "type": "string",
      "enum": [
        "running",
        "success",
        "failure",
        "timeout",
        "canceled"
      ]
    },
    "created_at": {
      "description": "A timestamp when the entry was created",
      "type": "string",
      "format": "date-time"
    },
    "updated_at": {
      "description": "A timestamp when the entry was last updated",
      "type": "string",
      "format": "date-time"
    }
  }
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|[RunId](#schemarunid)|false|none|Unique identifier of a Playbook run|
|account|[Account](#schemaaccount)|false|none|Identifier of the tenant|
|org_id|[OrgId](#schemaorgid)|false|none|Identifier of the tenant|
|recipient|[RunRecipient](#schemarunrecipient)|false|none|Identifier of the host to which a given Playbook is addressed|
|correlation_id|[RunCorrelationId](#schemaruncorrelationid)|false|none|Unique identifier used to match work request with responses|
|name|[PlaybookName](#schemaplaybookname)|false|none|Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).|
|web_console_url|[WebConsoleUrl](#schemawebconsoleurl)|false|none|URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.|
|service|[Service](#schemaservice)|false|none|Service that triggered the given Playbook run|
|url|[Url](#schemaurl)|false|none|URL hosting the Playbook|
|labels|[Labels](#schemalabels)|false|none|Additional metadata about the Playbook run. Can be used for filtering purposes.|
|timeout|[RunTimeout](#schemaruntimeout)|false|none|Amount of seconds after which the run is considered failed due to timeout|
|status|[RunStatus](#schemarunstatus)|false|none|Current status of a Playbook run|
|created_at|[CreatedAt](#schemacreatedat)|false|none|A timestamp when the entry was created|
|updated_at|[UpdatedAt](#schemaupdatedat)|false|none|A timestamp when the entry was last updated|

## RunHosts {% #tocS_RunHosts %}

{% span #schemarunhosts /%}
{% span #schema_RunHosts /%}
{% span #tocSrunhosts /%}
{% span #tocsrunhosts /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "host": {
            "description": "Name used to identify a host within Ansible inventory",
            "type": "string"
          },
          "stdout": {
            "description": "Output produced by running Ansible Playbook on the given host",
            "type": "string"
          },
          "status": {
            "description": "Current status of a Playbook run",
            "type": "string",
            "enum": [
              "running",
              "success",
              "failure",
              "timeout",
              "canceled"
            ]
          },
          "run": {
            "type": "object",
            "properties": {
              "id": {
                "description": "Unique identifier of a Playbook run",
                "type": "string",
                "format": "uuid"
              },
              "account": {
                "description": "Identifier of the tenant",
                "type": "string",
                "minLength": 1,
                "maxLength": 10,
                "deprecated": true
              },
              "org_id": {
                "description": "Identifier of the tenant",
                "type": "string",
                "minLength": 1,
                "maxLength": 10,
                "example": "5318290"
              },
              "recipient": {
                "description": "Identifier of the host to which a given Playbook is addressed",
                "type": "string",
                "format": "uuid"
              },
              "correlation_id": {
                "description": "Unique identifier used to match work request with responses",
                "type": "string"
              },
              "name": {
                "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
                "type": "string",
                "example": "Fix Critical CVEs",
                "minLength": 1
              },
              "web_console_url": {
                "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
                "type": "string",
                "format": "url",
                "minLength": 1
              },
              "service": {
                "description": "Service that triggered the given Playbook run",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "description": "URL hosting the Playbook",
                "type": "string",
                "format": "url"
              },
              "labels": {
                "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
                "type": "object",
                "additionalProperties": {
                  "type": "string"
                }
              },
              "timeout": {
                "description": "Amount of seconds after which the run is considered failed due to timeout",
                "type": "integer",
                "default": 3600,
                "minimum": 0,
                "maximum": 604800
              },
              "status": {
                "description": "Current status of a Playbook run",
                "type": "string",
                "enum": [
                  "running",
                  "success",
                  "failure",
                  "timeout",
                  "canceled"
                ]
              },
              "created_at": {
                "description": "A timestamp when the entry was created",
                "type": "string",
                "format": "date-time"
              },
              "updated_at": {
                "description": "A timestamp when the entry was last updated",
                "type": "string",
                "format": "date-time"
              }
            }
          },
          "inventory_id": {
            "type": "string",
            "format": "uuid"
          },
          "links": {
            "type": "object",
            "properties": {
              "inventory_host": {
                "type": "string",
                "nullable": true
              }
            }
          }
        }
      }
    },
    "meta": {
      "type": "object",
      "additionalProperties": false,
      "description": "Information about returned entities",
      "properties": {
        "count": {
          "type": "integer",
          "description": "number of results returned",
          "example": 50
        },
        "total": {
          "type": "integer",
          "description": "total number of results matching the query",
          "example": 114
        }
      },
      "required": [
        "count",
        "total"
      ]
    },
    "links": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "first",
        "last"
      ],
      "properties": {
        "first": {
          "type": "string",
          "description": "relative link to the first page of the query results"
        },
        "last": {
          "type": "string",
          "description": "relative link to the last page of the query results"
        },
        "next": {
          "type": "string",
          "description": "relative link to the next page of the query results"
        },
        "previous": {
          "type": "string",
          "description": "relative link to the previous page of the query results"
        }
      }
    }
  },
  "required": [
    "data",
    "meta",
    "links"
  ]
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[RunHost](#schemarunhost)]|true|none|none|
|meta|[Meta](#schemameta)|true|none|Information about returned entities|
|links|[Links](#schemalinks)|true|none|none|

## RunHost {% #tocS_RunHost %}

{% span #schemarunhost /%}
{% span #schema_RunHost /%}
{% span #tocSrunhost /%}
{% span #tocsrunhost /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "properties": {
    "host": {
      "description": "Name used to identify a host within Ansible inventory",
      "type": "string"
    },
    "stdout": {
      "description": "Output produced by running Ansible Playbook on the given host",
      "type": "string"
    },
    "status": {
      "description": "Current status of a Playbook run",
      "type": "string",
      "enum": [
        "running",
        "success",
        "failure",
        "timeout",
        "canceled"
      ]
    },
    "run": {
      "type": "object",
      "properties": {
        "id": {
          "description": "Unique identifier of a Playbook run",
          "type": "string",
          "format": "uuid"
        },
        "account": {
          "description": "Identifier of the tenant",
          "type": "string",
          "minLength": 1,
          "maxLength": 10,
          "deprecated": true
        },
        "org_id": {
          "description": "Identifier of the tenant",
          "type": "string",
          "minLength": 1,
          "maxLength": 10,
          "example": "5318290"
        },
        "recipient": {
          "description": "Identifier of the host to which a given Playbook is addressed",
          "type": "string",
          "format": "uuid"
        },
        "correlation_id": {
          "description": "Unique identifier used to match work request with responses",
          "type": "string"
        },
        "name": {
          "description": "Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).",
          "type": "string",
          "example": "Fix Critical CVEs",
          "minLength": 1
        },
        "web_console_url": {
          "description": "URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.",
          "type": "string",
          "format": "url",
          "minLength": 1
        },
        "service": {
          "description": "Service that triggered the given Playbook run",
          "type": "string",
          "minLength": 1
        },
        "url": {
          "description": "URL hosting the Playbook",
          "type": "string",
          "format": "url"
        },
        "labels": {
          "description": "Additional metadata about the Playbook run. Can be used for filtering purposes.",
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        },
        "timeout": {
          "description": "Amount of seconds after which the run is considered failed due to timeout",
          "type": "integer",
          "default": 3600,
          "minimum": 0,
          "maximum": 604800
        },
        "status": {
          "description": "Current status of a Playbook run",
          "type": "string",
          "enum": [
            "running",
            "success",
            "failure",
            "timeout",
            "canceled"
          ]
        },
        "created_at": {
          "description": "A timestamp when the entry was created",
          "type": "string",
          "format": "date-time"
        },
        "updated_at": {
          "description": "A timestamp when the entry was last updated",
          "type": "string",
          "format": "date-time"
        }
      }
    },
    "inventory_id": {
      "type": "string",
      "format": "uuid"
    },
    "links": {
      "type": "object",
      "properties": {
        "inventory_host": {
          "type": "string",
          "nullable": true
        }
      }
    }
  }
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|false|none|Name used to identify a host within Ansible inventory|
|stdout|string|false|none|Output produced by running Ansible Playbook on the given host|
|status|[RunStatus](#schemarunstatus)|false|none|Current status of a Playbook run|
|run|[Run](#schemarun)|false|none|none|
|inventory_id|string(uuid)|false|none|none|
|links|[RunHostLinks](#schemarunhostlinks)|false|none|none|

## RunHostLinks {% #tocS_RunHostLinks %}

{% span #schemarunhostlinks /%}
{% span #schema_RunHostLinks /%}
{% span #tocSrunhostlinks /%}
{% span #tocsrunhostlinks /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "properties": {
    "inventory_host": {
      "type": "string",
      "nullable": true
    }
  }
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inventory_host|string¦null|false|none|none|

## Meta {% #tocS_Meta %}

{% span #schemameta /%}
{% span #schema_Meta /%}
{% span #tocSmeta /%}
{% span #tocsmeta /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "additionalProperties": false,
  "description": "Information about returned entities",
  "properties": {
    "count": {
      "type": "integer",
      "description": "number of results returned",
      "example": 50
    },
    "total": {
      "type": "integer",
      "description": "total number of results matching the query",
      "example": 114
    }
  },
  "required": [
    "count",
    "total"
  ]
}

```
{% /jsonsnippet %}

Information about returned entities

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|true|none|number of results returned|
|total|integer|true|none|total number of results matching the query|

## Links {% #tocS_Links %}

{% span #schemalinks /%}
{% span #schema_Links /%}
{% span #tocSlinks /%}
{% span #tocslinks /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "first",
    "last"
  ],
  "properties": {
    "first": {
      "type": "string",
      "description": "relative link to the first page of the query results"
    },
    "last": {
      "type": "string",
      "description": "relative link to the last page of the query results"
    },
    "next": {
      "type": "string",
      "description": "relative link to the next page of the query results"
    },
    "previous": {
      "type": "string",
      "description": "relative link to the previous page of the query results"
    }
  }
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|first|string|true|none|relative link to the first page of the query results|
|last|string|true|none|relative link to the last page of the query results|
|next|string|false|none|relative link to the next page of the query results|
|previous|string|false|none|relative link to the previous page of the query results|

## Error {% #tocS_Error %}

{% span #schemaerror /%}
{% span #schema_Error /%}
{% span #tocSerror /%}
{% span #tocserror /%}

{% jsonsnippet title="Sample" %}
```json
{
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

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

## RunLabelsNullable {% #tocS_RunLabelsNullable %}

{% span #schemarunlabelsnullable /%}
{% span #schema_RunLabelsNullable /%}
{% span #tocSrunlabelsnullable /%}
{% span #tocsrunlabelsnullable /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "object",
  "nullable": true,
  "additionalProperties": {
    "type": "string"
  }
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|string|false|none|none|

## StatusNullable {% #tocS_StatusNullable %}

{% span #schemastatusnullable /%}
{% span #schema_StatusNullable /%}
{% span #tocSstatusnullable /%}
{% span #tocsstatusnullable /%}

{% jsonsnippet title="Sample" %}
```json
{
  "type": "string",
  "nullable": true,
  "enum": [
    "running",
    "success",
    "failure",
    "timeout",
    "canceled"
  ]
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string¦null|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|running|
|*anonymous*|success|
|*anonymous*|failure|
|*anonymous*|timeout|
|*anonymous*|canceled|

## ServiceNullable {% #tocS_ServiceNullable %}

{% span #schemaservicenullable /%}
{% span #schema_ServiceNullable /%}
{% span #tocSservicenullable /%}
{% span #tocsservicenullable /%}

{% jsonsnippet title="Sample" %}
```json
{
  "nullable": true,
  "type": "string",
  "minLength": 1
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string¦null|false|none|none|

## InventoryIdNullable {% #tocS_InventoryIdNullable %}

{% span #schemainventoryidnullable /%}
{% span #schema_InventoryIdNullable /%}
{% span #tocSinventoryidnullable /%}
{% span #tocsinventoryidnullable /%}

{% jsonsnippet title="Sample" %}
```json
{
  "nullable": true,
  "type": "string",
  "format": "uuid"
}

```
{% /jsonsnippet %}

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)¦null|false|none|none|

