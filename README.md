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

- create new strapi project using below command

  `yarn create strapi-app <your-project-name>`

- then run below command

  `cd <your-project-name>/plugins`

- then clone project using below command

  `git clone https://github.com/webaccess/crmplatform.git .`
  
- in strapi main project in file /config/hook.json add below data in the root json object
    
    ```"crm-plugin-routes-load": { "enabled": true }```

- start script should have environment variable AUTORELOAD set to false in the package.json file of the main project which uses this plugin.sample code below:

  `"scripts": { "develop": "strapi develop", "start": "AUTORELOAD=false strapi start", "build": "strapi build", "strapi": "strapi" },`
  
- also, run command
  `yarn start`
  before running command
  `yarn develop`
  in order to generate routes the crm-plugin.

## Test cases
- install mocha, co-supertest and supertest npm packages 

- In the main project package.json file add below command to the scripts section

  `"test": "mocha plugins/crm-plugin/test/**/*.test.js"`

- then run below command to run test cases

  `npm test`

