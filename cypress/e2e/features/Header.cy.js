///<reference types="cypress" />

describe('Header Navigation Tests', () => {

    beforeEach(() => {
         cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
    });
     const navLinks = [
        { label: 'Home', path: '/', uniqueText: 'Full-Fledged practice website for Automation Engineers' },
        { label: 'Products', path: '/products', uniqueText: 'All Products' },
        { label: 'Cart', path: '/view_cart', uniqueText: 'Shopping Cart' },
        { label: 'Contact us', path: '/contact_us', uniqueText: 'Get In Touch' },
        { label: 'Signup / Login', path: '/login', uniqueText: 'New User Signup!' }
    ];

    it('should display all header navigation links', () => {
        navLinks.forEach(link => {
            cy.get('header').contains('a', link.label).should('be.visible');
        });
    });

    it('should have the correct number of nav links', () => {
        cy.get('header a').should('have.length.at.least', navLinks.length);
    });

    it('should display the logo in the header', () => {
        cy.get('header img').should('be.visible'); // Update selector if different
    });

    navLinks.forEach(link => {
        it(`should redirect to ${link.label} and verify unique content`, () => {
            cy.get('header').contains('a', link.label).click();
            cy.url().should('include', link.path);
            cy.contains(link.uniqueText, { matchCase: false }).should('be.visible');
        });
    });

    it('should keep the header visible after navigation', () => {
        cy.get('header').should('be.visible');
        cy.get('header').contains('a', 'Products').click();
        cy.get('header').should('be.visible');
    });
});
