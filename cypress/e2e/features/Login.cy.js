
///<reference types="cypress" />

describe('Login Test', { testIsolation: false }, () => {

    it('should successfully login using fixture credentials', () => {
        cy.fixture('user').then((user) => {
            cy.login(user[0].Email, user[0].Password);
        });
        cy.contains('Logged in as').should('contain', 'James Cruz');
        cy.contains('Logout').click();
    });

    it('should verify user cannot login with an incorrect password', () => {
        cy.fixture('user').then((user) => {
            cy.login(user[0].Email, user[1].Password);
            cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!');

        });
    })
    it('should verify user cannot login with an incorrect email', () => {
        cy.fixture('user').then((user) => {
            cy.login(user[1].Email, user[0].Password);
            cy.get('.login-form > form > p').should('have.text', 'Your email or password is incorrect!');

        });
    })
    it('should verify login fails when email and password fields are empty', () => {
        cy.visit('https://www.automationexercise.com');

        // Click the Signup / Login button
        cy.contains('Signup / Login').click();

        // Try submitting without filling in fields
        cy.get('button[data-qa="login-button"]').click();

        // Check if email field is marked as invalid
        cy.get('input[data-qa="login-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });

        // You can also check password field (optional)
        cy.get('input[data-qa="login-password"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });

});
