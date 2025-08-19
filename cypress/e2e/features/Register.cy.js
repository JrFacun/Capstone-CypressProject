///<reference types="cypress" />
import { generateFakeSignupData } from '../../support/utils/userFaker';
import RegisterPage from '../../support/POM/registrationPage';

let testCaseTitle;

describe('Register Test - Passed Test Case', { testIsolation: false }, () => {

    beforeEach(function () {
        testCaseTitle = this.currentTest.title;
    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should verify user can successfully register', () => {
        const user = generateFakeSignupData();

        cy.snapshot("Successful Registration - Initial Signup Form");
        RegisterPage.fillInitialSignup(user.Name, user.Email);
        RegisterPage.fillPersonalInfo(user);
        RegisterPage.fillAddress(user);
        cy.snapshot("Successful Registration - Fill In Information");

        cy.get(RegisterPage.createAccountButton).click();

        cy.get('b').should('have.text', 'Account Created!').should('be.visible');
        cy.get('.col-sm-9 > :nth-child(2)').should('contain.text', 'Congratulations');
        cy.snapshot("Successful Registration - Validation for Submitted Account");

        cy.get(RegisterPage.continueButton).click();
        cy.contains('Logged in as').should('contain', user.Name);
        cy.snapshot("Successful Registration - Logged In View");
        cy.contains('Logout').click();
    });

    it('should verify user cannot register with existing email', () => {
        cy.fixture('user').then((user) => {
            RegisterPage.fillInitialSignup(user[0].Name, user[0].Email);
        });

        cy.snapshot("Register with Existing Email - After Submit");
        cy.get(RegisterPage.emailExistsError)
            .should('have.text', 'Email Address already exist!')
            .and('be.visible');
        cy.snapshot("Register with Existing Email - Prompt Successfully");
    });

    it('should fail registration with invalid email format (missing @)', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'jamesgmail.com');
        cy.snapshot("Invalid Email Format - Missing @");
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid symbol after @', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@#gmail.com');
        cy.snapshot("Invalid Email Format - Symbol After @");
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("@");
        });
    });

    it('should fail registration with invalid dot in domain', () => {
        RegisterPage.fillInitialSignup('James Cruz', 'james@domain..com');
        cy.snapshot("Invalid Email Format - Double Dot in Domain");
        cy.get(RegisterPage.emailInput).then(($input) => {
            expect($input[0].checkValidity()).to.be.false;
            expect($input[0].validationMessage).to.include("position");
        });
    });

    it('should fail registration when name and email are empty', () => {
        cy.get(RegisterPage.signupButton).click();
        cy.snapshot("Empty Name and Email Validation");

        cy.validateRequiredField(RegisterPage.nameInput);
        cy.validateRequiredField(RegisterPage.emailInput);
    });

    it('should show required field validation on extended registration', () => {
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);
        cy.snapshot("Extended Registration - Missing Required Fields");

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

    it('should verify complete registration UI: labels, inputs, checkboxes, buttons', () => {
        cy.verifyTextExists('New User Signup!');
        cy.snapshot("UI Verification - Signup Page");

        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);
        cy.verifyTextExists('Enter Account Information');
        cy.snapshot("UI Verification - Account Information Page");

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

        cy.get(RegisterPage.genderMaleRadio).should('exist').should('be.visible');
        cy.get(RegisterPage.genderFemaleRadio).should('exist').should('be.visible');
        cy.get(RegisterPage.newsletterCheckbox).should('exist').should('be.visible').should('not.be.disabled');
        cy.get(RegisterPage.offersCheckbox).should('exist').should('be.visible').should('not.be.disabled');
        cy.get(RegisterPage.createAccountButton).should('exist').should('be.visible').should('not.be.disabled');

        cy.snapshot("UI Verification - All Elements Present");
        cy.log('✅ All form elements are present and functional');
    });

});

