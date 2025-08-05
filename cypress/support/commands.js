

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

Cypress.Commands.add('filterByCategory', (url1, url2, category, subcategory) => {
  cy.get(`a[href="#${url1}"]`).click().then(() => {
    cy.get(`a[href="/category_products/${url2}"]`).click().then(() => {
      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/searchProduct',
        form: true,
        body: { search_product: 'Dress' },
      }).then((response) => {
        const data = JSON.parse(response.body);
        const dresses = data.products.filter(p => p.category.usertype.usertype === category && p.category.category === subcategory);

        // Verify if each product is displayed and matches the value of the name based on the filtered request
        for (let i = 0; i < dresses.length; i++) {
          var selector = i + 3;
          cy.get(`.features_items > div:nth-child(${selector}) > .product-image-wrapper > .single-products > .productinfo > p`).should('contain', dresses[i].name);
          cy.log(dresses[i].name);
        }

        // Now you can assert each one
        // dresses.forEach((product) => {
        //   cy.get('.features_items .productinfo > p').should('contain', product.name);
        // });
      });
    });
  });


});

//Screnshot 
const dayjs = require('dayjs');
//Create a global variable for testCaseTitle ; add "let testCaseTitle;" to initial line of 
// add the following snippet in the describe block and before the first it block 
/*   beforeEach(function () {
    testCaseTitle = this.currentTest.title;
  }); */
Cypress.Commands.add('snapshot', (testCaseTitle) =>{
    const now = dayjs().format('DD-MM-YYYYhhmmss')
    cy.screenshot("/"+testCaseTitle+"/"+testCaseTitle +' ' +now);

})
