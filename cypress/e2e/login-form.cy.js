// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { LoginPage } from './login.page'

beforeEach(() => {
  cy.visit('/')
});

describe('Login form', () => {
  // visit the login page before each test
  it('shows an error for empty username field', () => {
    // click on the login button without
    // entering any of the information
    LoginPage.getLoginButton().click()
    // the login page should show the error
    // with text "Epic sadface: Username is required"
    LoginPage.showsErrorMessage('Epic sadface: Username is required')
  })

  it('shows an error for empty password field', () => {
    // enter username "name" into the input field
    // and click the login button
    // without entering the password
    LoginPage.getUsername().type('name')
    LoginPage.getLoginButton().click()
    // the login page should show the error
    // with text "Epic sadface: Password is required"
    LoginPage.showsErrorMessage('Epic sadface: Password is required')
  })
})
