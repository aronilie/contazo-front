# Contazo

Contazo is an online contacts book that allows yout to view, create, delete and update your own contacts. Also, Contazo allows you to call, send an email or send a Whatsapp message to your contacts.

## Structure

This project has two repositories, one for the front-end part and the other for the back-end part.

View back-end repository [here](https://github.com/aronilie/contazo-back).

## Used technologies

🔸 FRONT:
React | Redux | Styled Components | Typescript | Jest | MSW | Font Awesome

🔸 BACK:
NodeJS | ExpressJS | MongoDB | Mongoose | JWT | Supabase | Jest | Supertest

🔸 TOOLS:
Trello | Postman | Figma | Git

## Metrics

🔥 Lighthouse

![lighthouse-metrics](https://user-images.githubusercontent.com/105882007/192598265-766e0b2f-baf5-499e-9b73-28b69b3ef966.png)

📈 [Back SonarCloud metrics](https://sonarcloud.io/summary/new_code?id=isdi-coders-2022_Aron-Ilie_Back-Final-Project-202207-BCN)

📈 [Front SonarCloud metrics](https://sonarcloud.io/summary/new_code?id=isdi-coders-2022_Aron-Ilie_Front-Final-Project-202207-BCN)

## Endpoints

🔹 /users/register ➡️ POST (success status 201, error status 409):

Register a user. The payload should have a phone number and a password which should be introduced the same twice.

🔹 /users/login ➡️ POST (success status 200, error status 401):

Login with an existing user to get a valid token. The payload should have an existing phone number and password.

🔹 /create ➡️ POST (success status 201, error status 400):

Create a contact. The payload should necessary have a phone number. Also can be created with a name, surname, email and image.

🔹 /update/:phoneId ➡️ POST (success status 201, error status 400):

Edit a contact. The fields that can be edited are all that the contact can have: name, surname, email, phoneNumber and image.

🔹 /contacts ➡️ GET (success status 200, error status 400):

Get all the contacts in a list with their image, name and surname for mobile and also the email and phone number for desktop.

🔹 /contacts/:phoneId  ➡️ GET (success status 200, error status 400):

Get a specific contact detailed.

🔹 /delete/:phoneId ➡️ DEL (success status 201, error status 400):

Delete a contact with it's phone number as url parameter.

Note that all endpoints excepting login and register can only be used if the user is logged in the application.
