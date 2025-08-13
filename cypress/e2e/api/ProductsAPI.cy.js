describe('API: Products API endpoints test', () => {

    let searchProduct = "Tshirt";

    it('GET : All Products List (200)', () => {
        cy.api({
            method: 'GET',
            url: '/api/productsList',
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        });
    });

    it('POST : POST To All Products List (error 405)', () => {
        cy.api({
            method: 'POST',
            url: '/api/productsList',
            form: true,
            body: {
                "id": 1,
                "name": "Blueee Top",
                "price": "Rs. 500",
                "brand": "Polo",
                "category": {
                    "usertype": {
                        "usertype":
                            "Women"
                    },
                    "category":
                        "Tops"
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain(
                "This request method is not supported."
            );
        });
    });

    it('GET : Get All Brands List (200)', () => {
        cy.api({
            method: 'GET',
            url: '/api/brandsList',
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        });
    });

    it('PUT : PUT To All Brand List (error 405)', () => {
        cy.api({
            method: 'PUT',
            url: '/api/brandsList',
            form: true,
            body: {
                "id": 1,
                "name": "Blueee Top",
                "price": "Rs. 500",
                "brand": "Polo",
                "category": {
                    "usertype": {
                        "usertype":
                            "Women"
                    },
                    "category":
                        "Tops"
                }
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain(
                "This request method is not supported."
            );
            expect(response.body).to.contain(405);
        });
    });

    it('POST : POST To Search Product (200)', () => {
        cy.api({
            method: 'POST',
            url: '/api/searchProduct',
            form: true,
            body: {
                search_product: searchProduct
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);
        });
    });

    it('POST : POST To Search Product without search_product parameter (400)', () => {
        cy.api({
            method: 'POST',
            url: '/api/searchProduct',
            form: true,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain(
                "Bad request, search_product parameter is missing in POST request."
            );
            expect(response.body).to.contain(400)
            cy.log(response.body);
        });
    });
});