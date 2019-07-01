# EXAMPLES

## `npm run pull-envs`

Use this command to pull env vars for running the scripts

> NOTE 1: requires aws credentials that have access to param store

> NOTE 2: requires `confd` installed on your local machine.
See this [link](https://github.com/kelseyhightower/confd/blob/master/docs/installation.md) for installing locally

## `npm run example`

Used with the following envs to test if you can reach and authenticate with push notification API gateway

> NOTE: Run `npm run pull-envs` first!

## `npm run loadtest:pn`

Simple loop to hit push notification services with load

> NOTE: Run `npm run pull-envs` first!