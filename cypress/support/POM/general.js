class ProductCatalogPOM {

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

  //View Product Page 
  productAddToCartButton = 'body > section > div > div > div.col-sm-9.padding-right > div.product-details > div.col-sm-7 > div > span > button';

    //Cart Product Details 
    productNameLabel  = '#product-2 > td.cart_description > h4 > a';
    

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
    productSideBarLocation =') > a';

    //Search Product
  searchInput = '#search_product';
  searchButton = '#submit_search';

  //Title
  title = '.title';
}
export default ProductCatalogPOM;
