
describe('Login Test', () => {
  beforeEach(() => {
    cy.fixture('user').then((user) => {
      cy.login(user[0].Email, user[0].Password);
    });
  });

  it('should successfully login using fixture credentials', () => {
    cy.contains('Logged in as').should('contain', 'James Cruz');
  });
});
