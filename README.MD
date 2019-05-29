# PG Common Services API library
Construct and optionally sign api gateway request using AWS credentials

## To install:
- npm install `git+https://github.com/pway123/pg-common-services-api.git`

## Configuration:
pgCommonServicesApi.config(options)

### options
| Field | Type | Default |
| ------ | ------ | ------ |
| endpoint | string | null |
| sign | boolean | true |

Dev example:
```
var pgCommonServicesApi = require("./pg-common-services-api");
pgCommonServicesApi.config({
    endpoint: 'https://qe-common-sevices-api-pg.dcube.cf',
    sign: false
});
```


## API supported:
- pgCommonServicesApi.sendPushNotification(payload)
- pgCommonServicesApi.sendEmail(payload)
