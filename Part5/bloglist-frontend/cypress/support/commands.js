Cypress.Commands.add('loginUser', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedUser', JSON.stringify(body))
      cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('')
})

Cypress.Commands.add('createUser', ({ user, username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, { user, username, password })
  cy.visit('')
})

Cypress.Commands.add('logoutUser', () => {
  window.localStorage.clear()
})