

//Login User using Fixture 
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://www.automationexercise.com');

  // Click the Signup / Login button
  cy.contains('Signup / Login').click();

  // Fill in the login form
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);

  // Submit the form
  cy.get('button[data-qa="login-button"]').click();

});


//For checking the validation of the input fields
Cypress.Commands.add('validateRequiredField', (selector) => {
    cy.get(selector).then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
        expect($input[0].validationMessage).to.eq('Please fill out this field.');
    });
});

Cypress.Commands.add('validateMultipleRequiredFields', (selectors) => {
    selectors.forEach((selector) => {
        cy.validateRequiredField(selector);
    });
});

// Check that visible label contains expected text (no need for selector)
Cypress.Commands.add('verifyLabelExists', (expectedText) => {
    cy.get('label:visible').should('contain.text', expectedText);
});

// Or check for ANY visible text (headers, spans, etc.)
Cypress.Commands.add('verifyTextExists', (expectedText) => {
    cy.contains(expectedText).should('be.visible');
});



//Screnshot 
const dayjs = require('dayjs');
//Create a global variable for testCaseTitle ; add "let testCaseTitle;" to initial line of 
// add the following snippet in the describe block and before the first it block 
/*   beforeEach(function () {
    testCaseTitle = this.currentTest.title;
  }); */
Cypress.Commands.add('snapshot', (testCaseTitle) => {
  const now = dayjs().format('DD-MM-YYYYhhmmss')
  cy.screenshot("/" + testCaseTitle + "/" + testCaseTitle + ' ' + now);

})

//Search Product
Cypress.Commands.add('searchProduct', (keyword) => {
  /*
      Search for a product using the search bar
      and verify that the product is displayed 
      and matches the value of the name based on the search request
  */
  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/searchProduct',
    form: true,
    body: { search_product: keyword },
  }).then((response) => {
    const parse = JSON.parse(response.body);
    const products = parse.products;

    // Verify if each product is displayed and matches the value of the name based on the search request
    for (let i = 0; i < products.length; i++) {
      var selector = i + 3;
      cy.get(`.features_items > div:nth-child(${selector}) > .product-image-wrapper > .single-products > .productinfo > p`).should('contain', products[i].name);
      cy.log(products[i].name);
    }
  });
});

// Filter Products
Cypress.Commands.add('filterByCategory', (cat, subcat, subcatname) => {
  cy.get(`a[href="#${cat}"]`).click().then(() => {
    cy.get(`a[href="/category_products/${subcat}"]`).click().then(() => {
      cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/productsList',
        form: true
      }).then((response) => {
        const data = JSON.parse(response.body);
        const filtered = data.products.filter(p => p.category.usertype.usertype === cat && p.category.category === subcatname);
        cy.log(JSON.stringify(filtered));
        // Verify if each product is displayed and matches the value of the name based on the filtered request
        for (let i = 0; i < filtered.length; i++) {
          var selector = i + 3;
          cy.get(`.features_items > div:nth-child(${selector}) > .product-image-wrapper > .single-products > .productinfo > p`).should('contain', filtered[i].name);
          cy.log(filtered[i].name);
        }
      });
    });
  });
});

Cypress.Commands.add('addAProductToCart', () => {
  // Adds the first product displayed in Products Page
  cy.clearCookies();
  cy.visit('https://automationexercise.com/products')
  cy.get('.title').should('contain', "All Products")
  cy.title().should('be.equal', 'Automation Exercise - All Products')

  cy.get(':nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
  cy.get('.modal-footer > .btn').click()
});


