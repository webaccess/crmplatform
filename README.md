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

The primary aim of this project is to have a simple and extendable base for the CRMish projects.

## Installation

1. Create new strapi project using the below command

   `yarn create strapi-app <your-project-name>`

2. Install the plugin

   `cd <your-project-name>`
   
   `mkdir plugins`
   
   `cd plugins`

- Clone project using below command

  `git clone https://github.com/webaccess/crmplatform.git crm-plugin`

3. Run strapi project

   `yarn start`

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

- Install testing dependencies

  `cd <your-project-name>/plugins/crm-plugin/`

  `yarn install`

- Create and update the test configuration file
  `cp tests/integration/config/config.js.sample tests/integration/config/config.js`

- Run test cases

  `yarn test`
