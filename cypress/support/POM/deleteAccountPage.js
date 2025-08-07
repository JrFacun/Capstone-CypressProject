class DeleteAccountPage {
    clickDeleteAccount() {
        cy.contains('Delete Account').click();
    }

    clickContinue() {
        cy.contains('Continue').click();
    }
}

export const deleteAccountPage = new DeleteAccountPage();
