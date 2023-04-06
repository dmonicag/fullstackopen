describe('Blog app', function () {
  beforeEach(function (){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.createUser({ user: 'User One', username: 'userone', password: 'One123' })
    cy.createUser({ user: 'User Two', username: 'usertwo', password: 'Two123' })
    cy.visit('')
  })

  it('login page can be opened', function() {
    cy.contains('BlogList App')
    cy.contains('Log in to the application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('userone')
      cy.get('#password').type('One123')
      cy.get('#loginbtn').click()

      cy.contains('Logged in as User One')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('userone')
      cy.get('#password').type('userone123')
      cy.get('#loginbtn').click()

      cy.get('.notification-error')
        .should('contain', 'Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Logged in as User One')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.loginUser({ username:'usertwo', password:'Two123' })
      cy.createBlog({ title:'test1', author:'test1', url:'test1.com' })
      cy.createBlog({ title:'test2', author:'test2', url:'test2.com' })
      cy.createBlog({ title:'test3', author:'test3', url:'test3.com' })
      cy.logoutUser()
    })

    it('A new blog can be created', function() {
      cy.get('#username').type('userone')
      cy.get('#password').type('One123')
      cy.get('#loginbtn').click()
      cy.contains('Add Blog').click()

      cy.get('#title').type('new blog')
      cy.get('#author').type('new author')
      cy.get('#url').type('www.newblog.com')

      cy.get('#add-blog').click()

      cy.get('.notification')
        .should('contain', 'added successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'new blog - new author')
    })

    it('a user can like a blog', function() {
      cy.loginUser({ username:'userone', password:'One123' })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.get('html').should('contain', 'Likes: 1')
    })

    it('only user who created blog can delete it', function() {
      cy.get('#username').type('usertwo')
      cy.get('#password').type('Two123')
      cy.get('#loginbtn').click()

      cy.contains('div.blog', 'test1').find('#view').click()
      cy.get('#delete').click()

      cy.get('html').should('not.contain', 'test1')

      cy.get('.notification')
        .should('contain', 'deleted successfully')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })

    it('only user who created blog can view Remove blog button', function() {
      cy.loginUser({ username:'userone', password:'One123' })

      cy.createBlog({ title:'delete blog', author:'delete blog', url:'deleteblog.com' })

      cy.contains('div.blog', 'test2').find('#view').click()
      cy.get('div.blog').should('not.contain', 'Remove Blog')

      cy.contains('div.blog', 'delete blog').find('#view').click()
      cy.contains('Remove Blog')
    })

    it('blogs are ordered according to number of likes', function() {
      cy.loginUser({ username:'userone', password:'One123' })

      cy.contains('div.blog', 'test1').find('#view').click()
      for(let n = 0; n < 2; n ++){
        cy.contains('div.blog_detail', 'test1').find('#like').click()
        cy.wait(1000)
      }

      cy.contains('div.blog', 'test2').find('#view').click()
      for(let n = 0; n < 4; n ++){
        cy.contains('div.blog_detail', 'test2').find('#like').click()
        cy.wait(1000)
      }

      cy.contains('div.blog', 'test3').find('#view').click()
      for(let n = 0; n < 3; n ++){
        cy.contains('div.blog_detail', 'test3').find('#like').click()
        cy.wait(1000)
      }

      cy.get('div.blog').eq(0).should('contain', 'test2')
      cy.get('div.blog').eq(1).should('contain', 'test3')
    })
  })
})