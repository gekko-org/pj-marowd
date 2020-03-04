Pj-marowd Cloud Functions
===

# Usage
1. `firebase login` (一度で良い)
1. `cd backend/functions`
1. `yarn` or `yarn install` (一度で良い)
1. `yarn run deploy`

# Linting
1. ` cd backend/functions `
1. ` yarn run lint `


# Use with docker
ci用のtokenを使ってデプロイします。
1. `$ firebase login:ci --no-localhost` でtokenを取得
あとはこれ
`docker build -t runner . && docker run --env TOKEN=<token> runner /bin/sh`
`/app`内で`$ firebase deploy --token $TOKEN`

