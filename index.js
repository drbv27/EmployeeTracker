const sqlite3 = require('sqlite3').verbose();
const inquirer = require('inquirer');
let sql;

const db = new sqlite3.Database('./company.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.error(err.message); }
    console.log('Connected to the company database.');
});

console.log('\n\nWelcome to the Employee Tracker App:\n\n==================================');
init();

function init() {
    console.log('\n\n')
    inquirer.prompt([
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'View Department Budget', 'Update Employee','Add Department', 'Add Role', 'Add Employee', 'Delete Department', 'Delete Role', 'Delete Employee', 'Exit Employee Tracker'],
            pageSize: 12
        }
    ]).then((answers) => {
        switch(answers.init) {
            case 'Exit Employee Tracker':
                db.close();
                console.log('Goodbye');
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Department Budget':
                viewDepartmentBudget();
                break;
            case 'Delete Employee':
                deleteEmployees();
                break;
            case 'Delete Department':
                deleteDepartments();
                break;
            case 'Delete Role':
                deleteRoles();
            break;
        }
    })
}

//DEPARTMENT FUNCTIONS
// =============
// Add departments

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?',
            default: () => {},
            validate: name => {
                let valid = /^[a-zA-Z0-9 ]{1,30}$/.test(name);
                if (valid) {
                    return true;
                } else {
                    console.log(`. Your name must be between 1 and 30 characters.`)
                    return false;
                }
            }
        }
    ]).then((answers) => {
        insertDepartment(answers.name);
    });
}

