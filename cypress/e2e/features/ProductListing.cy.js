///<reference types="cypress" />

describe('Product Search', { testIsolation: false }, () => {
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
});

describe('Filter Products by Category', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/products');
        //cy.get('a[href="/products"]').click();
    });
    it('Verify Category Filtering - Women > Dress Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.women.name,
                filter.category.women.dress.index,
                filter.category.women.dress.name)
        });
        cy.get('.title').should('contain', "Women - Dress Products")
        cy.title().should('be.equal', 'Automation Exercise - Dress Products');
    })

    it('Verify Category Filtering - Women > Tops Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.women.name,
                filter.category.women.tops.index,
                filter.category.women.tops.name)
        });
        cy.get('.title').should('contain', "Women - Tops Products")
        cy.title().should('be.equal', 'Automation Exercise - Tops Products');
    })

    it('Verify Category Filtering - Women > Saree Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.women.name,
                filter.category.women.saree.index,
                filter.category.women.saree.name)
        });
        cy.get('.title').should('contain', "Women - Saree Products")
        cy.title().should('be.equal', 'Automation Exercise - Saree Products');
    })

    it('Verify Category Filtering - Men > Tshirts Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.men.name,
                filter.category.men.tshirts.index,
                filter.category.men.tshirts.name)
        });
        cy.get('.title').should('contain', "Men - Tshirts Products")
        cy.title().should('be.equal', 'Automation Exercise - Tshirts Products');
    })

    it('Verify Category Filtering - Men > Jeans Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.men.name,
                filter.category.men.jeans.index,
                filter.category.men.jeans.name)
        });
        cy.get('.title').should('contain', "Men - Jeans Products")
        cy.title().should('be.equal', 'Automation Exercise - Jeans Products');
    })

    it('Verify Category Filtering - Kids > Dress Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.kids.name,
                filter.category.kids.dress.index,
                filter.category.kids.dress.name)
        });
        cy.get('.title').should('contain', "Kids - Dress Products")
        cy.title().should('be.equal', 'Automation Exercise - Dress Products');
    })

    it('Verify Category Filtering - Kids > Tops & Shirts Product Listing Accuracy', () => {
        cy.fixture('products').then((filter) => {
            cy.filterByCategory(
                filter.category.kids.name,
                filter.category.kids.tnj.index,
                filter.category.kids.tnj.name)
        });
        cy.get('.title').should('contain', "Kids - Tops & Shirts Products")
        cy.title().should('be.equal', 'Automation Exercise - Tops & Shirts Products');
    })
});

describe('Add to Cart Product/s', { testIsolation: false }, () => {
    // beforeEach(() => {
    //     ;
    //     //cy.get('a[href="/products"]').click();
    // });
    it.only('Add to Cart 1 product from Products Page', () => {
        cy.addAProductToCart();
    });
})