///<reference types="cypress" />

import FooterPage from '../../support/POM/footerPage';

describe('Footer Tests', () => {
    beforeEach(() => {
        cy.visit('http://automationexercise.com'); 
    });

    it('should display subscription section', () => {
        FooterPage.verifySubscriptionTextVisible();
        FooterPage.verifyEmailFieldVisible();
        FooterPage.verifyButtonVisible();
    });

    it('should allow email subscription input', () => {
        const fakeEmail = `test${Date.now()}@mail.com`;
        FooterPage.typeEmail(fakeEmail);
        FooterPage.clickSubscribe();


        cy.contains('You have been successfully subscribed!').should('be.visible');
    });

    it('should display correct copyright', () => {
        FooterPage.verifyCopyrightText();
    });
});
