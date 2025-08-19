class cartPage{

    //productImageLabel = '#product-1 > td.cart_product > a > img';
    //Labels
    productImageLabel = '.image';
    productDescriptionLabel = '.description';
    productPriceLabel = '.price';
    productQuantityLabel = '.quantity';
    productTotalLabel = '.total';
    //Buttons
    proceedToCheckoutButton = '.col-sm-6 > .btn';
    commentText = '.form-control';
    scrollUpButton ='#scrollUp > .fa';
    placeOrderButton = ':nth-child(7) > .btn';
    
    //Text Fields
    nameText ='[data-qa="name-on-card"]'
    cardNumberText ='[data-qa="card-number"]'
    cvcText ='[data-qa="cvc"]'
    expiryMonthText ='[data-qa="expiry-month"]'
    expiryYearText ='[data-qa="expiry-year"]'
    payButton ='[data-qa="pay-button"]';

    successMessage = '#success_message > div';
    downloadInvoiceButton = '#form > div > div > div > a';
    continueButton = '#form > div > div > div > div > a';
    confirmationMessage = '#form > div > div > div > p';
    emptyCartMessage = '.text-center';
    cartButton = '.shop-menu > .nav > :nth-child(3) > a';
    productLink = '#empty_cart > p > a';

    //
    deliverAddressNameLabel = '#address_delivery > .address_firstname';
    totalAmount = ':nth-child(4) > .cart_total_price';

    //Modal - Checkout
    modalTitleLabel = '.modal-title';
    modalDescriptionLabel = '.modal-body > :nth-child(1)';
    modalRegisterLogin = '.modal-body > :nth-child(2) > a > u';
    modalContinueButton = '.modal-footer > .btn';

    enterPaymentDetails(name,cardNumber,CVC,expiryMonth, expiryYear){
         if (name) {
        cy.get(this.nameText).type(name);
    }
    if (cardNumber) {
        cy.get(this.cardNumberText).type(cardNumber);
    }
    if (CVC) {
        cy.get(this.cvcText).type(CVC);
    }
    if (expiryMonth) {
        cy.get(this.expiryMonthText).type(expiryMonth);
    }
    if (expiryYear) {
        cy.get(this.expiryYearText).type(expiryYear);
    }

        cy.get(this.payButton).click();
    };
    verifySuccessMessage(){
        cy.get(this.confirmationMessage).should('be.visible').and('contain','Congratulations! Your order has been confirmed!');
        cy.get(this.downloadInvoiceButton).should('be.visible').and('exist');
        cy.get(this.continueButton).should('be.visible').and('exist');
    }

        verifyErrorMessage(){
        cy.get(this.confirmationMessage).should('not.exist');
        cy.get(this.downloadInvoiceButton).should('not.exist');
        cy.get(this.continueButton).should('not.exist');
    }
    clickContinue(){
        cy.get(this.continueButton).click();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    }

    checkOutEmptyCart(){
        cy.visit('https://www.automationexercise.com/cart'); 
        cy.get(this.cartButton).click();
        this.verifyEmptyCart();
  
    }

    verifyEmptyCart(){
        cy.get(this.emptyCartMessage).should('be.visible').and('contain','Cart is empty! Click here to buy products.')
        cy.get(this.productLink).should('be.visible').and('exist').click();
        cy.url().should('eq', 'https://www.automationexercise.com/products');
    }
} 

export default cartPage;