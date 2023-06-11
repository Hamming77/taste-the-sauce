// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

it('logs out', () => {
  // use LoginPage to log the standard user in
  LoginPage.login('standard_user', 'secret_sauce')
  // confirm we are logged in by visiting the inventory page
  // https://on.cypress.io/visit
  cy.visit('/inventory.html')
  // https://on.cypress.io/location
  cy.location('pathname').should('equal', '/inventory.html')
  // open the hamburger menu
  // https://on.cypress.io/contains
  // https://on.cypress.io/click
  cy.contains('button', 'Open Menu').click().wait(500)
  // the menu should appear
  cy.get('.bm-menu-wrap')
    .should('be.visible')
  // in the menu find the "Logout" option and click on it
    .contains('.menu-item', 'Logout')
    .click()
  // we should be transported back to the index page "/"
  cy.location('pathname').should('equal', '/')
  // Confirm that we cannot go to the inventory page again
  // and that the right error message is shown
  // https://on.cypress.io/visit
  cy.visit('/inventory.html')
  // LoginPage.showsError
  LoginPage.showsError('Epic sadface: You can only access \'/inventory.html\' when you are logged in.')
})
