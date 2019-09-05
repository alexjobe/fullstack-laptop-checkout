-----------------------------------------------------------------------------------------------------------------------
---------------------------------------------------- Laptop Checkout --------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

This app is built with a MERN stack, a collection of JavaScript-based technologies — MongoDB, Express, React, and 
Node.js — used to develop web applications.

-----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- How To Install --------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Install NodeJS

	https://nodejs.org/en/download/

Run commands in the 'laptop-checkout-backend' folder (you may need to update PATH to include nodejs):

	npm install
	npm start

Running 'npm install' will install all dependencies (defined in package.json) into a folder called 'node_modules'.
Running 'npm start' will launch the app.

Note: To deploy the app on a web server, you will need to disable Electron. Open package.json (in 
laptop-checkout-backend) and change 'main' to 'app.js', and 'start' to 'node .' Alternatively, just type 'node app.js'.

-----------------------------------------------------------------------------------------------------------------------
------------------------------------------------- Environment Variables -----------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Environment variables can be used to configure the app when it is launched, or with a .env file. These include:

                 PORT: The port that the backend is served on (defaults to 8080). If this is changed, you will also 
		       need to change REACT_APP_BACKEND_PORT in the frontend to the same value.

    CONNECTION_STRING: The MongoDB connection string (defaults to 'mongodb://localhost/laptop-checkout-api')

                EMAIL: The return email used in the 'from' field when sending email notifications (defaults to null)

           EMAIL_FROM: The name used in the 'from' field when sending email notifications (defaults to null)

        EMAIL_ACCOUNT: The email account used when sending email notifications (defaults to null)

       EMAIL_PASSWORD: The password for the email account (defaults to null)

       EMAIL_PROVIDER: The email account provider (defaults to null)

       EMAIL_SCHEDULE: Defines when the server should send automated emails. Uses node-cron syntax (defaults to every 
                       Monday)

EMAIL_NUM_WEEKS_AHEAD: Defines how many weeks ahead the server should send reminder emails. For example, a value of 2 
                       means reminder emails will only be sent for laptops that are due in less than 2 weeks (defaults 
                       to 2)

-----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- The Backend -----------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Node.js is a server environment that executes server-side JavaScript, and Express is a web framework for Node.js. 
MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses 
JSON-like documents with schema, which makes it great for JavaScript-based web applications.

-----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------- The Frontend ----------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

React is a lightweight JavaScript library for building single-page applications by dividing the UI into reusable 
components. React only deals with the view layer, which provides clean abstraction in the MVC (Model-View-Controller) 
design pattern. In addition, React speeds up DOM manipulation by only updating DOM objects that change in its “virtual 
DOM.” You can find more information about the virtual DOM here:

	https://www.codecademy.com/articles/react-virtual-dom

-----------------------------------------------------------------------------------------------------------------------
---------------------------------------------------- For Development --------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Make sure to run 'npm install' in both the frontend and backend folders.

The backend and frontend folders are separated for development purposes. The live app does not require everything in 
the frontend folder: just the static build folder generated by CRA (Create React App) when the command 'npm run build' 
is executed in the frontend folder.

The build folder is served by the backend via Node.js and Express, so you do not need to run 'npm start' in the 
frontend folder on your production server. If changes are made to the frontend, just run 'npm run build' in the 
frontend folder: this will create a new build folder.

To run the app in development mode, you must run both the backend and frontend at the same time. Just run the command 
'npm start' in both the backend and frontend folders, and navigate to localhost:3000 in a browser. By default, the 
backend can be accessed at localhost:8080, and the frontend is at localhost:3000.

-----------------------------------------------------------------------------------------------------------------------
-------------------------------------------------- Frontend Structure -------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

The frontend was built with Create React App (CRA), an officially supported tool to help bootstrap React applications. 
All relevant files for the frontend (besides those created by CRA) are found in 'src'. The entry point for the React 
frontend is App.js. React components are organized by view and separated into three folders: CheckoutView, 
LaptopListView, and General. Functions for making calls to the backend are found in api.js.

-----------------------------------------------------------------------------------------------------------------------
------------------------------------------------------- The API -------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

The API is defined in laptop-checkout-backend. The entry point for the Node.js app is app.js, and routes are defined in 
the routes directory. You can access the API in the browser by typing '/api/laptops' and '/api/checkouts'. 

For example, to access a specific laptop, type 'http://localhost:8080/api/laptops/_id', where _id is the ObjectId 
(primary key) for that laptop.

-----------------------------------------------------------------------------------------------------------------------
--------------------------------------------------- Database Set-Up ---------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

You do not need to install MongoDB for this version of the app: it will connect to a test database on MongoDB Atlas. 
However, eventually you will want to set up a permanent database. The database connection is specified in 
'models/index.js' ('mongodb://localhost/laptop-checkout-api' by default. To change, set the value of CONNECTION_STRING
in environment variables)

How To Install MongoDB Locally:
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition

This app uses Mongoose to model data: schemas are defined under 'laptop-checkout-backend/models' (laptop.js and 
checkout.js)

-----------------------------------------------------------------------------------------------------------------------
------------------------------------------------------- Electron ------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Electron will launch the app in its own window, so there is no need to use a browser. Electron is a framework for 
creating native applications with web technologies like JavaScript, HTML, and CSS.

Electron Packager can be used to create Windows, Mac, and Linux executables. For more information, check out:

	https://www.christianengvall.se/electron-packager-tutorial/ 

After you create an executable with Electron Packager, you do not need to install Node.js. The only set-up required is 
installing MongoDB, either locally or on a server (make sure the connection is specified *before* creating the 
executable.)

To disable Electron, open package.json and change 'main' to 'app.js', and 'start' to 'node .' Then connect to 
localhost:8080 in a browser. Alternatively, just type 'node app.js'. This is required if you wish to host the app on a 
web server.

-----------------------------------------------------------------------------------------------------------------------
---------------------------------------------- Electron Packager Instructions -----------------------------------------
-----------------------------------------------------------------------------------------------------------------------

Running this command in the backend folder with Electron Packager will create 32-bit and 64-bit Windows applications:

	electron-packager ../laptop-checkout-backend laptop-checkout --platform=win32 --arch=all

Bear in mind that executables created with Electron Packager in this way are basically wrappers for a local Node.js
web server. This is a good option if you do not intend to deploy the app on a permanent server, since the executable 
does not require installation.

-----------------------------------------------------------------------------------------------------------------------
---------------------------------------------------- Email Notifications ----------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

This app can send email notifications. In order to do so, it uses a package called Nodemailer. You can find the 
configuration under 'laptop-checkout-backend/utils/emailScheduler'.

For more information, check out:
	https://nodemailer.com/about/

The email account information should be set with environment variables. For example:

	EMAIL = 'myEmail@gmail.com'
	EMAIL_FROM = 'IT Department'
	EMAIL_ACCOUNT = 'myAccount'
	EMAIL_PASSWORD = 'myPassword'
	EMAIL_PROVIDER = 'gmail'
