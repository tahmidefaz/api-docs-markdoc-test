---
title: Playbook Dispatcher v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
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

## api.runs.list

<a id="opIdapi.runs.list"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://cloud.redhat.com/api/playbook-dispatcher/v1/runs \
  -H 'Accept: application/json'

```

```http
GET https://cloud.redhat.com/api/playbook-dispatcher/v1/runs HTTP/1.1
Host: cloud.redhat.com
Accept: application/json

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

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://cloud.redhat.com/api/playbook-dispatcher/v1/runs',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://cloud.redhat.com/api/playbook-dispatcher/v1/runs', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://cloud.redhat.com/api/playbook-dispatcher/v1/runs', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://cloud.redhat.com/api/playbook-dispatcher/v1/runs");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

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

`GET /api/playbook-dispatcher/v1/runs`

*List Playbook runs*

Returns a list of Playbook runs for the given account. The list can be filtered using the `filter` parameter. The fields returned in the representation can be controller using `fields` parameter.

<h3 id="api.runs.list-parameters">Parameters</h3>

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

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "account": "string",
      "org_id": "5318290",
      "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
      "correlation_id": "string",
      "name": "Fix Critical CVEs",
      "web_console_url": "string",
      "service": "string",
      "url": "string",
      "labels": {
        "property1": "string",
        "property2": "string"
      },
      "timeout": 3600,
      "status": "running",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z"
    }
  ],
  "meta": {
    "count": 50,
    "total": 114
  },
  "links": {
    "first": "string",
    "last": "string",
    "next": "string",
    "previous": "string"
  }
}
```

<h3 id="api.runs.list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[Runs](#schemaruns)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access to the given resource is not allowed|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## api.run.hosts.list

<a id="opIdapi.run.hosts.list"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts \
  -H 'Accept: application/json'

```

```http
GET https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts HTTP/1.1
Host: cloud.redhat.com
Accept: application/json

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

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://cloud.redhat.com/api/playbook-dispatcher/v1/run_hosts");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

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

`GET /api/playbook-dispatcher/v1/run_hosts`

*List hosts involved in Playbook runs*

Returns a list of objects representing hosts involved in Playbook runs. Unless restricted using filters the resources spread across multiple Playbook runs. No merging or deduplication is performed by this resource - i.e. if a host X is involved in playbook runs A and B then two subresources with exist, one representing X running A and one for B.

<h3 id="api.run.hosts.list-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|filter|query|object|false|Allows for filtering based on various criteria|
|fields|query|object|false|Defines fields to be returned in the response.|
|limit|query|integer|false|Maximum number of results to return|
|offset|query|integer|false|Indicates the starting position of the query relative to the complete set of items that match the query|

#### Detailed descriptions

**fields**: Defines fields to be returned in the response.

> Example responses

> 200 Response

```json
{
  "data": [
    {
      "host": "string",
      "stdout": "string",
      "status": "running",
      "run": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "account": "string",
        "org_id": "5318290",
        "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
        "correlation_id": "string",
        "name": "Fix Critical CVEs",
        "web_console_url": "string",
        "service": "string",
        "url": "string",
        "labels": {
          "property1": "string",
          "property2": "string"
        },
        "timeout": 3600,
        "status": "running",
        "created_at": "2019-08-24T14:15:22Z",
        "updated_at": "2019-08-24T14:15:22Z"
      },
      "inventory_id": "33b46487-a064-4390-820a-0d9c2a9fa4e7",
      "links": {
        "inventory_host": "string"
      }
    }
  ],
  "meta": {
    "count": 50,
    "total": 114
  },
  "links": {
    "first": "string",
    "last": "string",
    "next": "string",
    "previous": "string"
  }
}
```

<h3 id="api.run.hosts.list-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[RunHosts](#schemarunhosts)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|[Error](#schemaerror)|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Access to the given resource is not allowed|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

## RunId {% #tocS_RunId %}

[]() {% #schemarunid %}
[]() {% #schema_RunId %}
[]() {% #tocSrunid %}
[]() {% #tocsrunid %}

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"

```

Unique identifier of a Playbook run

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)|false|none|Unique identifier of a Playbook run|

## RunRecipient {% #tocS_RunRecipient %}

