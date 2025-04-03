# z-prefix

Things to do:

- forgot password
- css for individual item
- read me





Install and Run
- Insure that you have a postgres connection string and a database named "Inventory" in your postgres

- Open terminal select directory you would like to download into
- run "git clone ~github url here~"
- run "Code ."
- open vscode editor terminal and run "npm install"

-------Server side ----------
- in vscode editor terminal run "cd api" then run "npm install"
- open the knexfile.js and replace the connection string with your own postgres connection string
- in the terminal run "npm start" this will migrate and seed the database with the inital info and start the server at localhost port 8081

--------Front End----------
- Open a second terminal in vscode the run "cd ui"
- run "npm install"
- run "npm run dev" this will start the local host website at port 5173