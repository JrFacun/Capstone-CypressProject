

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
