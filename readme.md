# Employee-Tracker

## Table of Contents
[Description](https://github.com/drbv27/EmployeeTracker/#description)  
[Installation](https://github.com/drbv27/EmployeeTracker/#installation)  
[Usage](https://github.com/drbv27/EmployeeTracker/#usage)  
[Demonstration](https://github.com/drbv27/EmployeeTracker/#demonstration)  
[Questions](https://github.com/drbv27/EmployeeTracker/#questions)

### Description
This is a CLI app that allows users to perform create, read, update, and delete (CRUD) operations on a SQL database representing the departments, roles, and employees of a company. It is designed to be user-friendly and requires no knowledge of SQL commands to operate.
Features:
View data for departments, roles, and employees
Sort employees by last name, manager, or department
Calculate the budget for a department
Add departments, roles, and employees
Delete departments, roles, and employees

### Installation
This app uses inquirer.js, sqlite3.  Run `npm install` in the root directory to download these dependencies. Since it interacts with a SQL database, a SQL interface is also required, but no need a db server because sqlite3 dont need it.

### Usage
First, run the starter.sql file to create the database and three tables that contain the info for departments, roles, and employees.  A seed.sql file is included as an example. Feel free to change the seed info.
![Schema](/screen-shots/1-schema.png?raw=true "Sample Note")


To start the app, run the command `npm index.js` in the terminal.  The user is greeted and offered a list of choices to execute various CRUD functions.  
![Options](/screen-shots/2-options.png?raw=true "Sample Note")

The first three options allow users to view data from the three databases.  
![Employee Sorting](/screen-shots/3-roles.png?raw=true "Sample Note")

The `View Department Budget` allows the user to select one of the departments, and totals up the salaries of all the employees in that department.  
![View Department Budget](/screen-shots/4-dbudget.png?raw=true "Sample Note")

The next three options are INSERT INTO commands, allowing the user to add departments, roles, and employees.  Inquirer will validate responses to make sure that they can be inserted into their respective table columns.  For example, the 'name' column of the departments table only accepts VARCHAR(30), while the 'salary' column of the roles table only accepts DEC(11, 2) values.  
![Validation](/screen-shots/5-validation.png?raw=true "Sample Note")

Before inquirer asks the questions, a GET function runs behind the scenes to retrieve the names and IDs of the relevant information needed so that the user doesn't have to know IDs or the exact spellings of roles/departments when adding information. An array of names is passed to the inquirer prompt itself, so they appear as choices in a "list" type question.  
![Roles List](/screen-shots/6-rolesList.png?raw=true "Sample Note")

The next three options are DELETE functions. Again, the relevant information is queried from SQL and passed to the inquirer prompt. The user is also given the chance to cancel a deletion.  
![Roles List](/screen-shots/7-delete.png?raw=true "Sample Note")

Finally, the last option closes the application and terminates the database connection.

### Demonstration
https://drive.google.com

### Questions
For questions contact me at:  
Email: drbv27@gmail.com  
https://github.com/drbv27

Thank you!  
-DiegoB