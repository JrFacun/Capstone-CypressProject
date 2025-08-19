describe('API: Login Endpoint API Tests', () => {

    let users;

    before(() => {
        cy.fixture('user').then((data) => {
            users = data;
        });
    });

    it('POST : should verify login with valid details (200)', () => {
        cy.api({
            method: 'POST',
            url: '/api/verifyLogin',
            form: true,
            body: {
                email: users[0].Email,
                password: users[0].Password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('User exists!');
        });
    });

    it('POST : should return error message when email is missing', () => {
        cy.api({
            method: 'POST',
            url: '/api/verifyLogin',
            form: true,
            failOnStatusCode: false,
            body: {
                password: 'validPassword123' // Email intentionally omitted
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain(
                'Bad request, email or password parameter is missing in POST request.'
            );
        });
    });

    it('POST : should return error message for invalid credentials', () => {
        cy.api({
            method: 'POST',
            url: '/api/verifyLogin',
            form: true,
            failOnStatusCode: false,
            body: {
                email: 'invalid@email.com',
                password: 'wrongPassword'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('User not found!');
        });
    });

    context('API 9 : DELETE should return 405', () => {
        before(() => {
            cy.task('startMockServer');
        });

        after(() => {
            cy.task('stopMockServer');
        });

        it('DELETE : should return 405 method not supported', () => {
            cy.api({
                method: 'DELETE',
                url: 'http://localhost:3001/api/verifyLogin',
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(405);
                expect(response.body).to.contain('This request method is not supported.');
            });
        });
    });

});
