# bank-system-api

## Task

You need to create simple banking system. Create a Database 'Bank' with 2 tables user & accounts. Users table will have all users(bankers & customers). Accounts table will have all the entries of cash deposited & withdrawn.

1. Customer login
   -> Go to accounts page see all his/her transaction records
   -> Transaction page withdraw or deposit option => select any option => Enter the amount => Withdraw will deduct the amount & deposit will add to the balance amount. If amount entered is greater than the balance for withdrawal show message "No sufficient Fund"
2. Banker Login
   -> See total balance amount against all users
   -> Click on particular user & show his/her transactions

You will need to handle authentication using JWT Tokens and Knex with Mysql. This should be using the MVC Architecture.

## Links

### API

- Repo: [http://github.com/clumsynite/bank-system-api](http://github.com/clumsynite/bank-system-api)
- Live: [https://bank-system-api.herokuapp.com](https://bank-system-api.herokuapp.com)

### Frontend

- Repo: [http://github.com/clumsynite/bank-system-app](http://github.com/clumsynite/bank-system-app)
- Live: [https://bank-system-app.netlify.app](https://bank-system-app.netlify.app)

## Project setup

### Install dependencies

```javascript
npm install
```

### Start Node app

```javascript
npm run start
```

### Start app in development (refreshes on save)

```javascript
npm run dev
```
