/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Doe',
      username: 'UnkownUser',
      password: 'pass'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('UnkownUser')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('John Doe logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('WrongUser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'UnkownUser', password: 'pass' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#blog_title').type('Cypress Test Blog')
      cy.get('#blog_author').type('Cypress')
      cy.get('#blog_url').type('www.cypress.com')
      cy.contains('submit').click()
      cy.contains('a new blog Cypress Test Blog by Cypress added')
    })

    it('A blog can be liked', function () {
      cy.get('#add-blog_button').click()
      cy.get('#blog_title').type('Cypress Test Blog')
      cy.get('#blog_author').type('Cypress')
      cy.get('#blog_url').type('www.cypress.com')
      cy.contains('submit').click()
      cy.contains('view').click()
      cy.get('.like_button').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#blog_title').type('Cypress Test Blog')
      cy.get('#blog_author').type('Cypress')
      cy.get('#blog_url').type('www.cypress.com')
      cy.contains('submit').click()
      cy.contains('view').click()
      cy.contains('Remove').click()
      cy.contains('Blog Cypress Test Blog by Cypress deleted')
    })

    it('A blog can only be deleted by creator', function () {
      cy.contains('new blog').click()
      cy.get('#blog_title').type('Cypress Test Blog')
      cy.get('#blog_author').type('Cypress')
      cy.get('#blog_url').type('www.cypress.com')
      cy.contains('submit').click()
      cy.contains('Logout').click()
      const user = {
        name: 'Jane Doe',
        username: 'UnkownUser2',
        password: 'pass'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.login({ username: 'UnkownUser2', password: 'pass' })
      cy.contains('view').click()
      cy.contains('Remove').should('not.exist')
    })

    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        const blogs = [{
          title: 'Middle of the pack blog',
          author: 'First creator',
          url: 'https://www.cypress.com',
          likes: 25,
        }, {
          title: 'Least liked blog',
          author: 'Second creator',
          url: 'https://www.cypress.com',
          likes: 10,
        }, {
          title: 'Most liked blog',
          author: 'Last creator',
          url: 'https://www.cypress.com',
          likes: 50,
        }]
        blogs.forEach((blog) => cy.createBlog(blog))
      })

      it('blogs are ordered by the number of likes (highest first)', function () {
        cy.get('.blog_container').eq(0).should('contain', 'Most liked blog')
        cy.get('.blog_container').eq(1).should('contain', 'Middle of the pack blog')
        cy.get('.blog_container').eq(2).should('contain', 'Least liked blog')
      })
    })
  })
})