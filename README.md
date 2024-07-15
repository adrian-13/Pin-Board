# Pin Board Project

## Project Description

This project is a simple "Pin Board" application created with the aim of practicing working with Firebase database. The application allows users to add, view, and delete "pins" (short text notes) in real-time.

You can access the live version of the project [here](https://nastenka.netlify.app/).

## Features

- Adding new pins
- Displaying existing pins in real-time
- Deleting pins by double-clicking on them
- Utilizing Firebase Realtime Database for data storage and synchronization
- User name submission with UUID generation for unique identification
- Modal windows for user name submission and pin deletion confirmation

## Technologies

- HTML
- CSS
- JavaScript
- Firebase (Realtime Database)

## Installation and Running

1. Clone this repository:

   ```
   git clone https://github.com/your-username/pin-board-project.git
   ```

2. Open the `index.html` file in your browser.

3. Make sure you have an internet connection so the application can communicate with Firebase.

## Firebase Configuration

To use this application with your own Firebase database:

1. Create a new project on [Firebase Console](https://console.firebase.google.com/).
2. In the "Realtime Database" section, create a new database.
3. Copy your project's configuration details.
4. Replace the existing configuration details in the `index.js` file with your own:

```javascript
const appSettings = {
databaseURL: "YOUR_FIREBASE_DATABASE_URL",
};
```

## Project Benefits

This project serves as a practical exercise for working with Firebase Realtime Database. It demonstrates basic operations such as reading, writing, and deleting data in real-time, which are key concepts when working with Firebase.

## Future Development

Possible improvements to the project include:
- Adding user authentication
- Implementing the ability to edit existing pins
- Improving the user interface
- Adding the option to categorize pins
  
