# chat
## what the app does
is an privacy real time chat room with many user
## what's in the config (variable names not the variables themselves)
use to variable names 
DB_URL = postgres://username:password@localhost:5432/databasename
JWT_KEY=secret
## how to install
```javascript
npm install
```
create your database
set the config variable on config file
```javascript
node install src/model/db_build.js
```


## how to run locally
after install it run this comand
```javascript
npm watch
```