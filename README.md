# CMR-Project App
___
## Technology:
[![My Skills](https://skillicons.dev/icons?i=docker,react,nodejs,js,css,html,bootstrap)](https://skillicons.dev)

## Describtion
### Docker image with React application. Also in folder CHAT-API is express api only to test of working react app.
---
#### Created based on React and Express.
#### port 2999 - React app
#### port 3000 - Express API  
## This project its still on develop, so many of features may not working
## The main goal is to connect through Docker Compose React app (frontend) with Spring API (backend) and PostgreSQL (Database)
---
## How to Lunch
### In order to lunch apllication make sure that you have free free ports 2999, 3000 and have installed Docker Desktop
### NPM package used in React app
1. @fortawesome/fontawesome-svg-core: ^6.4.0
1. @fortawesome/free-solid-svg-icons: ^6.4.0
1. @fortawesome/react-fontawesome: ^0.2.0
1. @testing-library/jest-dom: ^5.16.5
1. @testing-library/react: ^13.4.0
1. @testing-library/user-event: ^13.5.0
1. axios: ^1.3.4
1. bcryptjs: ^2.4.3
1. bootstrap: ^5.2.3
1. crypto-browserify: ^3.12.0
1. js-cookie: ^3.0.1
1. react: ^18.2.0
1. react-bootstrap: ^2.7.2
1. react-dom: ^18.2.0
1. react-router-dom: ^6.9.0,
1. react-scripts: 5.0.1
1. web-vitals: ^2.1.4

### Docker Images
1. Node:13.12.0-alpine

### There is 2 ways to run application through node or docker
## Node run
```bash
  # In main folder
  # Running testing API
  cd api-chat
  npm i
  npm start
  # Another terminal
  cd front
  npm i
  npm start
```
## Docker run
```bash
# Run API like in node run
cd front 
docker-compose up react-app --build
```
## To test functionality of the site use this usernames and password
```bash
  username: mariusz password: Krukidziobia1@ # Admin Account
  username: w1234 password: User1@34 # User Account
  username: watch password: watch # Guest Account
```
