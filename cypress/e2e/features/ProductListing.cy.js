///<reference types="cypress" />

describe('Product Listing Tests', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/products');
        //cy.get('a[href="/products"]').click();
    });

    it("Verify Search Bar Functionality - Display of Relevant Items (with API)", () => {

        const keyword = 'Tshirt'; // Item to be searched

        // Input the keyword and click the search button
        cy.get('#search_product').should('be.enabled').clear().type(keyword);
        cy.get('#submit_search').should('be.visible').click().then(() => {
            cy.title().should('be.equal', 'Automation Exercise - All Products');
            cy.get('.title').should('contain', "Searched Products")
            // Create Search Product API request to the server
            cy.searchProduct(keyword);
        })
    });

    it.only('Verify Category Filtering - Women > Dress Product Listing Accuracy', () => {
        const category = 'Women';
        const subcategory = 'Dress';

        cy.filterByCategory(category, 1, category, subcategory);
    })


});