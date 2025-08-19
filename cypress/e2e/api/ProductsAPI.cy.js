describe('API: /api/productsList', () => {

    it('GET : All Products List (200)', () => {
        cy.api({
            method: 'GET',
            url: '/api/productsList',
            form: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.log(response.body);

            const body = JSON.parse(response.body);
            expect(body.responseCode).to.eq(200)
        });
    });

    it('POST : All Products List (405)', () => {
        cy.api({
            method: 'POST',
            url: '/api/productsList',
            form: true,
            body: []
        }).then((response) => {
            //expect(response.status).to.eq(200);
            cy.log(response.body);

            const body = JSON.parse(response.body);
            expect(body.responseCode).to.eq(405)
        });
    });

    it('PUT : All Products List (405)', () => {
        cy.api({
            method: 'PUT',
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
            //expect(response.status).to.eq(200);
            cy.log(response.body);

            const body = JSON.parse(response.body);
            expect(body.responseCode).to.eq(405)
        });
    });

    it('DELETE : All Products List (405)', () => {
        cy.api({
            method: 'DELETE',
            url: '/api/productsList',
            form: true,
            body: {
                "id": 1
            }
        }).then((response) => {
            //expect(response.status).to.eq(200);
            cy.log(response.body);

            const body = JSON.parse(response.body);
            expect(body.responseCode).to.eq(405)
        });
    });

})

describe('API: /api/brandsList', () => {

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

    it('POST : Post in All Brands List (200)', () => {
        cy.api({
            method: 'POST',
            url: '/api/brandsList',
            form: true
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
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
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
        });
    });

    it('DELETE : DELETE To All Brand List (error 405)', () => {
        cy.api({
            method: 'DELETE',
            url: '/api/brandsList',
            form: true,
            body: {
                "id": 1
            }
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
        });
    });
})



describe('API: /api/searchProduct', () => {

    let searchProduct = "Tshirt";

    it('GET : GET To Search Product (200)', () => {
        cy.api({
            method: 'GET',
            url: '/api/searchProduct',
            form: true,
            body: {
                search_product: searchProduct
            }
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
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

    it('POST : POST To Search Product (400)', () => {
        cy.api({
            method: 'POST',
            url: '/api/searchProduct',
            form: true
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(400)
            cy.log(body)
        });
    });

    it('PUT : PUT To Search Product (405)', () => {
        cy.api({
            method: 'PUT',
            url: '/api/searchProduct',
            form: true,
            body: {
                search_product: searchProduct
            }
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
        });
    });

    it('DELETE : DELETE To Search Product (405)', () => {
        cy.api({
            method: 'DELETE',
            url: '/api/searchProduct',
            form: true,
            body: {
                search_product: searchProduct
            }
        }).then((response) => {
            //expect(response.status).to.eq(200);
            const body = JSON.parse(response.body);

            expect(body.responseCode).to.eq(405)
            cy.log(body)
        });
    });
});

