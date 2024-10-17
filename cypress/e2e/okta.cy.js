describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('push', function() {
    /* ==== Generated with Cypress Studio ==== */

    cy.visit(
      'https://mfa.telpark.com/oauth2/v1/authorize?client_id=okta.2b1959c8-bcc0-56eb-a589-cfcfb7422f26&code_challenge=hNKPtRQ2653tIxEu64FLL_Qp4wouTNpzp8UBYKpV-cI&code_challenge_method=S256&nonce=DsXsatvJdIQyv560E3w5F0pNadTcSLSAqYzFoyUNaP1csti4gZY5gszxuOT8iaTN&redirect_uri=https%3A%2F%2Fmfa.telpark.com%2Fenduser%2Fcallback&response_type=code&state=VPS6qud7UchfvgaZz0LEXnKsGOtH3yTy53C4pOSojq20fuvwihlA6V7fUGWt3JvN&scope=openid%20profile%20email%20okta.users.read.self%20okta.users.manage.self%20okta.internal.enduser.read%20okta.internal.enduser.manage%20okta.enduser.dashboard.read%20okta.enduser.dashboard.manage%20okta.myAccount.sessions.manage'
    );

    cy.get('#input28').clear('2');
    cy.get('#input28').type('20451');
    cy.get('.button').click();
    cy.get(':nth-child(2) > .authenticator-description > .authenticator-button > .button').click();
    cy.get('.caret').click();
    cy.get(':nth-child(2) > .chiclet > .chiclet--article').invoke('removeAttr', 'target').click();
    /* ==== End Cypress Studio ==== */
  });
})