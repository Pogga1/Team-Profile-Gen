
const fs = require('fs');
const inquirer = require('inquirer');
const HTMLGen = require('./source/teamGen');
const Intern = require("./library/Intern");
const Engineer = require("./library/Engineer");
const Manager = require("./library/Manager");

const employeeArray = [];
const addManager = () => {
     var managerQuestions = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the Managers name?'
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the manager's ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is the managers email address?'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the managers office number'
            }
        ]
        return inquirer.prompt(managerQuestions)
        .then(managerInput => {
            const { name, id, email, officeNumber } = managerInput;
            const manager = new Manager(name, id, email, officeNumber);
            employeeArray.push(manager);
            console.log(manager);
        })
};

const addEmployee = () => {
    var employeeQuestions= [{
                type: 'list',
                name: 'role',
                message: "What is this employee's role?",
                choices: ['Intern', 'Engineer']
            },
            {
                type: 'input',
                name: 'name',
                message: "Employee name?"
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is this employees ID number?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is this employees email address?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'What is this employees github username?',
                when: (input) => input.role === "Engineer"
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school does this intern attend?',
                when: (input) => input.role === "Intern"
            },
            {
                type: 'confirm',
                name: 'confirmEmployee',
                message: 'Are there any other employees you would like to add?',
                default: false
            }
        ]
        return inquirer.prompt(employeeQuestions)
        .then(employeeData => {
            let { name, id, email, role, github, school, confirmEmployee } = employeeData;
            let employee;
            if (role === "Intern") {
                employee = new Intern(name, id, email, school);
                console.log(employee);

            } else if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);
                console.log(employee);
            }
            employeeArray.push(employee);
            if (confirmEmployee) {
                return addEmployee(employeeArray);
            } else {
                return employeeArray;
            }
        })
} 
const writeFile = data => {
    fs.writeFile('./dist/team.html', data, err => {
        if (err){
            console.log(err)
        } else {
            console.log('Team data successfully created.')
        }
            
    })
}
addManager()
  .then(addEmployee)
  .then(employeeArray => {
    return HTMLGen(employeeArray);
  })
  .then(teamHTML => {
    return writeFile(teamHTML);
  })
  .catch(err => {
    console.log(err);
  });