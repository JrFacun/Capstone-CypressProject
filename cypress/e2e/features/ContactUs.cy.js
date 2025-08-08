import LoginPage from '../../support/POM/loginPage';
import contactUs from '../../support/POM/contactUsPOM';

const contactUsPage = new contactUs;
let testCaseTitle;

describe("Contact Us Test Cases", () => {
    beforeEach(function () {
        testCaseTitle = this.currentTest.title;
    });
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
        cy.fixture('user').then((user) => {
            LoginPage.login(user[0].Email, user[0].Password);
            cy.wait(500)
            cy.visit('https://www.automationexercise.com/contact_us');
        });
    });

    it("Contact Us UI Check", () => {
        const expectedHeader = [
            'Contact Us',
            'Get In Touch',
            'Feedback For Us'
        ];
        expectedHeader.forEach(header => cy.verifyTextExists(header));
        const expectedPlaceholderText = [
            'Name',
            'Email',
            'Subject',
            'Your Message Here'
        ];
        expectedPlaceholderText.forEach(placeholder => cy.verifyPlaceholderText(placeholder));

        const fieldsToCheck = [
            contactUsPage.nameText,
            contactUsPage.emailText,
            contactUsPage.subjectText,
            contactUsPage.messageText
        ];
        cy.verifyInputsAreEnabled(fieldsToCheck);
        const verifyButtons = [
            contactUsPage.uploadButton,
            contactUsPage.submitButton
        ]
        verifyButtons.forEach(buttons => cy.verifyButton(buttons));

        const fileName = contactUsPage.pngFileName;
        cy.get(contactUsPage.uploadButton).attachFile(fileName);

        cy.get(contactUsPage.submitButton).click();
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm(user[0].Name, user[0].Email, user[0].Subject, user[0].Message);
        })
        cy.get(contactUsPage.successMessage).should('contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.homeButton).should('exist');
        cy.get(contactUsPage.homeButton).click();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    });

    it("User is able to upload a text file and submit the feedback", () => {
        const fileName = contactUsPage.txtFileName;
        cy.get(contactUsPage.uploadButton).attachFile(fileName);

        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm(user[0].Name, user[0].Email, user[0].Subject, user[0].Message);
        })
        cy.get(contactUsPage.successMessage).should('contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.homeButton).should('exist');
        cy.get(contactUsPage.homeButton).click();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    });

    it("User is able to upload a jpg file and submit the feedback", () => {
        const fileName = contactUsPage.jpgFileName;
        cy.get(contactUsPage.uploadButton).attachFile(fileName);

        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm(user[0].Name, user[0].Email, user[0].Subject, user[0].Message);
        })
        cy.get(contactUsPage.successMessage).should('contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.homeButton).should('exist');
        cy.get(contactUsPage.homeButton).click();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    });

    it("User is able to submit the feedback without an attached file", () => {
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm(user[0].Name, user[0].Email, user[0].Subject, user[0].Message);
        })
        cy.get(contactUsPage.successMessage).should('contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.homeButton).should('exist');
        cy.get(contactUsPage.homeButton).click();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    });

    it("User is not able to submit feedback when only the name is populated", () => {
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm(user[0].Name, "", "", "");
        })
        const fields = [contactUsPage.emailText, contactUsPage.subjectText, contactUsPage.messageText];
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');

    });


    it("User is not able to submit feedback when only the email is populated", () => {
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm("", user[0].Email, "",);
        })
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');

    });

    it("User is not able to submit feedback when only the subject is populated", () => {
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm("", "", user[0].Subject, "");
        })
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');

    });

    it("User is not able to submit feedback when only the message body is populated", () => {
        cy.fixture('contactUs').then((user) => {
            contactUsPage.fillUpForm("", "", "", user[0].Message);
        })
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');

    });

    it("User is not able to submit feedback when only the upload file is populated", () => {
        const fileName = contactUsPage.txtFileName;
        cy.get(contactUsPage.uploadButton).attachFile(fileName);
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');
    });

    it("User is not able to submit feedback when the uploaded file type is not valid", () => {
        const fileName = contactUsPage.pptxFileName;
        cy.get(contactUsPage.uploadButton).attachFile(fileName);
        cy.get(contactUsPage.successMessage).should('not.contain', 'Success! Your details have been submitted successfully.');
        cy.get(contactUsPage.successMessage).should('not.be.visible');
        cy.get(contactUsPage.homeButton).should('not.exist');
    });

    



})