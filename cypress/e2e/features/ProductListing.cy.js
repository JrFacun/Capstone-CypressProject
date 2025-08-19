///<reference types="cypress" />
import LoginPage from '../../support/POM/loginPage';
import ProductCatalogPOM from '../../support/POM/general';
const module = new ProductCatalogPOM;

describe('Product Search', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/products');
        //cy.get('a[href="/products"]').click();
    });

    it("Verify Search Bar Functionality - Display of Relevant Items (with API)", () => {
        cy.snapshot('Search a Product then Verify Search Results')
        const keyword = 'Tshirt'; // Item to be searched

        // Input the keyword and click the search button
        cy.get(module.searchInput).should('be.enabled').clear().type(keyword);
        cy.get(module.searchButton).should('be.visible').click().then(() => {            
            cy.title().should('be.equal', 'Automation Exercise - All Products');
            cy.get(module.title).should('contain', "Searched Products")
            // Create Search Product API request to the server
            cy.searchProduct(keyword).wait(2000);
            cy.snapshot('Search a Product then Verify Search Results');
        })
    });
});


describe('Filter Products', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.visit('https://automationexercise.com/products');
        //cy.get('a[href="/products"]').click();
    });

    // Category Filtering
    it('Verify the Accuracy in displaying the Products when filtered by Category', () => {

        cy.fixture('products').then((filter) => {
            for (let i = 0; i < filter.category.length; i++) {
                // cy.log(filter.brand[i])
                cy.filterByCategory(i)
            }
        });
    })

    // Brand Filtering
    it('Verify the Accuracy in displaying the Products when filtered by Brand', () => {
        //cy.filterByBrand(0)
        cy.fixture('products').then((filter) => {
            for (let i = 0; i < filter.brand.length; i++) {
                cy.filterByBrand(i)
            }
        })
    })
});

describe('Add to Cart in Products Listing', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.clearCookies();
    });

    it('Verify Adding Product to Cart in Products Page (All Products Listed), filtered listing by Category, and filtered listing by Brand when user is not logged in', () => {
        const filename = 'Add A Product - without Logging In';
        cy.snapshot(filename);
        cy.addToCartInDifferentPages(filename);
    });

    it('Verify Adding Product to Cart in Products Page (All Products Listed), filtered listing by Category, and filtered listing by Brand when user is logged in', () => {
        const filename = 'Log In then Add a Productroducts';

        cy.fixture('user').then((user) => {
            cy.get('a[href="/login"]').click();
            cy.snapshot(filename);
            LoginPage.login(user[0].Email, user[0].Password);
            LoginPage.verifyLoginSuccess('James Cruz');
            cy.addToCartInDifferentPages(filename);
        });
    });
})