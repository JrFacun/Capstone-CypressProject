///<reference types="cypress" />
import { generateFakeSignupData } from '../../support/utils/userFaker';


describe('Register Test', { testIsolation: false }, () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    })

    it('should verify user can successfully register', () => {
        const user = generateFakeSignupData();


        // Start signup
        cy.get('input[data-qa="signup-name"]').type(user.Name);
        cy.get('input[data-qa="signup-email"]').type(user.Email);
        cy.get('button[data-qa="signup-button"]').click();

        // Title
        if (user.Title === 'Mr.') {
            cy.get('#id_gender1').check();
        } else {
            cy.get('#id_gender2').check();
        }
        // Password and DOB
        cy.get('#password').type(user.Password);
        cy.get('#days').select(user.DateOfBirth.Day);
        cy.get('#months').select(user.DateOfBirth.Month);
        cy.get('#years').select(user.DateOfBirth.Year);

        if (user.Newsletter) cy.get('#newsletter').check();
        if (user.Offers) cy.get('#optin').check();

        // Address
        cy.get('#first_name').type(user.AddressInfo.FirstName);
        cy.get('#last_name').type(user.AddressInfo.LastName);
        cy.get('#company').type(user.AddressInfo.Company);
        cy.get('#address1').type(user.AddressInfo.Address1);
        cy.get('#address2').type(user.AddressInfo.Address2);
        cy.get('#country').select(user.AddressInfo.Country);
        cy.get('#state').type(user.AddressInfo.State);
        cy.get('#city').type(user.AddressInfo.City);
        cy.get('#zipcode').type(user.AddressInfo.Zipcode);
        cy.get('#mobile_number').type(user.AddressInfo.MobileNumber);

        cy.get('button[data-qa="create-account"]').click();

        cy.contains('ACCOUNT CREATED!').should('be.visible');
    })

})