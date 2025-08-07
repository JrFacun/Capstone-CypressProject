///<reference types="cypress" />

import RegisterPage from '../../support/POM/registrationPage';
import { deleteAccountPage } from '../../support/POM/deleteAccountPage';
import { generateFakeSignupData } from '../../support/utils/userFaker';

describe('Register then Delete Account', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should register a new user and delete the account', () => {
        const user = generateFakeSignupData();

        RegisterPage.fillInitialSignup(user.Name, user.Email);
        RegisterPage.fillPersonalInfo(user);
        RegisterPage.fillAddress(user);

        cy.get(RegisterPage.createAccountButton).click();

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations');
        cy.get(RegisterPage.continueButton).click();

        // Step 5: Delete the account
        deleteAccountPage.clickDeleteAccount();

        // Step 6: Verify deletion
        cy.get('b').should('have.text', 'Account Deleted!').and('be.visible');
        deleteAccountPage.clickContinue();
    });
});
