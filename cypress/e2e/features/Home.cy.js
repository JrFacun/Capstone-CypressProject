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
            cy.wait(500)
        });
    });


    it("Home Page UI Check", () => {

        const ListA = " > div > ul > li:nth-child(";
        const ListB = ") > a";
        const categories = ['#Women', '#Men', '#Kids'];

        /*        let productItem = 3;
               for (; productItem <= 36; productItem++) {
                   cy.get(module.productSelector + productItem + module.productInfo).trigger('mouseover');
                   cy.wait(100);
                   cy.get(module.productSelector + productItem + module.productOverlay).should('exist');
               } */

        cy.get('.features_items > div').each(($el, index) => {
            // Start at 3rd product (index 2)
            if (index >= 2) {
                cy.wrap($el).within(() => {
                    // Hover over the product info
                    cy.get('.productinfo.text-center').trigger('mouseover');

                    // Assert that the overlay appears
                    cy.get('.product-overlay').should('exist');
                });
            }
        });




        categories.forEach((category, i) => {
            const accordianList = '#accordian > div:nth-child(';
            const accordianEnd = ') > div.panel-heading > h4 > a';
            var childn = i + 1;
            cy.get(accordianList + childn + accordianEnd).click();
            cy.get(`${category} > div > ul > li`).then($items => {
                const itemCount = $items.length;

                for (let j = 1; j <= itemCount; j++) {
                    cy.get(category + ListA + j + ListB)
                        .should('be.exist')
                        .click();

                    // Re-click to reopen accordion after each click (if needed)
                    cy.get(accordianList + childn + accordianEnd).click();
                };
            }
            );

        })
    })
    it("User is able add a product to the cart from the Home Page product overlay", () => {
        cy.get('.features_items > div').eq(2).within(() => {
            // Hover over the product

            cy.get('.productinfo.text-center').trigger('mouseover');
            cy.wait(100);

            cy.get('.product-overlay a').click({ force: true });
             });
            cy.get(module.messageLabel, { timeout: 10000 }).should('exist')
                .and('contain', 'Your product has been added to cart.');
            cy.get(module.viewCartLink).click({ force: true });
       

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
    it("User is able add all products to the cart from the Home Page product overlay", () => {
        cy.get('.features_items > div').each(($el, index, $list) => {
            if (index >= 1) { // Starts at productItem = 3
                cy.wrap($el).within(() => {
                    cy.get('.productinfo.text-center').trigger('mouseover');
                    cy.wait(100);

                    cy.get('.product-overlay').should('be.visible');
                    cy.get('.product-overlay a').click({ force: true });
                });

                cy.wait(200);

                if (index + 1 !== $list.length) {
                    // Not the last item
                    cy.get(module.continueShoppingButton).should('be.visible').click();
                } else {
                    // Last product - #cartModal > div > div > div.modal-body > p:nth-child(1)
                    cy.get(module.messageLabel)
                        .should('be.visible')
                        .and('contain', 'Your product has been added to cart.');
                    cy.get(module.viewCartLink).click();
                }
            }
        });

        cy.wait(200);

        cy.url().should('eq', 'https://www.automationexercise.com/view_cart');
        cy.get(module.productNameLabel).should('contain', 'Men Tshirt');
    })
    it("User is redirected to respective Product List Page when clicking a Sub-Category", () => {
        for (let i = 0; i < module.productList.length; i++) {
            const sidebarSelector = module.productSideBarSelector + (i + 1) + module.productSideBarLocation;
            const expectedUrl = `https://www.automationexercise.com/brand_products/${module.producturlList[i]}`;

            // Click the brand in the sidebar
            cy.get(sidebarSelector).click();

            // Assert the redirected URL is correct
            cy.url().should('eq', expectedUrl);

            // Go back to reset sidebar for next iteration
            cy.visit('https://www.automationexercise.com/');
        }
    });
})  
