describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser('testie', 'mctestface', 'pass')
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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testie')
      cy.get('#password').type('pass')
      cy.get('[type=submit]:first').click()
      cy.contains('mctestface logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('testie')
      cy.get('#password').type('deny')
      cy.get('[type=submit]:first').click()
      cy.contains('Invalid username or password')
        .should('have.css', 'borderColor', 'rgb(255, 0, 0)')
    })
  })
})