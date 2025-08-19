import 'cypress-file-upload';

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

Cypress.Commands.add('verifyInputsAreEnabled', (selectors) => {
  selectors.forEach(selector => {
    cy.get(selector)
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled');
  });
});

//Verify Placeholder text in Text Fields
Cypress.Commands.add('verifyPlaceholderText', (expectedPlaceholder) => {

  cy.get(`[placeholder="${expectedPlaceholder}"]`)
    .should('exist')
    .should('be.visible')

});

//Verify Table Columns 
Cypress.Commands.add('verifyTableColumn', (columnTitle) => {
  cy.get(columnTitle)
    .should('exist')
    .should('be.visible');
});

//Verify Item in the Cart 
Cypress.Commands.add('verifyCartItems', () => {

  const checks = [
    {
      name: 'Product Images',
      selector: 'img[src*="get_product_picture"]',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        expect($el[0].naturalWidth).to.be.greaterThan(0);
        cy.log(`✅ Image loaded for product ${index + 1}`);
      }
    },
    {
      name: 'Product Links',
      selector: '.cart_description > h4 > a',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        cy.wrap($el).should('have.attr', 'href');
        cy.log(`🔗 Product ${index + 1} link: ${$el.attr('href')}`);
      }
    },
    {
      name: 'Product Descriptions',
      selector: '.cart_description > p',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        const text = $el.text().trim();
        expect(text).to.not.be.empty;
        cy.log(`📝 Product ${index + 1} description: ${text}`);
      }
    },
    {
      name: 'Prices',
      selector: '.cart_price > p',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        const text = $el.text().trim();
        expect(text).to.match(/^Rs\.\s?\d{1,6}$/);
        cy.log(`💰 Product ${index + 1} price: ${text}`);
      }
    },
    {
      name: 'Quantities',
      selector: '.cart_quantity > .disabled',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        const qty = $el.text().trim();
        expect(qty).to.match(/^\d+$/);
        cy.log(`📦 Product ${index + 1} quantity: ${qty}`);
      }
    },
    {
      name: 'Total Prices',
      selector: '.cart_total_price',
      min: 1,
      max: 36,
      assert: ($el, index) => {
        const total = $el.text().trim();
        expect(total).to.match(/^Rs\.\s*\d+$/);
        cy.log(`🧾 Product ${index + 1} total: ${total}`);
      }
    }
  ];

  cy.get('body').then(($body) => {
    if ($body.find('h2:contains("Review Your Order")').length > 0) {
      // ✅ Skip delete button, check total amount
      cy.get('h4 > b').should('have.text', 'Total Amount');
      cy.get(':nth-child(4) > .cart_total_price')
        .invoke('text')
        .then((totalText) => {
          const cleanTotal = totalText.trim();
          expect(cleanTotal).to.match(/^Rs\.\s*\d+$/);
        });
    } else {
      // ✅ Normal delete button check
      cy.get('.cart_delete > .cart_quantity_delete > .fa', { timeout: 10000 })
        .should('have.length.at.least', 1)
        .and('have.length.at.most', 36)
        .each(($icon, index) => {
          cy.wrap($icon)
            .should('be.visible')
            .and(($el) => {
              expect($el.prop('tagName')).to.eq('I');
              expect($el.hasClass('fa')).to.be.true;
            });
          cy.log(`Product ${index + 1} delete icon detected`);
        });
    }

    // Run the common checks (images, links, prices, etc.)
    checks.forEach(({ name, selector, min, max, assert }) => {
      cy.get(selector, { timeout: 10000 })
        .should('have.length.at.least', min)
        .and('have.length.at.most', max)
        .each(($el, index) => {
          cy.wrap($el).should('be.visible');
          assert($el, index);
        });
    });

  });

});



//Screenshot 
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

