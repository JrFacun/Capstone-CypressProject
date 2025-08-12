describe('API Test - Expect 405 with specific error message', () => {
      const baseUrl = 'https://automationexercise.com/api/verifyLogin';

    it('POST: should verify login with valid details (200)', () => {
        cy.request({
            method: 'POST',
            url: baseUrl,
            form: true,
            body: {
                email: validCredentials.email,
                password: validCredentials.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('User exists!');
        });
    });

});
