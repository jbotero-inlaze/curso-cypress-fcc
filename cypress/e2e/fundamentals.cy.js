// test description
describe('Fundamentals test', () => {
  // execute before each test
  beforeEach(() => {
    // visit: navigate to
    cy.visit('/fundamentals');
  });

  // test case
  it('Contains correct header text', () => {
    // get: get an element
    // contains: check if the element contains text
    cy.get('[data-test="fundamentals-header"]').contains(/Testing Fundamentals/i);

    // should: assert that the element has text
    cy.get('[data-test="fundamentals-header"]').should('contain.text', 'Testing Fundamentals');

    // using custom command
    cy.getDataTest('fundamentals-header').should('contain.text', 'Testing Fundamentals');
  });

  // test case
  // only: run just this test case
  it.only('Accordion works correct', () => {
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should('be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a describe block/i).should('not.be.visible');
  });
});
