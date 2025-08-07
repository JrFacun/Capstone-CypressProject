class FooterPage {
    elements = {
        subscriptionInput: () => cy.get("input[placeholder='Your email address']"),
        subscriptionButton: () => cy.get("button[type='submit']"), // Update if selector is more specific
        subscriptionMessage: () => cy.contains("Get the most recent updates"),
        copyrightText: () => cy.contains("Copyright"),
    }

    typeEmail(email) {
        this.elements.subscriptionInput().clear().type(email);
    }

    clickSubscribe() {
        this.elements.subscriptionButton().click();
    }

    verifySubscriptionTextVisible() {
        this.elements.subscriptionMessage().should('be.visible');
    }

    verifyEmailFieldVisible() {
        this.elements.subscriptionInput().should('be.visible');
    }

    verifyButtonVisible() {
        this.elements.subscriptionButton().should('be.visible');
    }

    verifyCopyrightText() {
        this.elements.copyrightText().should('contain.text', '© 2021 All rights reserved');
    }
}

module.exports = new FooterPage();
