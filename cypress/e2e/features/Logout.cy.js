import LoginPage from '../../support/POM/loginPage';
import LogOutPOM from '../../support/POM/logOutPOM';
const module = new LogOutPOM;
let testCaseTitle;
describe('Logout Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
        
    });
   beforeEach(function() {
    testCaseTitle = this.currentTest.title;
    }); 

    it('User is successfully logged out', () => {
        cy.fixture('user').then((user) => {
            LoginPage.login(user[0].Email, user[0].Password);
            LoginPage.verifyLoginSuccess('James Cruz');
        cy.snapshot(testCaseTitle);
        cy.get(module.loggedInAsLabel).should('be.visible').and('contain','Logged in as');
        cy.get(module.logoutLink).should('be.visible').click();
        cy.snapshot(testCaseTitle);
        });
    });
});
