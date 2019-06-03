/**
* Name: Jaden Padua
*
* File: database.js
*
* Description: database.js app that has the implementation and functionality
* That was applied
*
* mail to: paduajaden@gmail.com
*/
//requires a file reader and chalk arg color 
const fs = require('fs')
const chalk = require('chalk')

//calls addUser with name and email command
const addUser = (name, email) => {
    //creates database object that loads database
    const database = loadDatabase()
    //duplicate email object that filters the same emails
    const duplicateEmail = database.find((data) => data.email === email)

    //if emails are not duplicate then push to database
    if (!duplicateEmail) {
        database.push({
            name: name,
            email: email
        })  
        //calls saveDatabase which writes to the file
        saveDatabase(database)
        console.log(chalk.green('RESPONSE CODE 201: ') + chalk.green('User added to database'))

    }

    else {
        console.log(chalk.red('RESPONSE CODE 400: ') + chalk.red('Email already exists in database'))
    }
}
//method for removing user
const removeUser = (name) =>  {
    //keeps user variable by making it not equal to the name passed in
    const database = loadDatabase()
    const usersToKeep = database.filter(data => data.name != name)

    //now check if user was removed
    if(database.length > usersToKeep.length) {
      console.log(chalk.blue('RESPONSE CODE 202: ') + chalk.blue('User successfully removed from database'))
    }
    else {
        console.log(chalk.red('RESPONSE CODE 404: ') + chalk.red('User not found in database '))
    }

    //calls saveDatabase with usersToKeep param
    saveDatabase(usersToKeep)
}

//lists users in the database
const listUsers = () => {
    const database = loadDatabase()
    console.log(chalk.yellow.underline('Current users in local database...'))

    //for loop iterating through data listing data.name of users
    database.forEach((data) => {
        console.log(chalk.cyan(data.name))
    })


}

//reads an exact user for the details
const readUser = (name) => {
    // set data equal to the name passed in
    const database = loadDatabase()
    const data = database.find((data) => data.name === name)

    //lists user email
    if (data) {
        console.log(chalk.yellow('User: ') + chalk.magenta(data.name))
        console.log(chalk.yellow('Email: ') + chalk.cyan(data.email))

    //error code
    } else {
        console.log ((chalk.red('RESPONSE CODE 404: ') + chalk.red('User does not exist in the database!')))

    }
}

//method writes our new database to JSON file
const saveDatabase = (database) => {

    const dataJSON = JSON.stringify(database,null,' ') 
    fs.writeFileSync('database.json',dataJSON + "\n")
  
}

//loads our database by reading and toStringing JSON fie 
const loadDatabase = () => {
try {
    
    const dataBuffer = fs.readFileSync('database.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
} catch (e) {
    return [] 
}


}

//exports our functions so app.js can utilize
module.exports  = {
    addUser: addUser,
    removeUser: removeUser,
    listUsers: listUsers,
    readUser: readUser
}
