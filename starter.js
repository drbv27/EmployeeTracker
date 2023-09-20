//if you want to run from zero, you need to run this file, previously you need to install the dependencies
// npm install
// Initialize the database
//first you need create a new db file with the nasme company.db
const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('./company.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the company database.');
    });
//CREATE THE TABLES SCHEMA
/* CREATE TABLE IF NOT EXISTS department (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS role (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
  );
  CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
  );
   */
db.run('CREATE TABLE IF NOT EXISTS department (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(30) NOT NULL)');
db.run('CREATE TABLE IF NOT EXISTS role (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(30) NOT NULL,salary DECIMAL(10,2) NOT NULL,department_id INTEGER NOT NULL REFERENCES department(id))');
db.run('CREATE TABLE IF NOT EXISTS employee (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(30) NOT NULL,last_name VARCHAR(30) NOT NULL,role_id INTEGER NOT NULL REFERENCES role(id),manager_id INTEGER REFERENCES employee(id))');

//INSERT THE SEED DATA
//departments: Sales, Engineering, Finance, Legal
db.run('INSERT INTO department (name) VALUES (?)', ['Sales']);
db.run('INSERT INTO department (name) VALUES (?)', ['Engineering']);
db.run('INSERT INTO department (name) VALUES (?)', ['Finance']);
db.run('INSERT INTO department (name) VALUES (?)', ['Legal']);
//roles: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Accountant, Legal Team Lead, Lawyer
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Sales Lead', 100000.00, 1]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Salesperson', 80000.00, 1]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Lead Engineer', 150000.00, 2]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Software Engineer', 120000.00, 2]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Accountant', 125000.00, 3]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Legal Team Lead', 250000.00, 4]);
db.run('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', ['Lawyer', 190000.00, 4]);
//employees: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Malia Brown, Sarah Lourd, Tom Allen, Tina Lee, Mark Johnson, Joyce Wong, Lisa Wong, Gary Wong
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['John', 'Doe', 1, null]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Mike', 'Chan', 2, 1]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Ashley', 'Rodriguez', 3, 1]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Kevin', 'Tupik', 4, 1]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Malia', 'Brown', 5, 2]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Sarah', 'Lourd', 6, 3]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Tom', 'Allen', 7, 4]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Tina', 'Lee', 8, 5]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Mark', 'Johnson', 9, 6]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Joyce', 'Wong', 10, 7]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Lisa', 'Wong', 11, 8]);
db.run('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', ['Gary', 'Wong', 12, 9]);

//close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
    }
);

