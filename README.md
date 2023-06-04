## Running instructions
Enter the server's folder by typing this in the command line:
```
cd server
```
Then, start the app using this command:
```
npm start
```
Now you can start using it! <br>
Start with registering and logging in :)

## What's new?
In the first part of this assignment we have adjusted our client-side code from the previous assignment to fit an API that was given to us, in order for it to communicate with a server. We have used GET and POST requests instead of using the browser's LocalStorage.<br><br>
In the second part, we have written our own NodeJS server, and used MongoDB and Mongoose to manage the database for our app. We have handled the GET and POST requests from the client and made the server fit the mentioned API, thus making the chat app fully functional and saving data on its own server.<br><br>
In the third and last part, we have used WebSockets to support real-time communication between users. Meaning, making messages appear right when they are sent from the server to a client, without the client having to request them. As for now, new messages will pop up in an alert.
