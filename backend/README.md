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

# Dockerを使ったローカル動作確認手順
## (一回で良い)ci用トークンの取得
- `docker build -t runner . && docker run　runner /bin/sh` でコンテナを作ってその中に入る
- コンテナ内で`firebase login:ci --no-localhost` でログインするとtokenが取得できるのでメモる。

## ローカルにCloud Functionsを立てて動作確認(localhost:5000)
- 先ほど作成したci用トークンを取得して`docker build -t runner . && docker run --env TOKEN=<token> runner /bin/sh`
- `cd functions`
- `npm run serve`で動作します。

## デプロイ
- 先ほど作成したci用トークンを取得して`docker build -t runner . && docker run --env TOKEN=<token> runner /bin/sh`
- `firebase deploy --token $TOKEN`で動作します。