function insertDepartment(newDepartment) {
    let query = `INSERT INTO department (name) VALUES(?)`;
    db.run(query, newDepartment, function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Added ${newDepartment} to departments`);
        init();
    });
}

function getDepartmentsAsync() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM department`,[], (err, data) => {
            if (err) {
                console.log(err)
                return reject(err);
            }
            return resolve(data);
        })
    });
}
// View departments
function viewDepartments() {
    db.all(`SELECT * FROM department`,[], (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data);
        init();
    })
}
// Delete departments
function deleteDepartments() {
    const array = [];
    getDepartmentsAsync()
    .then(data => {
            for (let i=0; i<data.length; i++) {
                array.push(data[i])
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Which department would you like to delete?',
                    choices: array
                }
            ]).then(answers => {
                const departmentId = array.find(depart => depart.name === answers.department).id;
                deleteDepartment(departmentId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function deleteDepartment(departmentId) {
    let query = `DELETE FROM department WHERE id = ?`;
    db.run(query, departmentId, function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Deleted department`);
        init();
    });
}
// View department budget
function viewDepartmentBudget() {
    db.all(`SELECT department.name AS 'Department', SUM(role.salary) AS 'Budget' FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.name`,[], (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data);
        init();
    })
}

//ROLES FUNCTIONS
// =============
// Add Roles
// title, salary, department

async function addRole() {
    const array = [];
    getDepartmentsAsync()
    .then(data => {
            for (let i=0; i<data.length; i++) {
                array.push(data[i])
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the new role?',
                    default: () => {},
                    validate: title => {
                        let valid = /^[a-zA-Z0-9 ]{1,30}$/.test(title);
                        if (valid) {
                            return true;
                        } else {
                            console.log(`. Your title must be between 1 and 30 characters.`)
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the new role?',
                    default: () => {},
                        validate: salary => {
                            let valid = /^\d+(\.\d{0,2})?$/.test(salary);
                            if (valid) {
                                return true;
                            } else {
                                console.log(`. Please enter in a valid number`)
                                return false;
                            }
                        }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'In which department is the new role?',
                    choices: array 
                }
            ]).then(answers => {
               const departmentId = array.find(depart => depart.name === answers.department).id;
               insertRole(answers.title, answers.salary, departmentId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function insertRole(title, salary, department_id) {
    let query = `INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)`;
    db.run(query, [title, salary, department_id], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Added ${title} to roles`);
        init();
    });
}
// View Roles
function viewRoles() {
    db.all(`SELECT * FROM role`,[], (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data);
        init();
    })
}
// Delete Roles
function deleteRoles() {
    const arrayR = [];
    getRolesAsync()
    .then(data => {
        for (let i=0; i<data.length; i++) {
            arrayR.push(
                {
                    id: data[i].id,
                    name: data[i].title
                })
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role would you like to delete?',
                    choices: arrayR
                }
            ]).then(answers => {
                const roleId = arrayR.find(role => role.name === answers.role).id;
                deleteRole(roleId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function deleteRole(roleId) {
    let query = `DELETE FROM role WHERE id = ?`;
    db.run(query, roleId, function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Deleted role`);
        init();
    });
}


//==================
//EMPLOYEE FUNCTIONS

function getRolesAsync() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM role`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

function getEmployeesAsync() {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM employee`, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
}

async function addEmployee() {
    const arrayR = [];
    getRolesAsync()
    .then(data => {
            for (let i=0; i<data.length; i++) {
                arrayR.push(
                    {
                        id: data[i].id,
                        name: data[i].title
                    })
            }
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the new employee?',
                    default: () => {},
                    validate: first_name => {
                        let valid = /^[a-zA-Z0-9 ]{1,30}$/.test(first_name);
                        if (valid) {
                            return true;
                        } else {
                            console.log(`. Your first name must be between 1 and 30 characters.`)
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the new employee?',
                    default: () => {},
                        validate: last_name => {
                            let valid = /^[a-zA-Z0-9 ]{1,30}$/.test(last_name);
                            if (valid) {
                                return true;
                            } else {
                                console.log(`. Your last name must be between 1 and 30 characters.`)
                                return false;
                            }
                        }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the new employee?',
                    choices: arrayR
                }
            ]).then(answers => {
                const roleId = arrayR.find(role => role.name === answers.role).id;
                insertEmployee(answers.first_name, answers.last_name, roleId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function insertEmployee(first_name, last_name, role_id) {
    let query = `INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)`;
    db.run(query, [first_name, last_name, role_id], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Added ${first_name} ${last_name} to employees`);
        init();
    });
}
// View Employees
function viewEmployees() {
    db.all(`SELECT * FROM employee`,[], (err, data) => {
        if (err) {
            console.log(err)
        }
        console.table(data);
        init();
    })
}
// Delete Employees
function deleteEmployees() {
    const arrayE = [];
    getEmployeesAsync()
    .then(data => {
        for (let i=0; i<data.length; i++) {
            arrayE.push(
                {
                    id: data[i].id,
                    name: data[i].last_name
                })
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to delete?',
                    choices: arrayE
                }
            ]).then(answers => {
                const employeeId = arrayE.find(employee => employee.name === answers.employee).id;
                deleteEmployee(employeeId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function deleteEmployee(employeeId) {
    let query = `DELETE FROM employee WHERE id = ?`;
    db.run(query, employeeId, function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Deleted employee`);
        init();
    });
}
// Update Employee
function updateEmployee() {
    const arrayE = [];
    getEmployeesAsync()
    .then(data => {
        for (let i=0; i<data.length; i++) {
            arrayE.push(
                {
                    id: data[i].id,
                    name: data[i].last_name
                })
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: arrayE
                }
            ]).then(answers => {
                const employeeId = arrayE.find(employee => employee.name === answers.employee).id;
                updateEmployeeRole(employeeId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function updateEmployeeRole(employeeId) {
    const arrayR = [];
    getRolesAsync()
    .then(data => {
            for (let i=0; i<data.length; i++) {
                arrayR.push(
                    {
                        id: data[i].id,
                        name: data[i].title
                    })
            }
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the new role of the employee?',
                    choices: arrayR
                }
            ]).then(answers => {
                const roleId = arrayR.find(role => role.name === answers.role).id;
                updateEmployeeRole2(employeeId, roleId);
            })
        })
    .catch(err => {
        console.log(err);
    });
}

function updateEmployeeRole2(employeeId, roleId) {
    let query = `UPDATE employee SET role_id = ? WHERE id = ?`;
    db.run(query, [roleId, employeeId], function(err) {
        if (err) {
            console.log(err.message);
        }
        console.log(`Updated employee`);
        init();
    });
}