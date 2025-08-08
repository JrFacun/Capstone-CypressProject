
describe('API: /verifyLogin Endpoint Tests', () => {
    const baseUrl = 'https://automationexercise.com/api/verifyLogin';

    let users;

    before(() => {
        cy.fixture('user').then((data) => {
            users = data;
        });
    });

    it.only('POST: should verify login with valid details (200)', () => {
        cy.request({
            method: 'POST',
            url: baseUrl,
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

    it('POST: should return 400 when email is missing', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            form: true,
            failOnStatusCode: false,
            body: {
                password: users[0].Password
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.contain('Bad request, email or password parameter is missing in POST request.');
        });
    });

    it('POST: should return 404 for invalid credentials', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            form: true,
            failOnStatusCode: false,
            body: {
                email: 'wronguser@example.com',
                password: 'wrongpass'
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.contain('User not found!');
        });
    });
});
