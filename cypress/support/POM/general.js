class ProductCatalogPOM {


  //ProductGrid
  productInfo = ') > div > div.single-products > div.productinfo.text-center';
  productOverlay = ') > div > div.single-products > div.product-overlay';
  productSelector = 'body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(';
  productOverlayAddtoCartButton = ') > div > div.single-products > div.product-overlay > div > a';
  productViewButton = ')> div > div.choose > ul > li > a';
  //ProductGrid
  productInfo = ') > div > div.single-products > div.productinfo.text-center';
  productOverlay = ') > div > div.single-products > div.product-overlay';
  productSelector = 'body > section:nth-child(3) > div > div.row > div.col-sm-9.padding-right > div.features_items > div:nth-child(';
  productOverlayAddtoCartButton = ') > div > div.single-products > div.product-overlay > div > a';
  productViewButton = ')> div > div.choose > ul > li > a';

  //Pop-up Message 
  messageLabel = '#cartModal > div > div > div.modal-body > p:nth-child(1)';
  viewCartLink = '#cartModal > div > div > div.modal-body > p:nth-child(2) > a > u';
  continueShoppingButton = '#cartModal > div > div > div.modal-footer > button';
  //Pop-up Message 
  messageLabel = '#cartModal > div > div > div.modal-body > p:nth-child(1)';
  viewCartLink = '#cartModal > div > div > div.modal-body > p:nth-child(2) > a > u';
  continueShoppingButton = '#cartModal > div > div > div.modal-footer > button';

  //View Product Page 
  productAddToCartButton = 'body > section > div > div > div.col-sm-9.padding-right > div.product-details > div.col-sm-7 > div > span > button';
  //View Product Page 
  productAddToCartButton = 'body > section > div > div > div.col-sm-9.padding-right > div.product-details > div.col-sm-7 > div > span > button';

  //Cart Product Details 
  productNameLabel = '#product-2 > td.cart_description > h4 > a';


  //Product Sidebar
  producturlList = [
    'Polo',
    'H&M',
    'Madame',
    'Mast%20&%20Harbour',
    'Babyhug',
    'Allen%20Solly%20Junior',
    'Kookie%20Kids',
    'Biba'
  ];

  productList = [
    'Polo',
    'H&M',
    'Madame',
    'Mast & Harbour',
    'Babyhug',
    'Allen Solly Junior',
    'Kookie Kids',
    'Biba'
  ];
  productSideBarSelector = 'body > section > div > div.row > div.col-sm-3 > div.left-sidebar > div.brands_products > div > ul > li:nth-child(';
  productSideBarLocation = ') > a';

      //Search Product
  searchInput = '#search_product';
  searchButton = '#submit_search';

  //Title
  title = '.title';

  addProduct() {
    cy.get('.features_items > div').eq(2).within(() => {
      // Hover over the product
      cy.get('.productinfo.text-center').trigger('mouseover');
      cy.wait(100);
      cy.get('.product-overlay a').click({ force: true });
    });
    cy.get(this.messageLabel, { timeout: 10000 }).should('exist')
      .and('contain', 'Your product has been added to cart.');
    cy.get(this.viewCartLink).click({ force: true });
  };

  addAllProducts(){
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
                    cy.get(this.continueShoppingButton).should('be.visible').click();
                } else {
                    // Last product - #cartModal > div > div > div.modal-body > p:nth-child(1)
                    cy.get(this.messageLabel)
                        .should('be.visible')
                        .and('contain', 'Your product has been added to cart.');
                    cy.get(this.viewCartLink).click();
                }
            }
        });
  };

}
export default new ProductCatalogPOM();
