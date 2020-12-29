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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login('testie', 'pass')
      cy.addBlog('existing blog', 'someone', 'http')
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog')
        .click()
      cy.get('#title').type('new title')
      cy.get('#author').type('new author')
      cy.get('#url').type('internets')
      cy.get('#new-blog').submit()

      cy.contains('A new blog new title by new author added')
      cy.get('.blog-entry')
        .contains('new title new author')
        .contains('show more')
    })

    it('A blog can be liked', function() {
      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().contains('show more').click()

      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().get('.button-like').click()

      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().contains('likes 1')
    })

    it('A blog can be deleted by the user who added it', function() {
      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().contains('show more').click()

      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().get('.button-remove').click()

      cy.get('.blog-entry')
        .should('not.exist')
    })

    it('A blog can not be deleted by other users', function() {
      cy.createUser('other', 'dude', 'pass')
      cy.login('other', 'pass')
      cy.visit('http://localhost:3000')

      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().contains('show more').click()

      cy.get('.blog-entry')
        .contains('existing blog')
        .parent().get('.button-remove').should('not.exist')
    })
  })
})