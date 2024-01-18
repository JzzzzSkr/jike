## Available Scripts

In the project directory, you can run:

## `npm start`

# When you are in login page. Your Username and password is 

Username: 13827050382
Password: 246810

### Technical Overview

## Login page: 

When you log in with the correct username and password, the server will generate a token and store it in local storage. 
The backend fetches user information and stores it in Redux.

## Home page：

Utilizes ECharts to create charts.

<img width="1440" alt="Screenshot 2024-01-18 at 19 15 41" src="https://github.com/JzzzzSkr/jike/assets/126542020/93edd633-275f-46d0-ae8e-4bad184a7b62">


## Article manage page：

Allows users to delete or modify articles. This page uses axios for asynchronous requests.
When a user clicks on the edit button, the system navigates to the edit page using React Navigation.

<img width="1440" alt="Screenshot 2024-01-18 at 19 15 58" src="https://github.com/JzzzzSkr/jike/assets/126542020/b2ffbb15-748b-4c7b-b527-da9050532ab1">


## create article

This page utilizes Ant Design's form component. Upon finishing the form, it submits the data to the backend server to create the corresponding article. 
If the upload is successful, the form is refreshed, and we can see the article we created on the Article Management Page.

<img width="1440" alt="Screenshot 2024-01-18 at 19 16 10" src="https://github.com/JzzzzSkr/jike/assets/126542020/1bfc57b5-1077-4dda-8b47-6ce033ece0d4">

