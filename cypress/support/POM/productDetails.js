class ProductDetailViewPOM {
    // Product Details
    static lblProductImage = '.view-product > img';

    static lblProductName = '.product-information > h2';
    static lblProductCategory = '.product-information > p';
    static imgProductRating = '.product-information > img';
    static lblProductPrice = ':nth-child(5) > span';

    // Quantity
    static lblQuantity = 'label';
    static inpQuantity = '#quantity';
    static btnAddToCart = 'button[class="btn btn-default cart"]';

    // Other Details
    static lblAvailability = '.product-information > :nth-child(6)';
    static lblCondition = '.product-information > :nth-child(7)';
    static lblProductBrand = '.product-information > :nth-child(8)';

    // Write a Review
    static lblReview = '.active > a';
    static txtNameReview = '#name';
    static txtEmailReview = '#email';
    static txtBodyReview = '#review';
    static btnSubmitReview = '#button-review';

    // Alert
    static alertSuccess = '.alert-success > span';

    // Modal Successfully added to cart
    static mdlSuccess = '#cartModal';


    static fillProductReview(name, email, body) {
        // Name field
        cy.get(this.txtNameReview).clear();
        if (name && name.length > 0) {
            cy.get(this.txtNameReview).type(name);
        }

        // Email field
        cy.get(this.txtEmailReview).clear();
        if (email && email.length > 0) {
            cy.get(this.txtEmailReview).type(email);
        }

        // Body field
        cy.get(this.txtBodyReview).clear();
        if (body && body.length > 0) {
            cy.get(this.txtBodyReview).type(body);
        }
        
        // Submit
        cy.get(this.btnSubmitReview).click();
        //this.getAlertSuccess();
    }

    static verifySuccessModalHidden(){
        cy.get(this.mdlSuccess).should('not.be.visible');    
    }

    static getAlertSuccess() {
        cy.get(this.alertSuccess).should('be.visible');
    }

    static inputQuantity(value){
        cy.get(this.inpQuantity).clear().type(value);
    }

    static clickAddToCart(){
        cy.get(this.btnAddToCart).click().wait(400);
    }
}

export default ProductDetailViewPOM;