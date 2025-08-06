///<reference types="cypress" />
import { generateFakeSignupData } from '../../support/utils/userFaker';
import RegisterPage from '../../support/POM/registrationPage';

describe('Register Test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should verify user can successfully register', () => {
        const user = generateFakeSignupData();

        RegisterPage.fillInitialSignup(user.Name, user.Email);
        RegisterPage.fillPersonalInfo(user);
        RegisterPage.fillAddress(user);

        cy.get(RegisterPage.createAccountButton).click();

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations');
        cy.get(RegisterPage.continueButton).click();

        cy.contains('Logged in as').should('contain', user.Name);
        cy.contains('Logout').click();
    });

    it('should verify user cannot register with existing email', () => {
        cy.fixture('user').then((user) => {
            RegisterPage.fillInitialSignup(user[0].Name, user[0].Email);
        });

        cy.get(RegisterPage.emailExistsError)
            .should('have.text', 'Email Address already exist!')
            .and('be.visible');
    });

    it('should fail registration with invalid email format (missing @)', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'jamesgmail.com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid symbol after @', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@#gmail.com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid dot in domain', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@domain..com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("position");
        });
    });

    it('should fail registration when name and email are empty', () => {
        cy.get(RegisterPage.signupButton).click();

        cy.validateRequiredField(RegisterPage.nameInput);
        cy.validateRequiredField(RegisterPage.emailInput);
    });

    it.only('should show required field validation on extended registration', () => {
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);

        const requiredFields = [
            RegisterPage.passwordInput,
            RegisterPage.firstNameInput,
            RegisterPage.lastNameInput,
            RegisterPage.stateInput,
            RegisterPage.cityInput,
            RegisterPage.zipcodeInput,
            RegisterPage.mobileNumberInput
        ];

        cy.validateMultipleRequiredFields(requiredFields);
    });

    it('should verify important form labels and headers are displayed correctly', () => {
        // Step 1: Header on first screen
        cy.verifyTextExists('New User Signup!');

        // Step 2: Proceed to next step
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);

        // Step 3: Verify section header
        cy.verifyTextExists('Enter Account Information');

        // Step 4: Verify important labels (without needing selector)
        cy.verifyLabelExists('Password *');
        cy.verifyLabelExists('First name *');
        cy.verifyLabelExists('Last name *');
        cy.verifyLabelExists('Address * (Street address, P.O. Box, Company name, etc.)');
        cy.verifyLabelExists('Mobile Number *');
    });

});
