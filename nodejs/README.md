# Install

```shell
yarn install
```

# Run
Dev:
```
yarn start:dev
```

Prod:
```
yarn start
```

# Deploy
## Local
```
npm run build
npm run build:frontend
docker build --tag defimiami-gogas .
docker images
docker run -p 8001:8001 -d defimiami-gogas
docker ps
docker stop <container_id>

docker-compose -f docker-compose.dev.yml up --build
```

## Heroku
```
export DOCKER_DEFAULT_PLATFORM=linux/amd64
heroku container:push --app defimiami-gogas web
heroku container:release --app defimiami-gogas web
heroku open --app defimiami-gogas
heroku logs --app defimiami-gogas
```

## Amazon (not finished)
```
docker push 608789631846.dkr.ecr.us-east-1.amazonaws.com/defimiami-gogas
```



# Test
See http-request-example.http for HTTP examples.

curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8001/proxy

curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8001/signin

# TODO
- Sign in
 - Sign a message in Metamask
 - ecrecover at the backend and issue JWT token
 - use the JWT token for further calls

- Credit card payment
 - Display Stripe form and accept payment
 - Receive payment confirmation at the backend and update the db (add to balance)

- Subsidize gas cost
 - Proxy receives tx
 - Extract gas cost
 - Send gas amount to the address, update db (substract from balance), confirm it was included to the block
 - Send the original tx
 - Update db (add tx)

- Profile
 - Show list of transactions
 - Credit card balance and payment history
