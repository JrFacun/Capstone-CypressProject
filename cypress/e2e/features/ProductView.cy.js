///<reference types="cypress" />
import LoginPage from '../../support/POM/loginPage';

import ProductDetailViewPOM from '../../support/POM/productDetails';


describe('Product Details View', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('https://automationexercise.com/products');
    });

    it("Verify View Products button in All and Filtered Products Pages when user is not logged in", () => {
        const ssfilename = 'ProductView - View A Product as Guest';
        verifyViewProductButton(ssfilename);
    });

    it("Verify View Products button in All and Filtered Products Pages when user is logged in", () => {
        const ssfilename = 'ProductView - View A Product as Registered User';
        cy.fixture('user').then((user) => {
            cy.get('a[href="/login"]').click();
            LoginPage.login(user[0].Email, user[0].Password);
            LoginPage.verifyLoginSuccess('James Cruz');
            cy.visit('https://automationexercise.com/products');
            verifyViewProductButton(ssfilename);
        });
    });

    it("Verify if the product details are accurate when product list is filetered and the product name and price is the same as the card and the product detail page", () => {
        const brand = 'Polo';
        const category = 'Women';
        const subcategory = 'Dress';
        const ssfilename = 'ProductView - Filter Product List then Select A Product then Verify if the Category or Brand is Correct';

        cy.get(`a[href="/brand_products/${brand}"]`).click().wait(500);
        cy.snapshot(ssfilename);
        cy.get('.productinfo > h2').first().invoke('text').as('price')
        cy.get('.productinfo > p').first().invoke('text').as('name')
        cy.get('@price').then((price) => {
            cy.get('@name').then((name) => {
                cy.get('div.choose > ul > li > a').first().click();
                cy.snapshot(ssfilename);
                cy.get(ProductDetailViewPOM.lblProductBrand).should('contain', brand);
                cy.get(ProductDetailViewPOM.lblProductName).should('contain', name);
                cy.get(ProductDetailViewPOM.lblProductPrice).should('contain', price);
            });
        });

        cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click().wait(500);
        cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click();
        cy.snapshot(ssfilename);
        cy.get('.productinfo > p').first().invoke('text').as('name')
        cy.get('.productinfo > h2').first().invoke('text').as('price')
        cy.get('@price').then((price) => {
            cy.get('@name').then((name) => {
                cy.get('div.choose > ul > li > a').first().click();
                cy.snapshot(ssfilename);
                cy.get(ProductDetailViewPOM.lblProductCategory).should('contain', `${category} > ${subcategory}`);
                cy.get(ProductDetailViewPOM.lblProductName).should('contain', name);
                cy.get(ProductDetailViewPOM.lblProductPrice).should('contain', price);
            });
        });

    })

    function verifyViewProductButton(ssfilename) {
        // All Products pages
        cy.snapshot(ssfilename);
        cy.get('.title').should('contain', "All Products")
        cy.get('div.choose > ul > li > a').first().click();
        cy.snapshot(ssfilename);

        // Filtered Products by Category
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();
        cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click();
        cy.snapshot(ssfilename);
        cy.get('.title').should('contain', "Women - Dress Products")
        cy.get('div.choose > ul > li > a').first().click();
        cy.snapshot(ssfilename);

        // Filtered Products by Brand
        cy.get('a[href="/brand_products/Polo"]').click();
        cy.snapshot(ssfilename);
        cy.get('.title').should('contain', "Brand - Polo Products")
        cy.title().should('be.equal', 'Automation Exercise - Polo Products')
        cy.get('div.choose > ul > li > a').first().click();
        cy.snapshot(ssfilename);

    }
});

describe('Product Review', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.clearCookies();
        //cy.visit('https://automationexercise.com/product_details/1')
        cy.visit('https://automationexercise.com/products');
    });

    const review = {
        name: 'James Cruz',
        email: 'jamescruz@gmail.com',
        text: 'This is a test review',
        invalidemail: [
            'jamescruz@@gmail.com',
            'jamescruzgmail.com',
            'jamescruz@l',
            '@gmail.com'],
        invalidemail1: 'jamescruz@@gmail.com',
        invalidemail2: 'jamescruzgmail.com',
        invalidemail3: 'jamescruz@',
        invalidemail2: '@gmail.com',
    }


    it('Verify Product Review submission with valid input fields', () => {
        const ssfilename = 'ProductView - Post a Review - Valid Input Fields';
        cy.get('div.choose > ul > li > a').first().click();
        ProductDetailViewPOM.fillProductReview(review.name, review.email, review.text)
        cy.then(() => ProductDetailViewPOM.getAlertSuccess())
        cy.snapshot(ssfilename);
        //cy.get('#name').type('James Cruz');
    })

    it('Verify that Product Review submission is unsuccessful with an invalid email', () => {
        const ssfilename = 'ProductView - Post a Review - Valid Input Fields';
        cy.get('div.choose > ul > li > a').first().click();
        review.invalidemail.forEach((xemail) => {
            ProductDetailViewPOM.fillProductReview(review.name, xemail, review.text)
            cy.snapshot(ssfilename);
            cy.get(ProductDetailViewPOM.alertSuccess).should('not.be.visible')
        })
    });

    it('Verify that Product Review submission is unsuccessful with blank Name input field', () => {
        const ssfilename = 'ProductView - Post a Review - Blank Name input field';
        cy.get('div.choose > ul > li > a').first().click();
        ProductDetailViewPOM.fillProductReview("", review.email, review.text)
        cy.snapshot(ssfilename);
        cy.get(ProductDetailViewPOM.alertSuccess).should('not.be.visible')
    });
});

describe('Add to Cart Functionality', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.visit('https://automationexercise.com/products');
    });

    it('Verify that Add to Cart Function will accept a positive integer', () => {
        const quantity = 1;
        const ssfilename = 'ProductView - View A Product as Registered User';

        cy.visit('https://automationexercise.com/products');
        cy.get('div.choose > ul > li > a').first().click();
        // Float value for quantity
        ProductDetailViewPOM.inputQuantity(quantity);
        ProductDetailViewPOM.clickAddToCart();
        cy.get(ProductDetailViewPOM.mdlSuccess).should('be.visible');
    })

    it('Verify that Add to Cart Function will not accept a number with a decimal value for Quantity', () => {
        const ssfilename = 'ProductView - Verify an unsuccessful Add To Cart function with a decimal value for Quantity';
        const floatQuantity = 1.5;
        addToCart(floatQuantity, ssfilename);
    })

    it('Verify that Add to Cart Function will not accept a negative integer for Quantity', () => {
        const ssfilename = 'ProductView - Verify an unsuccessful Add To Cart function with a negative value for Quantity';
        const negativeQuantity = -1
        addToCart(negativeQuantity, ssfilename);
    })

    it('Verify that Add to Cart Function will not accept a zero (0) for Quantity', () => {
        const ssfilename = 'ProductView - Verify an unsuccessful Add To Cart function with a zero (0) for Quantity';
        const zeroQuantity = 0
        addToCart(zeroQuantity, ssfilename);
    })

    function addToCart(quantity, ssfilename) {
        cy.visit('https://automationexercise.com/products');
        cy.get('div.choose > ul > li > a').first().click();

        ProductDetailViewPOM.inputQuantity(quantity);
        cy.snapshot(ssfilename);
        if (!Number.isInteger(quantity)) {
            cy.intercept('POST', `**/add_to_cart/2?quantity=${quantity}`).as('addToCart');
        }
        ProductDetailViewPOM.clickAddToCart();
        cy.snapshot(ssfilename);
        ProductDetailViewPOM.verifySuccessModalHidden();
    }
});
