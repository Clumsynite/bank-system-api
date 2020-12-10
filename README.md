# bank-system-api
 
# Task

You need to create simple banking system. Create a Database 'Bank' with 2 tables user & accounts. Users table will have all users(bankers & customers). Accounts table will have all the entries of cash deposited & withdrawn.
1. Customer login 
-> Go to accounts page see all his/her transaction records
-> Transaction page withdraw or deposit option => select any option => Enter the amount => Withdraw will deduct the amount & deposit will add to the balance amount. If amount entered is greater than the balance for withdrawal show message "No sufficient Fund"
2. Banker Login
-> See total balance amount against all users
-> Click on particular user & show his/her transactions

You will need to handle authentication using JWT Tokens and Knex with Mysql. This should be using the MVC Architecture.
