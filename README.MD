# PG Common Services API library
Construct and optionally sign api gateway request using AWS credentials

## To install:
```
npm install `git+https://github.com/pway123/pg-common-services-api.git`
```

## Prerequisite:
AWS credentials are required for calculating the signature, in ECS container the credentials are fetched remotely. If running outside of ECS containers(i.e. local), need to configure AWS CLI.
If don't want to use AWS signature, set sign = false in options


## Configuration:
```
pgCommonServicesApi.config(options)
```
*returns a Promise

### options
| Field | Type | Default | Remark |
| ------ | ------ | ------ | ------ |
| endpoint | string | null | required |
| sign | boolean | true | |
| private | boolean | false | |
| host | string | null | required if private is true |
| stage | string | null | required if not using custom domain endpoint |

## Examples:

### Regional API with custom domain but without IAM authorization
```
pgCommonServicesApi.config({
    endpoint: 'https://dev-common-sevices-api-pg.dcube.cf',
    sign: false
});
```

### Regional API with custom domain and IAM authorization
```
pgCommonServicesApi.config({
    endpoint: 'https://qe-common-sevices-api-pg.dcube.cf',
    sign: true
});
```

### Regional API original url
```
pgCommonServicesApi.config({
    endpoint: 'https://su6uqpbef3.execute-api.ap-southeast-1.amazonaws.com',
    sign: false,
    stage: "dev"
});
```

### Private API without IAM authorization
```
pgCommonServicesApi.config({
    endpoint: "https://vpce-07f6aa6800aea2c83-6meep72q.execute-api.ap-southeast-1.vpce.amazonaws.com",
    sign: false,
    private: true,
    stage: "dev2",
    host: "i4390qzy7k.execute-api.ap-southeast-1.amazonaws.com"
});
```

### Private API IAM authorization
```
pgCommonServicesApi.config({
    endpoint: "https://vpce-07f6aa6800aea2c83-6meep72q.execute-api.ap-southeast-1.vpce.amazonaws.com",
    sign: true,
    private: true,
    stage: "dev2",
    host: "i4390qzy7k.execute-api.ap-southeast-1.amazonaws.com"
});
```

## API supported:
- pgCommonServicesApi.sendPushNotification(payload)
- pgCommonServicesApi.sendEmail(payload)
- pgCommonServicesApi.testApiGwConnection()

*returns a Promise

## Examples
```
node example/example.js
```