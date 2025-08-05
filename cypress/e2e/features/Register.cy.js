///<reference types="cypress" />
import { generateFakeSignupData } from '../../support/utils/userFaker';




describe('Register Test', { testIsolation: false }, () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
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

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('have.text', 'Congratulations! Your new account has been successfully created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(3)').should('have.text', 'You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible');
        cy.get('[data-qa="continue-button"]').should('be.visible').should('not.be.disabled').click();
        cy.contains('Logged in as').should('contain', user.Name);
        cy.contains('Logout').click();

    })

    it('should verify if user can not register with existing email', () => {

        cy.fixture('user').then((user) => {
            cy.get('[data-qa="signup-name"]').type(user[0].Name);
            cy.get('[data-qa="signup-email"]').type(user[0].Email);
        });

        cy.get('[data-qa="signup-button"]').should('be.visible').click();
        cy.get('.signup-form > form > p').should('have.text', 'Email Address already exist!').and('be.visible');

    })

    it('should verify registration fails with invalid email format (missing @)', () => {

        cy.get('[data-qa="signup-name"]').type('James Cruz');
        cy.get('[data-qa="signup-email"]').type("jamesgmail.com");
        cy.get('[data-qa="signup-button"]').should('be.visible').click();

        // Check if email field is marked as invalid
        cy.get('[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'jamesgmail.com' is missing an '@'.");
        });
    })

    it('should verify registration fails when email contains invalid symbol after @', () => {

        cy.get('[data-qa="signup-name"]').type('James Cruz');
        cy.get('[data-qa="signup-email"]').type("james@#gmail.com");
        cy.get('[data-qa="signup-button"]').should('be.visible').click();

        // Check if email field is marked as invalid
        cy.get('[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq("A part following '@' should not contain the symbol '#'.");
        });
    })

    it('should verify registration fails when email has invalid dot position in domain extension', () => {

        cy.get('[data-qa="signup-name"]').type('James Cruz');
        cy.get('[data-qa="signup-email"]').type("james@domain..com");
        cy.get('[data-qa="signup-button"]').should('be.visible').click();

        // Check if email field is marked as invalid
        cy.get('[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq("'.' is used at a wrong position in 'domain..com'.");
        });
    })

    it('should verify registration fails when name and email fields are empty', () => {

        // Try submitting without filling in fields
        cy.get('[data-qa="signup-button"]').should('be.visible').click();

        // Check if name field is marked as invalid
        cy.get('[data-qa="signup-name"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });

        // You can also check email field
        cy.get('[data-qa="signup-email"]').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });

    it('should verify required fields show "Please fill out this field" validation on extended signup page', () => {
        const user = generateFakeSignupData();
        // Start signup
        cy.get('input[data-qa="signup-name"]').type(user.Name);
        cy.get('input[data-qa="signup-email"]').type(user.Email);
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#password').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#first_name').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#last_name').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#state').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#city').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#zipcode').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('#mobile_number').then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    })



})