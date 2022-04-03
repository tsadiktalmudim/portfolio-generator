const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('.\\src\\page-template.js');

// const pageHTML = generatePage(username, gitHub)


// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'What is your name? (required)',
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log("Please enter your name!");
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username. (required)',
            validate: gitInput => {
                if (gitInput) {
                    return true
                } else {
                    console.log("Please enter your GitHub username!");
                    return false;
                };
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    // If there's no "projects" array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    ==================
    Add a New Project 
    ==================
    `);
    return inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (required)',
                validate: projectInput => {
                    if (projectInput) {
                        return true
                    } else {
                        console.log("Please enter your project name!");
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (required)',
                validate: descInput => {
                    if (descInput) {
                        return true
                    } else {
                        console.log("Please enter a description!");
                        return false;
                    };
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with?',
                choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the Github link to your project. (required)',
                validate: linkInput => {
                    if (linkInput) {
                        return true
                    } else {
                        console.log("Please enter your URL!");
                        return false;
                    };
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to add another project?',
                default: false
            }
        ])
        .then(promptProject)
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });