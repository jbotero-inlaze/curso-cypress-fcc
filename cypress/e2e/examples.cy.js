describe('Example test', () => {
  beforeEach(() => {
    cy.visit('/examples');
  });

  it('multipage testing', () => {
    // custom command
    cy.getDataTest('nav-why-cypress').click();
    // location: get the window location
    cy.location('pathname').should('equal', '/');

    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should('equal', '/overview');

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should('equal', '/fundamentals');

    cy.getDataTest('nav-examples').click();
    cy.location('pathname').should('equal', '/examples');
  });

  // only: run just this test
  it('intercept', () => {
    // intercept: intercept the http requests
    cy.intercept('POST', 'http://localhost:3000/examples', {
      // mock data with json file
      fixture: 'example.json'
      // body: {
      //   message: 'successfully intercepted request'
      // }
    });
    cy.getDataTest('post-button').click();
  });

  it.only('Grudges', () => {
    cy.contains(/add some grudges/i);

    // asserts the list has 0 items
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });

    // asserts clear butto doesnt exist
    cy.getDataTest('clear-button').should('not.exist');

    // aserts the title
    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges');

    // get the element, type something and click button
    // within: look inside the element
    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('some grudge');
    });
    cy.getDataTest('add-grudge-button').click();

    // asserts the list has 1 item
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    // aserts the title
    cy.getDataTest('grudge-list-title').should('have.text', 'Grudges');

    // get the element, type something and click the button
    cy.getDataTest('grudge-input').within(() => {
      cy.get('input').type('number 2');
    });
    cy.getDataTest('add-grudge-button').click();

    // asserts the list has 2 items and contains the text
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      cy.get('li').its(0).should('contains.text', 'some grudge');
    });

    // remove 1 item and check the list has 1 item
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li')
        .its(0)
        .within(() => {
          cy.get('button').click();
        });
    });
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    // click clear button and check the list has 0 item
    cy.getDataTest('clear-button').click();
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });
  });
});
