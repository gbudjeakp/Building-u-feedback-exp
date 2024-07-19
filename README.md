# Building-u-feedback
 A feeback application that allows the interns at building-u, receive feedbacks on their projects (Project is currently being worked on for the Non-Profit Organization called Building-U.


# App is now live

# Preview of Available Pages
![Feedback-u](https://github.com/gbudjeakp/Building-u-feedback/assets/61554248/1608df27-c49e-4791-9942-6ea4f24b429b)


# Application features
1. Authentication and Authorization using JWT.
2. Allows for the interns to create their feedback request
3. Code Leads are able to assign feedback request to themselves.
4. Code Leads are able to give Feedback on each feed back request
5. Integration with Floc App webhooks to send out notification upon creation of
   feedback requests and creation of feedbacks. (Incoming feature)

# Tech Stack
### Front-End Stack
1. The Front-End is being built in react.js
2. UI frame work being used is mantine


## How to Start App

### Front-End
1. clone repo to computer
2. open folder in IDE/Text Editor
3. type `cd views` in terminal to enter into the Views directory
4. type `npm install` and wait for it to finish. then go to step 5.
5. type `npm run dev` to start app

### Setting Up Database
1. clone repo to computer using 
2. open folder in IDE/Text Editor
3. Please set up a SQL database before running step 4 (You can download and use [XAMMP](https://www.apachefriends.org/fr/index.html). 
   as its super easy to setup and use. This is not mandatory as you can use any other tool that can spin up a local database server
   in your development environment.
4. Once you have started XAMPP, open the software, you'll see the below. Click on the "Start" button on both the
   `Apache` and `MySQL` module then click on the Admin button on the `MySQL` module. This should open a browser as seen in step 5. 
   ![XAMMP](https://github.com/buildingu/Building-u-feedback/assets/61554248/635e746d-959d-4d13-abd6-a6768f621279)

5.   See the image below. You'll need to first click on the "New" button (Its the one with the red outline) to create a local database.
next you'll enter `buildufeedback` in the `Database name` field as seen in the area highlighted green in the screenshot below.
next click `Create` and you can start your backend.
![MySQL Admin Page](https://github.com/buildingu/Building-u-feedback/assets/61554248/b523cfb7-9abc-4019-98cd-93dbf7f820cc)

### Back-End
1. Make sure you are in the root directory of the app.
2. type `npm install` and wait for it to finish. then go to step 3.
3. Start the server by running `npm start`
