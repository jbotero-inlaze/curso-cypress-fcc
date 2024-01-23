describe('Form tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('Test subscribe form', () => {
    cy.contains(/Testing forms/i);

    // find: find an element
    // as: alias an element
    cy.getDataTest('subscribe-form').find('input').as('subscribe-input');

    // type: type some text into an element
    cy.get('@subscribe-input').type('jp@gmail.com');
    cy.contains(/Successfully subbed: jp@gmail.com!/i).should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains(/Successfully subbed: jp@gmail.com!/i).should('exist');
    // wait: wait an amount of time or something happens
    cy.wait(3000);
    cy.contains(/Successfully subbed: jp@gmail.com!/i).should('not.exist');

    cy.get('@subscribe-input').type('jp@gmail.io');
    cy.contains(/Invalid email: jp@gmail.io!/i).should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains(/Invalid email: jp@gmail.io!/i).should('exist');
    cy.wait(3000);
    cy.contains(/Invalid email: jp@gmail.io!/i).should('not.exist');

    cy.contains(/fail!/i).should('not.exist');
    cy.getDataTest('subscribe-button').click();
    cy.contains(/fail!/i).should('exist');
  });
});