// Filter Products by Category
Cypress.Commands.add('filterByCategory', (index) => {
  /*
    Filter products by category and subcategory
    and verify that the product is displayed 
    and matches the value of the name based on the filtered request

  */
  cy.fixture('products').then((filter) => {
    const category = filter.category[index].category;
    const subcategory = filter.category[index].name;
    const subindex = filter.category[index].index;

    cy.get(`a[href="#${category}"]`).click().then(() => {
      cy.get(`a[href="/category_products/${subindex}"]`).click().then(() => {
        /* 
          Get the products list from the server and filter the products 
          based on the category and subcategory
          and verify that the product is displayed and matches the value 
          of the name based on the filtered request
        */
        cy.request({
          method: 'GET',
          url: 'https://automationexercise.com/api/productsList',
          form: true
        }).then((response) => {
          const data = JSON.parse(response.body);
          const filtered = data.products.filter(p => p.category.usertype.usertype === category && p.category.category === subcategory);
          cy.log(JSON.stringify(filtered));

          cy.get('.title').should('contain', `${category} - ${subcategory} Products`)
          cy.title().should('be.equal', `Automation Exercise - ${subcategory} Products`);
          cy.snapshot('Filter Products by Category');

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
});

// Filter Products by Brand
Cypress.Commands.add('filterByBrand', (index) => {
  // Index is to determine the order of the brand and as well as the order in the side menu
  cy.fixture('products').then((filter) => {
    const brand = filter.brand[index].name;
    cy.log(`Testing for Brand: ${brand}`)
    cy.get(`a[href="/brand_products/${brand}"]`).click().then(() => {
      // Get the products list from the server and filter the products 
      cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/productsList',
        form: true
      }).then((response) => {
        const data = JSON.parse(response.body);
        // Filter the products based on the brand
        const filtered = data.products.filter(p => p.brand === brand);
        //cy.log(JSON.stringify(filtered));

        // Verify if the number of products displayed beside the brand is equal to the number of products in the filtered request
        cy.get(`.nav > :nth-child(${index + 1}) > a > .pull-right`).should('contain', filtered.length);

        cy.get('.title').should('contain', `Brand - ${brand} Products`)

        cy.title().should('contain', `Automation Exercise - ${brand} Products`)
        cy.snapshot('Filter Products by Brand');
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


Cypress.Commands.add('addAProductToCart', (ssfilename) => {
  // Prevent test failure on frontend syntax error (optional, see below)
  cy.on('uncaught:exception', (err, runnable) => {
    // returning false prevents Cypress from failing the test
    return false;
  });

  // Clear cookies and add the first product
  cy.clearCookies();
  cy.get('.add-to-cart').first().click().wait(500);
  cy.snapshot(ssfilename);
  cy.get('.close-modal').click();
});

Cypress.Commands.add('addToCartInDifferentPages', (ssfilename) => {
  cy.visit('https://automationexercise.com/products');

  /**
   * This is to check if add to cart button
   * is visible and clickable in different pages
   * such as: All Products Page and Pages filtered by Category or Brand
   */

  // All Products Page
  cy.get('.title').should('contain', "All Products")
  cy.title().should('be.equal', 'Automation Exercise - All Products').then(() => {
    cy.addAProductToCart(ssfilename);
  })

  // Filtered Products by Category
  cy.get(':nth-child(1) > .panel-heading > .panel-title > a').click();
  cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click();
  cy.get('.title').should('contain', "Women - Dress Products")
  cy.title().should('be.equal', 'Automation Exercise - Dress Products').then(() => {
    cy.addAProductToCart(ssfilename);
  })

  // Filtered Products by Brand
  cy.get('a[href="/brand_products/Polo"]').click();
  cy.get('.title').should('contain', "Brand - Polo Products")
  cy.title().should('be.equal', 'Automation Exercise - Polo Products').then(() => {
    cy.addAProductToCart(ssfilename);
  })
});

//verify that Buttons are enabled
Cypress.Commands.add('verifyButton', (button) => {
  cy.get(button)
    .should('exist')
    .and('be.enabled');

});

//clear cart 
// Command to delete all items from cart
Cypress.Commands.add('clearCart', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.cart_delete > .cart_quantity_delete > .fa').length > 0) {
      cy.get('.cart_delete > .cart_quantity_delete > .fa')
        .each(($btn) => {
          cy.wrap($btn).click({ force: true });
        })
        .then(() => {
          // Recursively call until cart is empty
          cy.clearCart();
        });
    } else {
      cy.log('🛒 Cart is now empty');
    }
  });
});

Cypress.Commands.add('verifyInvoice', (trimmedName,amount) => {
  const fileName = 'invoice.txt';
  cy.task('deleteFile', fileName);
  cy.readFile(`cypress/downloads/${fileName}`, { timeout: 15000 }) // wait up to 15s for file
    .should('exist')
    .then((fileContent) => {
      // Optional: verify content
      expect(fileContent.length).to.be.greaterThan(0); // Not empty
      const message = `Hi `+trimmedName+`, Your total purchase amount is `+amount+`. Thank you`;
      cy.log('Invoice Message:', message);
      expect(fileContent.trim()).to.eq(message);


    });
});



