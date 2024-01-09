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

## Article manage page：

Allows users to delete or modify articles. This page uses axios for asynchronous requests.
When a user clicks on the edit button, the system navigates to the edit page using React Navigation.

## create article

This page utilizes Ant Design's form component. Upon finishing the form, it submits the data to the backend server to create the corresponding article. 
If the upload is successful, the form is refreshed, and we can see the article we created on the Article Management Page.
