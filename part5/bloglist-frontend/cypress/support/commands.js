// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (username, name, password) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username, name, password
  })
})

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/login',
    body: { username, password }
  }).then(response => {
    // expect(response).property('status').to.equal(200)
    window.localStorage.setItem('user', JSON.stringify(response.body))
  })
})

Cypress.Commands.add('addBlog', (title, author, url) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url },
    headers: { 'Authorization': 'bearer ' + user.token },
  })
})

Cypress.Commands.add('addBlogWithLikes', (title, author, url, likes) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url, likes },
    headers: { 'Authorization': 'bearer ' + user.token },
  })
})