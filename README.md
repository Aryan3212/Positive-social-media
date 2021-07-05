# Positive-social-media
A social media that inspires positivity and does not force any news upon you.

You can only 'vote' on a post, which means nobody can react HaHa on your profile picture.

Nobody can comment, so you don't have to worry about rude comments.

Link to the video demonstration: https://youtu.be/m4Ahj0dOdbI

Clone the repo using

`` git clone https://github.com/Aryan3212/Positive-social-media.git ``

You must have git installed on your device to run this command on your device. This will essentially copy all the files 
from this repo and make a copy of it on your machine.

Note that you must have a MySQL database running on port 3306 to run the app. Before importing the positivitea.sql file, make a new database named
'positivitea' in MySQL and then import the file.

Run the backend of the project in the root folder with the command:

`` npm run dev ``

This will spin the backend server and REST API for the feed at https://localhost:3001.

To run the frontend, change directory the 'client' folder. 

Type in the following command:

`` npm start ``

This will spin the frontend for the feed at https://localhost:5000.

Currently, only the RESTful API has been implemented that can query the necessary info from the database.


Our progress:
1. We made an API to: 1. Show All Posts 2. Show the Votes in a Specific Post 3. Downvote a post 4. Upvote a Post 5. Create a Post 6. Create a User 
2. We used Express Js and Node Js to build the frontend where we successfully used the API to display the posts from the database.
3. We made a Login, Register and Create Post templates which due to time limitation we could not fully implement.
 
Limitations:
1. We could not implement authentication.
2. We could make the image upload module for the front-end but could not implement it with the database.
