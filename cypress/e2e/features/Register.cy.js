///<reference types="cypress" />
import { generateFakeSignupData } from '../../support/utils/userFaker';
import RegisterPage from '../../support/POM/registrationPage';

describe('Register Test', { testIsolation: false }, () => {

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should verify user can successfully register', () => {
        const user = generateFakeSignupData();

        RegisterPage.fillInitialSignup(user.Name, user.Email);
        RegisterPage.fillPersonalInfo(user);
        RegisterPage.fillAddress(user);

        cy.get(RegisterPage.createAccountButton).click();

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations');
        cy.get(RegisterPage.continueButton).click();

        cy.contains('Logged in as').should('contain', user.Name);
        cy.contains('Logout').click();
    });

    it('should verify user cannot register with existing email', () => {
        cy.fixture('user').then((user) => {
            RegisterPage.fillInitialSignup(user[0].Name, user[0].Email);
        });

        cy.get(RegisterPage.emailExistsError)
            .should('have.text', 'Email Address already exist!')
            .and('be.visible');
    });

    it('should fail registration with invalid email format (missing @)', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'jamesgmail.com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid symbol after @', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@#gmail.com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid dot in domain', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@domain..com');
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("position");
        });
    });

    it('should fail registration when name and email are empty', () => {
        cy.get(RegisterPage.signupButton).click();

        cy.validateRequiredField(RegisterPage.nameInput);
        cy.validateRequiredField(RegisterPage.emailInput);
    });

    it('should show required field validation on extended registration', () => {
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);

        const requiredFields = [
            RegisterPage.passwordInput,
            RegisterPage.firstNameInput,
            RegisterPage.lastNameInput,
            RegisterPage.stateInput,
            RegisterPage.cityInput,
            RegisterPage.zipcodeInput,
            RegisterPage.mobileNumberInput
        ];

        cy.validateMultipleRequiredFields(requiredFields);
    });

    it('should verify year dropdown includes the current year', () => {
        const user = generateFakeSignupData();

        RegisterPage.fillInitialSignup(user.Name, user.Email);

        const currentYear = new Date().getFullYear().toString();

        cy.get('#years > option').then(($options) => {
            const years = $options.toArray().map(option => option.textContent.trim());

            if (years.includes(currentYear)) {
                cy.log(`✅ Current year (${currentYear}) is correctly present in the dropdown.`);
            } else {
                cy.log(`❌ Current year (${currentYear}) is NOT present in the dropdown.`);
                throw new Error(`Expected year "${currentYear}" was not found in the #years dropdown.`);
            }
        });
    });
    it('should only allow registration if password has 6 or more characters', () => {
        const user = generateFakeSignupData();

        // CASE 1: Test with short password (e.g., 123)
        const shortPassword = '123';

        const shortPassUser = {
            ...user,
            Password: shortPassword,
        };

        RegisterPage.fillInitialSignup(shortPassUser.Name, shortPassUser.Email);

        // Fill form with short password
        cy.get(RegisterPage.passwordInput).type(shortPassUser.Password);
        cy.get(RegisterPage.firstNameInput).type(user.AddressInfo.FirstName);
        cy.get(RegisterPage.lastNameInput).type(user.AddressInfo.LastName);
        cy.get(RegisterPage.address1Input).type(user.AddressInfo.Address1);
        cy.get(RegisterPage.countrySelect).select(user.AddressInfo.Country);
        cy.get(RegisterPage.stateInput).type(user.AddressInfo.State);
        cy.get(RegisterPage.cityInput).type(user.AddressInfo.City);
        cy.get(RegisterPage.zipcodeInput).type(user.AddressInfo.Zipcode);
        cy.get(RegisterPage.mobileNumberInput).type(user.AddressInfo.MobileNumber);

        // Click create account
        cy.get(RegisterPage.createAccountButton).click();

        // Assert that it should NOT continue to account created page
        cy.contains('Account Created!').then(($el) => {
            if ($el.length) {
                throw new Error(`❌ Registration accepted with short password "${shortPassword}" — this should be rejected.`);
            } else {
                cy.log('✅ Registration was blocked as expected with short password.');
            }
        });

        // CASE 2: Retry with a valid password (6+ characters)
        const validPasswordUser = generateFakeSignupData();
        RegisterPage.fillInitialSignup(validPasswordUser.Name, validPasswordUser.Email);

        RegisterPage.fillPersonalInfo(validPasswordUser);
        RegisterPage.fillAddress(validPasswordUser);

        cy.get(RegisterPage.createAccountButton).click();

        // Validate success
        cy.contains('Account Created!').should('be.visible');
        cy.get(RegisterPage.continueButton).click();
        cy.contains('Logged in as').should('contain', validPasswordUser.Name);
        cy.contains('Logout').click();
    });


    it('should verify complete registration UI: labels, inputs, checkboxes, buttons', () => {
        // Step 1: Initial page
        cy.verifyTextExists('New User Signup!');

        // Step 2: Go to registration form
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);

        // Step 3: Header
        cy.verifyTextExists('Enter Account Information');

        // Step 4: Label assertions
        const expectedLabels = [
            'Title',
            'Password *',
            'Date of Birth',
            'First name *',
            'Last name *',
            'Company',
            'Address * (Street address, P.O. Box, Company name, etc.)',
            'Address 2',
            'Country *',
            'State *',
            'City *',
            'Zipcode *',
            'Mobile Number *'
        ];

        expectedLabels.forEach(label => cy.verifyLabelExists(label));

        // Step 5: Inputs, dropdowns, radios, checkboxes
        const fieldsToCheck = [
            RegisterPage.passwordInput,
            RegisterPage.firstNameInput,
            RegisterPage.lastNameInput,
            RegisterPage.companyInput,
            RegisterPage.address1Input,
            RegisterPage.address2Input,
            RegisterPage.countrySelect,
            RegisterPage.stateInput,
            RegisterPage.cityInput,
            RegisterPage.zipcodeInput,
            RegisterPage.mobileNumberInput,
            '#days',
            '#months',
            '#years'
        ];

        cy.verifyInputsAreEnabled(fieldsToCheck);

        // Step 6: Title radio buttons
        cy.get(RegisterPage.genderMaleRadio).should('exist').should('be.visible');
        cy.get(RegisterPage.genderFemaleRadio).should('exist').should('be.visible');

        // Step 7: Checkboxes
        cy.get(RegisterPage.newsletterCheckbox).should('exist').should('be.visible').should('not.be.disabled');
        cy.get(RegisterPage.offersCheckbox).should('exist').should('be.visible').should('not.be.disabled');

        // Step 8: Button
        cy.get(RegisterPage.createAccountButton)
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled');

        cy.log('✅ All form elements are present and functional');
    });


});
