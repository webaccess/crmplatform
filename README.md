# CRM Platform

This is CRM platform backend based on the Strapi. It comes with basic model for contact management along with the API's.

## Primary Models include

- Contact
- Individual
- Organization
- Activity
- Country
- State
- District
- Village

## Goal

Primary aim of this project to have a simple and extendable base for the CRMish projects.

## Installation

1. Create new strapi project using the below command

   `yarn create strapi-app <your-project-name>`

2. Install this plugin
   `cd <your-project-name>`
   `mkdir plugins`
   `cd plugins`

- Clone project using below command

  `git clone https://github.com/webaccess/crmplatform.git crm-plugin`

3. Run strapi project

   `yarn develop`

## Plugin Development

You would need to add below settings to your strapi project if you are extending or contributing to this project.

- Navigate to strapi root folder and modify the file /config/hook.json to add below code

  `"crm-plugin-routes-load": { "enabled": true }`

- Modify package.json and prepend start script with AUTORELOAD=false

  `""start": "AUTORELOAD=false strapi start","`

- When you make the changes run

  `yarn start`

  this will generates new routes

  then run

  `yarn develop`

## Run Test cases

- You would need to install following node packages in your strapi instance

npm install mocha --save-dev
npm install co-supertest --save-dev
npm install supertest --save-dev

- In the main project package.json file add below command to the scripts section

  `"test": "mocha plugins/crm-plugin/tests/**/*.test.js"`

- then run below command to run test cases

  `yarn test`
