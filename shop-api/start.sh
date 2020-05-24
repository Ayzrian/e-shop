#! /bin/bash

cd /src

npm install

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all

npm run start
