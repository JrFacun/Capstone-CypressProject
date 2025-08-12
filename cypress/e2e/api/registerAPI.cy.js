describe('API: Create, Get, Update & Delete User Account', () => {

    const testEmail = `testuser_${Date.now()}@example.com`;
    const testPassword = 'password123';

    // Reusable request bodies
    const createUserBody = {
        name: 'John Tester',
        email: testEmail,
        password: testPassword,
        title: 'Mr',
        birth_date: '01',
        birth_month: 'January',
        birth_year: '1990',
        firstname: 'John',
        lastname: 'Tester',
        company: 'Test Corp',
        address1: '123 Main Street',
        address2: 'Apt 4B',
        country: 'United States',
        zipcode: '12345',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
    };

    const updateUserBody = {
        ...createUserBody, // copy all fields from create body
        name: 'John Updated',
        birth_date: '15',
        birth_month: 'February',
        birth_year: '1995',
        firstname: 'Johnny',
        lastname: 'Updated',
        company: 'Updated Corp',
        address1: '456 Updated Street',
        address2: 'Suite 99',
        zipcode: '54321',
        state: 'Nevada',
        city: 'Las Vegas',
        mobile_number: '9876543210'
    };

    const deleteUserBody = {
        email: testEmail,
        password: testPassword
    };

    it('POST : should create/register a new user account (201)', () => {
        cy.api({
            method: 'POST',
            url: '/api/createAccount',
            form: true,
            body: createUserBody
        }).then((response) => {
            expect([200, 201]).to.include(response.status);
            expect(response.body).to.contain('User created!');
        });
    });

    it('GET : should fetch user account detail by email (200)', () => {
        cy.api({
            method: 'GET',
            url: '/api/getUserDetailByEmail',
            qs: { email: testEmail }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain(testEmail);
        });
    });

    it('PUT : should update the user account (200)', () => {
        cy.api({
            method: 'PUT',
            url: '/api/updateAccount',
            form: true,
            body: updateUserBody
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('User updated!');
        });
    });

    it('DELETE : should delete the user account (200)', () => {
        cy.api({
            method: 'DELETE',
            url: '/api/deleteAccount',
            form: true,
            body: deleteUserBody
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.contain('Account deleted!');
        });
    });

});
