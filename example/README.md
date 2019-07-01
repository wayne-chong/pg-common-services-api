# EXAMPLES

## `npm run pull-envs`

Use this command to pull env vars from the `pg-envs` repo!

The `pg-envs` repo has been set up to store envs that are too sensitive for this public git repo

NOTE: Assumes you have cloned the pg-envs repo in a sibling directory from `pg-common-services-api`

## `npm run example`

Used with the following envs to test if you can reach and authenticate with push notification API gateway

NOTE: Run `npm run pull-envs` first!

## `npm run loadtest:pn`

Simple loop to hit push notification services with load

NOTE: Run `npm run pull-envs` first!