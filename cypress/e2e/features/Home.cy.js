describe("Home Page" , ()=> {
 beforeEach(function () {
    testCaseTitle = this.currentTest.title;
  });

      beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
         cy.fixture('user').then((user) => {
                    LoginPage.login(user[0].Email, user[0].Password);
                    LoginPage.verifyLoginSuccess('James Cruz');
                });
    });


    it("Home Page UI Check", () => {
        it("", () => {
            cy.visit('https://www.automationexercise.com/products');
            const ListA = " > div > ul > li:nth-child(";
            const ListB = ") > a";
            const categories = ['#Women', '#Men', '#Kids'];
            //cy.get('#accordian > div:nth-child(1) > div.panel-heading > h4 > a').click();
            //#accordian > div:nth-child(2) > div.panel-heading > h4 > a
            //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(3) > div > div.single-products > div.product-overlay
            //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(3) > div > div.single-products > div.productinfo.text-center
            //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(4) > div > div.single-products > div.product-overlay
            //body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(7) > div > div.single-products > div.product-overlay
            const productInfo = ') > div > div.single-products > div.productinfo.text-center';
            const productOverlay = ') > div > div.single-products > div.product-overlay';
            const productSelector = 'body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(';
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

    })  
});