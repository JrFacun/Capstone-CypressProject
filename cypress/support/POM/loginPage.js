class LoginPage {
    // Define locators
    emailInput = 'input[data-qa="login-email"]';
    passwordInput = 'input[data-qa="login-password"]';
    loginButton = 'button[data-qa="login-button"]';
    errorMessage = '.login-form > form > p';
    loggedInAs = 'a:contains("Logged in as")';

    // Method to perform login
    login(email, password) {
        cy.get(this.emailInput).type(email);
        cy.get(this.passwordInput).type(password);
        cy.get(this.loginButton).click();
    }

    // Method to verify successful login
    verifyLoginSuccess(name) {
        cy.contains('Logged in as').should('contain', name);
    }

    // Method to verify error message
    verifyLoginError(message = 'Your email or password is incorrect!') {
        cy.get(this.errorMessage).should('have.text', message);
    }

    // Method to submit login without filling inputs
    submitEmptyLogin() {
        cy.get(this.loginButton).click();
    }

    // Use reusable command to validate required fields
    validateRequiredFields() {
        cy.validateMultipleRequiredFields([this.emailInput, this.passwordInput]);
    }
}

export default new LoginPage();
