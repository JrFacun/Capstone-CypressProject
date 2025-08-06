import LoginPage from '../../support/POM/loginPage';

describe('Login Tests with POM', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should login successfully', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user[0].Email, user[0].Password);
            LoginPage.verifyLoginSuccess('James Cruz');
        });
    });

    it('should show error for incorrect password', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user[0].Email, user[1].Password);
            LoginPage.verifyLoginError();
        });
    });

    it('should show error for incorrect email', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user[1].Email, user[0].Password);
            LoginPage.verifyLoginError();
        });
    });

    it('should validate empty email and password fields', () => {
        LoginPage.submitEmptyLogin();
        LoginPage.validateRequiredFields();
    });

    //UI Testing
    it('should display all login form UI elements correctly', () => {
        cy.get(LoginPage.emailInput).should('be.visible').and('have.attr', 'placeholder', 'Email Address');
        cy.get(LoginPage.passwordInput).should('be.visible').and('have.attr', 'placeholder', 'Password');
        cy.get(LoginPage.loginButton).should('be.visible').and('contain.text', 'Login');
        cy.get('.login-form').should('be.visible');
        cy.get('.login-form h2').should('have.text', 'Login to your account');
    });
});
