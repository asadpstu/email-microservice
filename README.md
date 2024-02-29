Run necessary container:
inside root directory
$ mv .env.example .env
$ docker compose up

This command will create independent Kafka environment with kafka UI and Pgresql Database container. These resources have been used in our backend microservices.

node version > 19 (Recommended)

Run Api Gateway: 
$ cd api-gateway
$ npm install
$ npm start


Start `service-email-payload` microservice: 
$ cd service-email-payload
$ mv .env.example .env
$ npm install
$ npm start


Start `service-email-socket` microservice: 
$ cd service-email-socket
$ mv .env.example .env
$ npm install
$ npx prisma init
$ npx prisma migrate dev --name initial db setup

For running Test
$ npm run test

For running the app
$ npm start


Run Frontend:
$ cd pickles-frontend
$ npm install
$ npm run dev
