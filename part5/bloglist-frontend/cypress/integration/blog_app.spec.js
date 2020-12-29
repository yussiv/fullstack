describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('front page shows login form', function() {
    cy.contains('Login')
    cy.get('#username')
      .should('match', 'input')
    cy.get('[type=password]:first')
      .should('have.id', 'password')
    cy.get('[type=submit]:first')
      .should('contain', 'Login')
  })
})