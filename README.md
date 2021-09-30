# MARKING APP

Created using the MERN stack (MongoDB, Express, ReactJS & NodeJS) + Material UI styling framework

## Description:

This application will contain 1 instructor and 3 student accounts that are created dynamically from a database. 
Students will be able to see 3 separate assignments and can submit answers for each. Once submitted, students will not be able to update their answers and it will be sent to the instructor for evaluation. Once evaluated by the instructor, students should be about to see a numerical score in place of where their assignment used to be.
Instructors will be able to see each student and their corresponding assignment. Initially they should see that each assignment is unsubmitted until a student submits an assignment. Once submitted by the student, the instructor will be able to mark that submission using a numerical value (from 1 to 10). Once the instructor has submitted the marks for the assessed assignment they will not be able to update that assignment score and students will be able to see how they have been marked.

## Steps to run this project 
- Clone this repo from the **‘main’** branch
- Install [Docker](https://www.docker.com/) onto your OS (if you haven’t already)
- Open up the project using VScode or your preferred text editor
- From the **Root directory** run `docker-compose up`
- Wait for all of the Docker images to be pulled/created
- The Application should now run on **localhost:3000**
- The Application will initially have **no users populated** in the database. To create them, click on the **Create Users** button from the bottom component on the login page. Doing so will create **1 Instructor account, 3 student accounts with all of the assigments**
- Password for all users is: **123456** 
- 	Usernames are (case & space sensitive):
    -  **Joe Schmoe** (instructor)
    -  **Karl Gustav**
    -  **Katie Clues**
    -  **Mike Naegi**

## Requirements Fullfilled
- ReactJS for the frontend
-	NodeJs for the backend
-	MongoDB for the Database
-	Dockerized Application
-	2 User roles: 1 Instructor and 3 Students
-	3 Assignments for each student (cannot be edited after submission)
    - 1 Multiple Choice
    - 1 Multi-Select
    - 1 Short Answer that can only take submissions like [three 1991, five 19923]
- Instructor can mark student assignments using a numerical value (cannot be edited after submission)

## Bonuses Fulfilled
- Login screen for instructor and students
- When users log in depending on their role and id they will only have access to a specific route on the application