/**
*  Name: Jaden Padua 
* 
*  File: app.js
* 
*  Description: our app.js file parses the handler arguments
*  which runs the code implemented in database.js
* 
*  mail to: paduajaden@gmail.com
*/

//dependancy variables
const chalk = require('chalk')
const yargs = require('yargs')
const database = require('./database.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    //comand keyword description in node
    command: 'add',
    //description of what command does when --help
    describe: 'Add a new user to the database',
    //builder is the --name --email flags that define arguments to our add command
    builder: {
        name: {
            describe: 'Name of the user',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email of the user',
            demandOption: true,
            type: 'string'
        }
    },
    //handler with argv param calls addUser in database class method
    handler(argv) {
        database.addUser(argv.name, argv.email)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a user from database',
    builder: {
        name: {
            describe: 'Name of the user',
            demondOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        database.removeUser(argv.name)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your users in the database',
    handler() {
        database.listUsers()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a users email from database',
    builder: {
        name: {
            describe: 'Name of the user',
            demandOption: true,
            type: 'string'
        }

    },
    handler(argv) {
        database.readUser(argv.name)
    }
})
//parses yargs commands for kernal interperation.
yargs.parse()