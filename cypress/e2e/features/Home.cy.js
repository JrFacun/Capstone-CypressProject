import LoginPage from '../../support/POM/loginPage';
import ProductCatalogPOM from '../../support/POM/general';
const module = new ProductCatalogPOM;
let testCaseTitle;
describe("Home Page", () => {
    beforeEach(function () {
        testCaseTitle = this.currentTest.title;
    });

    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
        cy.fixture('user').then((user) => {
            LoginPage.login(user[0].Email, user[0].Password);
            cy.wait(5000)
        });
    });


    it("Home Page UI Check", () => {

        const ListA = " > div > ul > li:nth-child(";
        const ListB = ") > a";
        const categories = ['#Women', '#Men', '#Kids'];
        //cy.get('#accordian > div:nth-child(1) > div.panel-heading > h4 > a').click();
        //#accordian > div:nth-child(2) > div.panel-heading > h4 > a
        //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(3) > div > div.single-products > div.product-overlay
        //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(3) > div > div.single-products > div.productinfo.text-center
        //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(4) > div > div.single-products > div.product-overlay
        //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(7) > div > div.single-products > div.product-overlay
        //36

        let productItem = 3;
        for (; productItem <= 36; productItem++) {
            cy.get(module.productSelector + productItem + module.productInfo).trigger('mouseover');
            cy.wait(100);
            cy.get(module.productSelector + productItem + module.productOverlay).should('be.visible');
        }


        categories.forEach((category, i) => {
            const accordianList = '#accordian > div:nth-child(';
            const accordianEnd = ') > div.panel-heading > h4 > a';
            var childn = i + 1;
            cy.get(accordianList + childn + accordianEnd).click();
            cy.get(`${category} > div > ul > li`).then($items => {
                const itemCount = $items.length;

                for (let j = 1; j <= itemCount; j++) {
                    cy.get(category + ListA + j + ListB)
                        .should('be.visible')
                        .click();

                    // Re-click to reopen accordion after each click (if needed)
                    cy.get(accordianList + childn + accordianEnd).click();
                };
            }
            );

        })
    })
    it("User is able add a product to the cart from the Home Page product overlay", () => {
        let productItem = 4;
        cy.get(module.productSelector + productItem + module.productInfo).trigger('mouseover');
        cy.wait(400);
        cy.get(module.productSelector + productItem + module.productOverlay).should('be.visible');
        cy.get(module.productSelector + productItem + module.productOverlayAddtoCartButton).click({ force: true });
        cy.wait(200);
        cy.get(module.messageLabel).should('be.visible').and('contain', 'Your product has been added to cart.');
        cy.get(module.viewCartLink).should('be.visible').click();
        cy.url().should('eq', 'https://www.automationexercise.com/view_cart');
        cy.get(module.productNameLabel).should('contain', 'Men Tshirt');
    })
    it("User is able add a product to the cart from the View Product Page", () => {
        let productItem = 4;
        cy.get(module.productSelector + productItem + module.productInfo).trigger('mouseover');
        cy.wait(400);
        cy.get(module.productSelector + productItem + module.productOverlay).should('be.visible');
        cy.get(module.productSelector + productItem + module.productViewButton).click({ force: true });
        cy.get(module.productAddToCartButton).click();
        cy.get(module.messageLabel).should('be.visible').and('contain', 'Your product has been added to cart.');
        cy.get(module.viewCartLink).should('be.visible').click();
        cy.url().should('eq', 'https://www.automationexercise.com/view_cart');
        cy.get(module.productNameLabel).should('contain', 'Men Tshirt');
    })
    it.only("User is able add all products to the cart from the Home Page product overlay", () => {
        let productItem = 3;
        for (; productItem <= 36; productItem++) {
            cy.get(module.productSelector + productItem + module.productInfo).trigger('mouseover');
            cy.wait(100);
            cy.get(module.productSelector + productItem + module.productOverlay).should('be.visible');
            cy.get(module.productSelector + productItem + module.productOverlayAddtoCartButton).click({ force: true });
            cy.wait(200);
            if(productItem!=36){
            cy.get(module.continueShoppingButton).should('be.visible').click();
            }else{
             cy.get(module.messageLabel).should('be.visible').and('contain', 'Your product has been added to cart.');
        cy.get(module.viewCartLink).click();
            }
        }
        cy.wait(200);

        cy.url().should('eq', 'https://www.automationexercise.com/view_cart');
        cy.get(module.productNameLabel).should('contain', 'Men Tshirt');
    })
    
})  