context('Register Test : Failed Test Case', () => {

      beforeEach(function () {
        testCaseTitle = this.currentTest.title;
    });

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
    });

    it('should verify year dropdown includes the current year', () => {
        const user = generateFakeSignupData();
        RegisterPage.fillInitialSignup(user.Name, user.Email);
        cy.snapshot("Year Dropdown Check - Before Validation");

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

    it('Verify that the Zip Code field rejects invalid input', () => {
        const user = generateFakeSignupData();

        // Invalid Zip Code
        const invalidZip = 'abchd@#';
        const invalidZipUser = { ...user, AddressInfo: { ...user.AddressInfo, Zipcode: invalidZip } };

        // Step 1: Fill initial signup
        RegisterPage.fillInitialSignup(invalidZipUser.Name, invalidZipUser.Email);
        cy.snapshot("Invalid ZipCode - Before Submit");

        // Step 2: Fill account details
        cy.get(RegisterPage.passwordInput).type(user.Password);
        cy.get(RegisterPage.firstNameInput).type(user.AddressInfo.FirstName);
        cy.get(RegisterPage.lastNameInput).type(user.AddressInfo.LastName);
        cy.get(RegisterPage.address1Input).type(user.AddressInfo.Address1);
        cy.get(RegisterPage.countrySelect).select(user.AddressInfo.Country);
        cy.get(RegisterPage.stateInput).type(user.AddressInfo.State);
        cy.get(RegisterPage.cityInput).type(user.AddressInfo.City);
        cy.get(RegisterPage.zipcodeInput).type(invalidZip);   // ✅ use invalid string directly
        cy.get(RegisterPage.mobileNumberInput).type(user.AddressInfo.MobileNumber);

        // Step 3: Submit form
        cy.get(RegisterPage.createAccountButton).click();
        cy.snapshot("Invalid ZipCode - After Submit");

        // Step 4: Assert that registration is rejected
        cy.contains('Account Created!').then(($el) => {
            if ($el.length) {
                throw new Error(`❌ Registration accepted with invalid Zip Code "${invalidZip}" — this should be rejected.`);
            } else {
                cy.log('✅ Registration was blocked as expected with invalid Zip Code.');
            }
        });
    });

    it('Verify that the Mobile Number field rejects invalid input', () => {
        const user = generateFakeSignupData();

        // Invalid Mobile Number
        const invalidNumber = '#3439 2210';
        const invalidPhoneUser = {
            ...user,
            AddressInfo: { ...user.AddressInfo, MobileNumber: invalidNumber }
        };

        // Step 1: Fill initial signup
        RegisterPage.fillInitialSignup(invalidPhoneUser.Name, invalidPhoneUser.Email);
        cy.snapshot("Invalid Mobile Number - Before Submit");

        // Step 2: Fill account details
        cy.get(RegisterPage.passwordInput).type(user.Password);
        cy.get(RegisterPage.firstNameInput).type(user.AddressInfo.FirstName);
        cy.get(RegisterPage.lastNameInput).type(user.AddressInfo.LastName);
        cy.get(RegisterPage.address1Input).type(user.AddressInfo.Address1);
        cy.get(RegisterPage.countrySelect).select(user.AddressInfo.Country);
        cy.get(RegisterPage.stateInput).type(user.AddressInfo.State);
        cy.get(RegisterPage.cityInput).type(user.AddressInfo.City);
        cy.get(RegisterPage.zipcodeInput).type(user.AddressInfo.Zipcode);
        cy.get(RegisterPage.mobileNumberInput).type(invalidNumber);   // ✅ invalid mobile number

        // Step 3: Submit form
        cy.get(RegisterPage.createAccountButton).click();
        cy.snapshot("Invalid Mobile Number - After Submit");

        // Step 4: Assert that registration is rejected
        cy.contains('Account Created!').then(($el) => {
            if ($el.length) {
                throw new Error(`❌ Registration accepted with invalid Mobile Number "${invalidNumber}" — this should be rejected.`);
            } else {
                cy.log('✅ Registration was blocked as expected with invalid Mobile Number.');
            }
        });
    });

    it('should only allow registration if password has 6 or more characters', () => {
        const user = generateFakeSignupData();

        // CASE 1: Short password
        const shortPassword = '123';
        const shortPassUser = { ...user, Password: shortPassword };
        RegisterPage.fillInitialSignup(shortPassUser.Name, shortPassUser.Email);
        cy.snapshot("Short Password - Before Submit");

        cy.get(RegisterPage.passwordInput).type(shortPassUser.Password);
        cy.get(RegisterPage.firstNameInput).type(user.AddressInfo.FirstName);
        cy.get(RegisterPage.lastNameInput).type(user.AddressInfo.LastName);
        cy.get(RegisterPage.address1Input).type(user.AddressInfo.Address1);
        cy.get(RegisterPage.countrySelect).select(user.AddressInfo.Country);
        cy.get(RegisterPage.stateInput).type(user.AddressInfo.State);
        cy.get(RegisterPage.cityInput).type(user.AddressInfo.City);
        cy.get(RegisterPage.zipcodeInput).type(user.AddressInfo.Zipcode);
        cy.get(RegisterPage.mobileNumberInput).type(user.AddressInfo.MobileNumber);

        cy.get(RegisterPage.createAccountButton).click();
        cy.snapshot("Short Password - After Submit");

        cy.contains('Account Created!').then(($el) => {
            if ($el.length) {
                throw new Error(`❌ Registration accepted with short password "${shortPassword}" — this should be rejected.`);
            } else {
                cy.log('✅ Registration was blocked as expected with short password.');
            }
        });

        // CASE 2: Valid password
        const validPasswordUser = generateFakeSignupData();
        RegisterPage.fillInitialSignup(validPasswordUser.Name, validPasswordUser.Email);
        RegisterPage.fillPersonalInfo(validPasswordUser);
        RegisterPage.fillAddress(validPasswordUser);
        cy.snapshot("Valid Password - Before Submit");

        cy.get(RegisterPage.createAccountButton).click();
        cy.contains('Account Created!').should('be.visible');
        cy.snapshot("Valid Password - Account Created");

        cy.get(RegisterPage.continueButton).click();
        cy.contains('Logged in as').should('contain', validPasswordUser.Name);
        cy.contains('Logout').click();
    });

    it('should only allow registration if password is between 6 to 30 characters', () => {
        const user = generateFakeSignupData();

        // CASE 1: Invalid - Too Long Password (>30 chars)
        const longPassword = '1234512345123451234512345123451'; // >31
        const longPassUser = { ...user, Password: longPassword };

        RegisterPage.fillInitialSignup(longPassUser.Name, longPassUser.Email);
        cy.snapshot("Long Password - Before Submit");

        cy.get(RegisterPage.passwordInput).type(longPassUser.Password);
        cy.get(RegisterPage.firstNameInput).type(user.AddressInfo.FirstName);
        cy.get(RegisterPage.lastNameInput).type(user.AddressInfo.LastName);
        cy.get(RegisterPage.address1Input).type(user.AddressInfo.Address1);
        cy.get(RegisterPage.countrySelect).select(user.AddressInfo.Country);
        cy.get(RegisterPage.stateInput).type(user.AddressInfo.State);
        cy.get(RegisterPage.cityInput).type(user.AddressInfo.City);
        cy.get(RegisterPage.zipcodeInput).type(user.AddressInfo.Zipcode);
        cy.get(RegisterPage.mobileNumberInput).type(user.AddressInfo.MobileNumber);

        cy.get(RegisterPage.createAccountButton).click();
        cy.snapshot("Long Password - After Submit");

        cy.contains('Account Created!').then(($el) => {
            if ($el.length) {
                throw new Error(`❌ Registration accepted with LONG password "${longPassword.length}" chars — should be rejected.`);
            } else {
                cy.log('✅ Registration was blocked as expected with LONG password.');
            }
        });

        // CASE 2: Valid Password (between 6–30 chars)
        const validPasswordUser = generateFakeSignupData();
        validPasswordUser.Password = 'validPass123'; // ✅ 11 chars

        RegisterPage.fillInitialSignup(validPasswordUser.Name, validPasswordUser.Email);
        RegisterPage.fillPersonalInfo(validPasswordUser);
        RegisterPage.fillAddress(validPasswordUser);
        cy.snapshot("Valid Password - Before Submit");

        cy.get(RegisterPage.createAccountButton).click();
        cy.contains('Account Created!').should('be.visible');
        cy.snapshot("Valid Password - Account Created");

        cy.get(RegisterPage.continueButton).click();
        cy.contains('Logged in as').should('contain', validPasswordUser.Name);
        cy.contains('Logout').click();
    });

});

