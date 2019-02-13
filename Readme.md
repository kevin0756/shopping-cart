This app uses nodemon for autobuilding the node server and create-react-app for swiftly generating the react application skeleton. Ensure you have these dependencies globally installed. To do so type in "npm install -g nodemon" and "npm install -g create-react-app" in your terminal/command prompt without the quotes.

Install Dependencies:
Once the project has been successfully forked, install dependencies by browsing into the project directory and typing in npm install. Once that is done, enter the 'client' folder and again execute npm install for installing the react dependencies. This might take a while.

Database:
This application makes use of MongoDB 4.0 as the database. Please ensure you have this version of MongoDB installed before proceeding. It is also recommended to download and install MongoDB compass, so that you receive a comprehensive and user-friendly UI for carrying out database tasks. MongoDB can be downloaded from https://www.mongodb.com/download-center. Start the mongodb server by going into your installation directory (usually C:\Program Files\MongoDB\Server\4.0\bin) and run mongod.exe. Once that is done, open either MongoDB compass(preferable) or MongoDB shell(mongo.exe in same installation directory) and create a database named ShoppingCartDB(no need to enter connection passwords and other params) Give this database a collection named shoppingcarts.

Run the server:
 To run the server, enter the project root directory (../shopping-cart) and execute npm run dev in your terminal window. This will start the node and react server. The application should automatically launch in your default browser window once both servers are started. Make sure you have nothing running on ports 3000 and 5000, since the application makes use of these ports to run the client and server respectively.
