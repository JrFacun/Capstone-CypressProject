

//Login User using Fixture 
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://www.automationexercise.com');

  // Click the Signup / Login button
  cy.contains('Signup / Login').click();

  // Fill in the login form
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);

  // Submit the form
  cy.get('button[data-qa="login-button"]').click();
  
});

//Screnshot 
const dayjs = require('dayjs');
//Create a global variable for testCaseTitle ; add "let testCaseTitle;" to initial line of 
// add the following snippet in the describe block and before the first it block 
/*   beforeEach(function () {
    testCaseTitle = this.currentTest.title;
  }); */
Cypress.Commands.add('snapshot', (testCaseTitle) =>{
    const now = dayjs().format('DD-MM-YYYYhhmmss')
    cy.screenshot("/"+testCaseTitle+"/"+testCaseTitle +' ' +now);

})
