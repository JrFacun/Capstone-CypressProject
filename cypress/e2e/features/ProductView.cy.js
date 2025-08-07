///<reference types="cypress" />

describe('Product Search', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('https://automationexercise.com/products');
    });

    it("Verify View Products button in All and Filtered Products Pages", () => {
        // All Products pages
        cy.get('.product-image-wrapper > .choose > .nav > li > a').last().click();
    });
});