[]() {% #schemarunrecipient %}
[]() {% #schema_RunRecipient %}
[]() {% #tocSrunrecipient %}
[]() {% #tocsrunrecipient %}

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"

```

Identifier of the host to which a given Playbook is addressed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)|false|none|Identifier of the host to which a given Playbook is addressed|

## RunTimeout {% #tocS_RunTimeout %}

[]() {% #schemaruntimeout %}
[]() {% #schema_RunTimeout %}
[]() {% #tocSruntimeout %}
[]() {% #tocsruntimeout %}

```json
3600

```

Amount of seconds after which the run is considered failed due to timeout

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|integer|false|none|Amount of seconds after which the run is considered failed due to timeout|

## RunCorrelationId {% #tocS_RunCorrelationId %}

[]() {% #schemaruncorrelationid %}
[]() {% #schema_RunCorrelationId %}
[]() {% #tocSruncorrelationid %}
[]() {% #tocsruncorrelationid %}

```json
"string"

```

Unique identifier used to match work request with responses

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Unique identifier used to match work request with responses|

## Account {% #tocS_Account %}

[]() {% #schemaaccount %}
[]() {% #schema_Account %}
[]() {% #tocSaccount %}
[]() {% #tocsaccount %}

```json
"string"

```

Identifier of the tenant

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Identifier of the tenant|

## OrgId {% #tocS_OrgId %}

[]() {% #schemaorgid %}
[]() {% #schema_OrgId %}
[]() {% #tocSorgid %}
[]() {% #tocsorgid %}

```json
"5318290"

```

Identifier of the tenant

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Identifier of the tenant|

## PlaybookName {% #tocS_PlaybookName %}

[]() {% #schemaplaybookname %}
[]() {% #schema_PlaybookName %}
[]() {% #tocSplaybookname %}
[]() {% #tocsplaybookname %}

```json
"Fix Critical CVEs"

```

Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Human readable name of the playbook run. Used to present the given playbook run in external systems (Satellite).|

## WebConsoleUrl {% #tocS_WebConsoleUrl %}

[]() {% #schemawebconsoleurl %}
[]() {% #schema_WebConsoleUrl %}
[]() {% #tocSwebconsoleurl %}
[]() {% #tocswebconsoleurl %}

```json
"string"

```

URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(url)|false|none|URL that points to the section of the web console where the user find more information about the playbook run. The field is optional but highly suggested.|

## Service {% #tocS_Service %}

[]() {% #schemaservice %}
[]() {% #schema_Service %}
[]() {% #tocSservice %}
[]() {% #tocsservice %}

```json
"string"

```

Service that triggered the given Playbook run

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|Service that triggered the given Playbook run|

## Url {% #tocS_Url %}

[]() {% #schemaurl %}
[]() {% #schema_Url %}
[]() {% #tocSurl %}
[]() {% #tocsurl %}

```json
"string"

```

URL hosting the Playbook

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(url)|false|none|URL hosting the Playbook|

## Labels {% #tocS_Labels %}

[]() {% #schemalabels %}
[]() {% #schema_Labels %}
[]() {% #tocSlabels %}
[]() {% #tocslabels %}

```json
{
  "property1": "string",
  "property2": "string"
}

```

Additional metadata about the Playbook run. Can be used for filtering purposes.

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|string|false|none|none|

## RunStatus {% #tocS_RunStatus %}

[]() {% #schemarunstatus %}
[]() {% #schema_RunStatus %}
[]() {% #tocSrunstatus %}
[]() {% #tocsrunstatus %}

```json
"running"

```

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

[]() {% #schemacreatedat %}
[]() {% #schema_CreatedAt %}
[]() {% #tocScreatedat %}
[]() {% #tocscreatedat %}

```json
"2019-08-24T14:15:22Z"

```

A timestamp when the entry was created

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(date-time)|false|none|A timestamp when the entry was created|

## UpdatedAt {% #tocS_UpdatedAt %}

[]() {% #schemaupdatedat %}
[]() {% #schema_UpdatedAt %}
[]() {% #tocSupdatedat %}
[]() {% #tocsupdatedat %}

```json
"2019-08-24T14:15:22Z"

```

A timestamp when the entry was last updated

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(date-time)|false|none|A timestamp when the entry was last updated|

## Runs {% #tocS_Runs %}

[]() {% #schemaruns %}
[]() {% #schema_Runs %}
[]() {% #tocSruns %}
[]() {% #tocsruns %}

```json
{
  "data": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "account": "string",
      "org_id": "5318290",
      "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
      "correlation_id": "string",
      "name": "Fix Critical CVEs",
      "web_console_url": "string",
      "service": "string",
      "url": "string",
      "labels": {
        "property1": "string",
        "property2": "string"
      },
      "timeout": 3600,
      "status": "running",
      "created_at": "2019-08-24T14:15:22Z",
      "updated_at": "2019-08-24T14:15:22Z"
    }
  ],
  "meta": {
    "count": 50,
    "total": 114
  },
  "links": {
    "first": "string",
    "last": "string",
    "next": "string",
    "previous": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[Run](#schemarun)]|true|none|none|
|meta|[Meta](#schemameta)|true|none|Information about returned entities|
|links|[Links](#schemalinks)|true|none|none|

## Run {% #tocS_Run %}

[]() {% #schemarun %}
[]() {% #schema_Run %}
[]() {% #tocSrun %}
[]() {% #tocsrun %}

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "account": "string",
  "org_id": "5318290",
  "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
  "correlation_id": "string",
  "name": "Fix Critical CVEs",
  "web_console_url": "string",
  "service": "string",
  "url": "string",
  "labels": {
    "property1": "string",
    "property2": "string"
  },
  "timeout": 3600,
  "status": "running",
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z"
}

```

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

[]() {% #schemarunhosts %}
[]() {% #schema_RunHosts %}
[]() {% #tocSrunhosts %}
[]() {% #tocsrunhosts %}

```json
{
  "data": [
    {
      "host": "string",
      "stdout": "string",
      "status": "running",
      "run": {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "account": "string",
        "org_id": "5318290",
        "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
        "correlation_id": "string",
        "name": "Fix Critical CVEs",
        "web_console_url": "string",
        "service": "string",
        "url": "string",
        "labels": {
          "property1": "string",
          "property2": "string"
        },
        "timeout": 3600,
        "status": "running",
        "created_at": "2019-08-24T14:15:22Z",
        "updated_at": "2019-08-24T14:15:22Z"
      },
      "inventory_id": "33b46487-a064-4390-820a-0d9c2a9fa4e7",
      "links": {
        "inventory_host": "string"
      }
    }
  ],
  "meta": {
    "count": 50,
    "total": 114
  },
  "links": {
    "first": "string",
    "last": "string",
    "next": "string",
    "previous": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|data|[[RunHost](#schemarunhost)]|true|none|none|
|meta|[Meta](#schemameta)|true|none|Information about returned entities|
|links|[Links](#schemalinks)|true|none|none|

## RunHost {% #tocS_RunHost %}

[]() {% #schemarunhost %}
[]() {% #schema_RunHost %}
[]() {% #tocSrunhost %}
[]() {% #tocsrunhost %}

```json
{
  "host": "string",
  "stdout": "string",
  "status": "running",
  "run": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "account": "string",
    "org_id": "5318290",
    "recipient": "31d78262-cbd4-4f35-8070-a83c4bfe5327",
    "correlation_id": "string",
    "name": "Fix Critical CVEs",
    "web_console_url": "string",
    "service": "string",
    "url": "string",
    "labels": {
      "property1": "string",
      "property2": "string"
    },
    "timeout": 3600,
    "status": "running",
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z"
  },
  "inventory_id": "33b46487-a064-4390-820a-0d9c2a9fa4e7",
  "links": {
    "inventory_host": "string"
  }
}

```

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

[]() {% #schemarunhostlinks %}
[]() {% #schema_RunHostLinks %}
[]() {% #tocSrunhostlinks %}
[]() {% #tocsrunhostlinks %}

```json
{
  "inventory_host": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inventory_host|string¦null|false|none|none|

## Meta {% #tocS_Meta %}

[]() {% #schemameta %}
[]() {% #schema_Meta %}
[]() {% #tocSmeta %}
[]() {% #tocsmeta %}

```json
{
  "count": 50,
  "total": 114
}

```

Information about returned entities

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|count|integer|true|none|number of results returned|
|total|integer|true|none|total number of results matching the query|

## Links {% #tocS_Links %}

[]() {% #schemalinks %}
[]() {% #schema_Links %}
[]() {% #tocSlinks %}
[]() {% #tocslinks %}

```json
{
  "first": "string",
  "last": "string",
  "next": "string",
  "previous": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|first|string|true|none|relative link to the first page of the query results|
|last|string|true|none|relative link to the last page of the query results|
|next|string|false|none|relative link to the next page of the query results|
|previous|string|false|none|relative link to the previous page of the query results|

## Error {% #tocS_Error %}

[]() {% #schemaerror %}
[]() {% #schema_Error %}
[]() {% #tocSerror %}
[]() {% #tocserror %}

```json
{
  "message": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

## RunLabelsNullable {% #tocS_RunLabelsNullable %}

[]() {% #schemarunlabelsnullable %}
[]() {% #schema_RunLabelsNullable %}
[]() {% #tocSrunlabelsnullable %}
[]() {% #tocsrunlabelsnullable %}

```json
{
  "property1": "string",
  "property2": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|**additionalProperties**|string|false|none|none|

## StatusNullable {% #tocS_StatusNullable %}

[]() {% #schemastatusnullable %}
[]() {% #schema_StatusNullable %}
[]() {% #tocSstatusnullable %}
[]() {% #tocsstatusnullable %}

```json
"running"

```

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

[]() {% #schemaservicenullable %}
[]() {% #schema_ServiceNullable %}
[]() {% #tocSservicenullable %}
[]() {% #tocsservicenullable %}

```json
"string"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string¦null|false|none|none|

## InventoryIdNullable {% #tocS_InventoryIdNullable %}

[]() {% #schemainventoryidnullable %}
[]() {% #schema_InventoryIdNullable %}
[]() {% #tocSinventoryidnullable %}
[]() {% #tocsinventoryidnullable %}

```json
"497f6eca-6276-4993-bfeb-53cbbbba6f08"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string(uuid)¦null|false|none|none|

undefined

