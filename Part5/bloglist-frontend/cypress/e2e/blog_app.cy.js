describe('Blog app', function () {
  beforeEach(function (){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      user: 'Helen Hema',
      username: 'helen',
      password: 'Hema123' }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('BlogList App')
    cy.contains('Log in to the application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('helen')
      cy.get('#password').type('Hema123')
      cy.get('#loginbtn').click()

      cy.contains('Logged in as Helen Hema')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('helen')
      cy.get('#password').type('hema')
      cy.get('#loginbtn').click()

      cy.get('.notification-error')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Logged in as Helen Hema')
    })
  })
})