import ProductCatalogPOM from '../../support/POM/general';
import cartPage from '../../support/POM/cartPOM';
import { generateFakeSignupData } from '../../support/utils/userFaker';
import RegisterPage from '../../support/POM/registrationPage';
import ProductDetailViewPOM from '../../support/POM/productDetails';
const el = new ProductDetailViewPOM;
const productCatalog  = new ProductCatalogPOM();
let testCaseTitle;
const module = new cartPage;
let user;
describe("Contact Us Test Cases", () => {
    // beforeEach(function () {
    //     testCaseTitle = this.currentTest.title;
    // });
    beforeEach(function () {
        testCaseTitle = this.currentTest.title;
        if (this.currentTest.title === 'User can view the cart while logged out') {
            return;
        };
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();

        user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);
        RegisterPage.fillPersonalInfo(user);
        RegisterPage.fillAddress(user);

        cy.get(RegisterPage.createAccountButton).click();

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations');
        cy.get(RegisterPage.continueButton).click();
        cy.wait(1000);

    });

    it("Add to Cart UI Check", () => {
        cy.visit('https://www.automationexercise.com/cart');
        productCatalog.addProduct();
        const tableColumns = [
            module.productImageLabel,
            module.productDescriptionLabel,
            module.productPriceLabel,
            module.productQuantityLabel,
            module.productTotalLabel
        ];
        tableColumns.forEach(column => cy.verifyTableColumn(column));

        cy.verifyCartItems();

        cy.get(module.proceedToCheckoutButton).should('exist').and('be.visible').click();

        const expectedText = [
            'Address Details',
            'Review Your Order',
            'Your delivery address',
            'Your billing address'
        ];
        expectedText.forEach(text => cy.verifyTextExists(text));
        cy.verifyCartItems();

        const fieldsToCheck = [
            module.commentText
        ]
        cy.verifyInputsAreEnabled(fieldsToCheck);
        cy.scrollTo('bottom');
        cy.get(module.scrollUpButton).should('be.visible').and('exist');

        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyTextExists('Payment');
        const expectedLabels = [
            'Name on Card',
            'Card Number',
            'CVC',
            'Expiration'
        ];
        expectedLabels.forEach(label => cy.verifyLabelExists(label));

        const textField = [
            module.nameText,
            module.cardNumberText,
            module.cvcText,
            module.expiryMonthText,
            module.expiryYearText
        ];
        cy.verifyInputsAreEnabled(textField);
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifySuccessMessage();
        module.clickContinue();
    });

    it("User is not able to checkout if there are no items in the cart", () => {
        module.checkOutEmptyCart();

    })

    it('User is able to checkout all products', () => {
        productCatalog.addAllProducts();
        cy.get(module.proceedToCheckoutButton).should('exist').and('be.visible').click();
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifySuccessMessage();
        module.clickContinue();
    });

    it('User is able to remove all products', () => {
        productCatalog.addProduct();
        cy.clearCart();
        module.verifyEmptyCart();
    });

    it('User is able to comment before checkout', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.commentText).should('be.visible').type(comment);
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifySuccessMessage();
        module.clickContinue();

    });

    it('User cannot checkout when no enter is no name on payment method', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton, { timeout: 10000 }).click();
        cy.get(module.commentText, { timeout: 10000 }).should('be.visible').type(comment);
        cy.get(module.placeOrderButton, { timeout: 10000 }).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails("", user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifyErrorMessage();
    });

    it('User cannot checkout when no enter is no card number on payment method', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton, { timeout: 10000 }).click();
        cy.get(module.commentText, { timeout: 10000 }).should('be.visible').type(comment);
        cy.get(module.placeOrderButton, { timeout: 10000 }).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, "", user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifyErrorMessage();

    });
    it('User cannot checkout when no enter is no CVC  on payment method', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton, { timeout: 10000 }).click();
        cy.get(module.commentText).should('be.visible').type(comment);
        cy.get(module.placeOrderButton, { timeout: 10000 }).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, "", user.ExpiryMonth, user.ExpiryYear);
        module.verifyErrorMessage();

    });

    it('User cannot checkout when no enter is no Expiration Date  on payment method', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton, { timeout: 10000 }).click();
        cy.get(module.commentText).should('be.visible').type(comment);
        cy.get(module.placeOrderButton, { timeout: 10000 }).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, "", "");
        module.verifyErrorMessage();

    });

    it('User cannot checkout when special characters are entered on payment method', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        const comment = 'product has free shipping';
        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.commentText).should('be.visible').type(comment);
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails('@@@@', '@@@@', '@@@@', "@@@@", "@@@@");
        module.verifyErrorMessage();

    });

    it('User cannnot checkout with an expired card', () => {
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });
        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, 1999);
        module.verifyErrorMessage();


    });

    it('User is able to download the invoice', () => {
        productCatalog.addProduct();
        cy.get(module.proceedToCheckoutButton).click();
        let trimmedName;
        let amount;
        cy.get(module.deliverAddressNameLabel)
            .invoke('text')
            .then((nameText) => {
                // Remove titles (Mr./Ms.), trim spaces, and collapse extra spaces
                trimmedName = nameText.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/i, '').trim();
                cy.log('Full Name:', trimmedName);

                cy.get(module.totalAmount)
                    .invoke('text')
                    .then((amountText) => {
                        // Remove "Rs." and extra spaces
                        amount = amountText.replace(/^Rs\.\s*/, '').trim();
                        cy.log(amount);
                    });
            });
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifySuccessMessage();
        cy.get(module.downloadInvoiceButton)
            .should('exist')
            .and('be.visible')
            .click()
            .then(() => {
                cy.verifyInvoice(trimmedName, amount);
            });
    });
    it('User is able to download the invoice once all products are added to the cart', () => {
        productCatalog.addAllProducts();
        cy.get(module.proceedToCheckoutButton).click();
        let trimmedName;
        let amount;

        cy.get(module.deliverAddressNameLabel)
            .invoke('text')
            .then((nameText) => {
                // Remove titles (Mr./Ms.), trim spaces, and collapse extra spaces
                trimmedName = nameText.replace(/^(Mr\.|Mrs\.|Ms\.)\s*/i, '').trim();
                cy.log('Full Name:', trimmedName);

                cy.get(module.totalAmount)
                    .invoke('text')
                    .then((amountText) => {
                        // Remove "Rs." and extra spaces
                        amount = amountText.replace(/^Rs\.\s*/, '').trim();
                        cy.log(amount);
                    });
            });
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, user.ExpiryYear);
        module.verifySuccessMessage();
        cy.get(module.downloadInvoiceButton)
            .should('exist')
            .and('be.visible')
            .click()
            .then(() => {
                cy.verifyInvoice(trimmedName, amount);
            });
    });
    it('User can view the cart while logged out', () => {
        cy.visit('https://www.automationexercise.com/')
        productCatalog.addProduct();
        let attempts = 0;
        const maxAttempts = 5;
        cy.wrap(null).then(function retry() {
            cy.get('body').then($body => {
                if ($body.find(module.proceedToCheckoutButton).length > 0) {
                    cy.log('✅ Proceed to Checkout button found!');
                } else {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error(`❌ Proceed to Checkout button not found after ${maxAttempts} attempts`);
                    }
                    cy.log(`❌ Button not found - adding product (Attempt ${attempts})`);
                    cy.visit('https://www.automationexercise.com/')
                    productCatalog.addProduct();
                    return retry(); // directly retry from here
                }
            });
        });

        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.modalTitleLabel).should('exist').and('be.visible').and('contain', 'Checkout');
        cy.get(module.modalDescriptionLabel).should('exist').and('be.visible')
            .and('contain', 'Register / Login account to proceed on checkout.');
        cy.get(module.modalContinueButton).should('exist').and('be.visible').click();
        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.modalRegisterLogin).should('exist').and('be.visible').click();
        cy.url().should('eq', 'https://www.automationexercise.com/login');

    });

    it('User checks out a negative quantity of product', () => {
        const negativeQuantity = -1

        cy.visit('https://www.automationexercise.com/products');
        cy.get('div.choose > ul > li > a')
            .first().click();

        // Negative value for quantity
        ProductDetailViewPOM.inputQuantity(negativeQuantity);
        ProductDetailViewPOM.clickAddToCart();
        // Intercept the exact request
        cy.intercept('POST', `**/add_to_cart/2?quantity=${negativeQuantity}`).as('addToCart');
        cy.get(ProductDetailViewPOM.mdlSuccess).should('not.be.visible');
        cy.get(productCatalog.messageLabel).should('exist')
            .and('contain', 'Your product has been added to cart.');
        cy.get(productCatalog.viewCartLink).click({ force: true });
        cy.get(module.proceedToCheckoutButton).click();
        cy.get(module.placeOrderButton).should('be.visible').and('exist').click();
        cy.verifyButton(module.payButton);
        module.enterPaymentDetails(user.Name, user.CardNumber, user.CVC, user.ExpiryMonth, 1999);
        module.verifyErrorMessage();
    })


});

