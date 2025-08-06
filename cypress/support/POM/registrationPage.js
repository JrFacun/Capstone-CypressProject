
class RegisterPage {
    // Initial signup inputs
    static nameInput = '[data-qa="signup-name"]';
    static emailInput = '[data-qa="signup-email"]';
    static signupButton = '[data-qa="signup-button"]';

    // Gender radios
    static genderMaleRadio = '#id_gender1';
    static genderFemaleRadio = '#id_gender2';

    // Password and DOB
    static passwordInput = '#password';
    static daySelect = '#days';
    static monthSelect = '#months';
    static yearSelect = '#years';

    // Checkboxes
    static newsletterCheckbox = '#newsletter';
    static offersCheckbox = '#optin';

    // Address fields
    static firstNameInput = '#first_name';
    static lastNameInput = '#last_name';
    static companyInput = '#company';
    static address1Input = '#address1';
    static address2Input = '#address2';
    static countrySelect = '#country';
    static stateInput = '#state';
    static cityInput = '#city';
    static zipcodeInput = '#zipcode';
    static mobileNumberInput = '#mobile_number';

    // Buttons
    static createAccountButton = '[data-qa="create-account"]';
    static continueButton = '[data-qa="continue-button"]';

    // Errors
    static emailExistsError = '.signup-form > form > p';

    // Label
    static signupHeader = '.signup-form h2';
    static nameLabel = 'label[for="name"]';
    static emailLabel = 'label[for="email"]';
    static titleLabel = '.login-form h2:contains("Enter Account Information")';
    static passwordLabel = 'label[for="password"]';
    static dobLabel = 'label[for="days"]';
    static firstNameLabel = 'label[for="first_name"]';
    static lastNameLabel = 'label[for="last_name"]';
    static addressLabel = 'label[for="address1"]';
    static mobileLabel = 'label[for="mobile_number"]';

    // Actions
    static clickSignupButton() {
        cy.get(this.signupButton).click();
    }

    static fillInitialSignup(name, email) {
        cy.get(this.nameInput).type(name);
        cy.get(this.emailInput).type(email);
        this.clickSignupButton();
    }

    static fillPersonalInfo(user) {
        if (user.Title === 'Mr.') {
            cy.get(this.genderMaleRadio).check();
        } else {
            cy.get(this.genderFemaleRadio).check();
        }

        cy.get(this.passwordInput).type(user.Password);
        cy.get(this.daySelect).select(user.DateOfBirth.Day);
        cy.get(this.monthSelect).select(user.DateOfBirth.Month);
        cy.get(this.yearSelect).select(user.DateOfBirth.Year);

        if (user.Newsletter) cy.get(this.newsletterCheckbox).check();
        if (user.Offers) cy.get(this.offersCheckbox).check();
    }

    static fillAddress(user) {
        const info = user.AddressInfo;
        cy.get(this.firstNameInput).type(info.FirstName);
        cy.get(this.lastNameInput).type(info.LastName);
        cy.get(this.companyInput).type(info.Company);
        cy.get(this.address1Input).type(info.Address1);
        cy.get(this.address2Input).type(info.Address2);
        cy.get(this.countrySelect).select(info.Country);
        cy.get(this.stateInput).type(info.State);
        cy.get(this.cityInput).type(info.City);
        cy.get(this.zipcodeInput).type(info.Zipcode);
        cy.get(this.mobileNumberInput).type(info.MobileNumber);
    }
}

export default RegisterPage;
