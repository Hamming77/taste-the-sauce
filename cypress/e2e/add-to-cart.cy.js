// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

describe('Cart',{viewportHeight: 1200}, () => {
  // create a small type on the fly using jsdoc comment
  // just to help type check help us
  /** @type {{username: string, password: string}} */
  const user = Cypress.env('users').standard
  // we can even check if the user object is valid
  if (!user) {
    throw new Error('Missing the standard user')
  }

  // before each test, quickly login the user
  // or restore the previous user session
  beforeEach(() => {
    LoginPage.login(user.username, user.password)
    cy.visit('/inventory.html')
    cy.location('pathname').should('equal', '/inventory.html')
  })

  it('adds items to the cart', () => {
    // confirm the cart badge does not exist at first
    cy.get('.shopping_cart_link').find('.shopping_cart_badge').should('not.exist')
    // add the item "Sauce Labs Bike Light" to the cart
    // by clicking the button "Add to cart"
    // the button should switch to "Remove"
    cy.contains('.inventory_item','Sauce Labs Bike Light').within(() => {
      cy.contains('button', 'Add to cart').click()
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    // the shopping cart link should have number 1
    // tip: use https://on.cypress.io/scrollintoview command
    // to bring the shopping cart element into the viewport
    cy.get('.shopping_cart_link').find('.shopping_cart_badge')
      .scrollIntoView()
      .should('have.text', '1')
    // add the item "Sauce Labs Bolt T-Shirt" to the cart
    // by clicking the button "Add to cart"
    // the button should switch to "Remove"
    cy.contains('.inventory_item','Sauce Labs Bolt T-Shirt').within(() => {
      cy.contains('button', 'Add to cart').click()
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    // the shopping cart link should have number 2
    // tip: use https://on.cypress.io/scrollintoview command
    // to bring the shopping cart element into the viewport
    cy.get('.shopping_cart_link').find('.shopping_cart_badge').should('have.text', '2')
    // there should be two buttons with text "Remove"
    // on the inventory page
    // https://glebbahmutov.com/cypress-examples/#querying
    cy.get('button:contains("Remove")').should('have.length', 2)
    //also with a class:
    cy.get('.inventory_item:contains("Remove")').should('have.length', 2)
  })
})
