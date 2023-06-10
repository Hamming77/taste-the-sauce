// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { loginPage } from "./login.page"

it('shows a login error', () => {
  cy.visit('/')
  loginPage.getUsername().type('locked_out_user')
  loginPage.getPassword().type('secret_sauce')
  // initially there should be no errors
  // Tip: code this section after finishing checking the errors
  loginPage.noErrors()
  // click on the login button
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click()
  // confirm the page shows errors and stays on login URL
  cy.log('**shows errors**')
  loginPage.getError()
    .should('be.visible')
    .should('include.text', 'locked out')
  loginPage.getUsername().should('have.class', 'error')
  loginPage.getPassword().should('have.class', 'error')
  cy.location('pathname').should('equal', '/')
  loginPage.getError().find('button.error-button').wait(1000).click()
  // confirm there is an error message
  // and click its "close" button after 1 second delay
  // https://on.cypress.io/contains
  // https://on.cypress.io/find
  // https://on.cypress.io/wait
  
  // confirm the errors go away, but the input fields are not cleared
  loginPage.noErrors()
})
