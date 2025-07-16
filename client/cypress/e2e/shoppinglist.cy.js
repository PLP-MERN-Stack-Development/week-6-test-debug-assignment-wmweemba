describe('Shopping List App E2E', () => {
  const user = { email: 'e2euser@example.com', password: 'password123' };

  beforeEach(() => {
    cy.visit('/');
  });

  it('registers a new user and logs in', () => {
    cy.contains('Register').click();
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.contains(/^Register$/).click();
    cy.contains('Shopping List').should('be.visible');
  });

  it('logs out and logs in again', () => {
    cy.contains('Logout').click();
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.contains('Login').click();
    cy.contains('Shopping List').should('be.visible');
  });

  it('adds, toggles, and deletes a shopping list item', () => {
    cy.get('input[placeholder="Add item..."]').type('Milk');
    cy.contains('Add').click();
    cy.contains('Milk').should('be.visible');
    cy.contains('Mark as Purchased').click();
    cy.contains('Unmark').should('be.visible');
    cy.contains('Delete').click();
    cy.contains('Milk').should('not.exist');
  });

  it('prevents adding empty item', () => {
    cy.contains('Add').click();
    cy.contains('Failed to add item').should('exist');
  });

  it('shows error on invalid login', () => {
    cy.contains('Logout').click();
    cy.get('input[placeholder="Email"]').type('bad@user.com');
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.contains('Login').click();
    cy.contains(/login failed|invalid/i).should('exist');
  });

  it('navigates between login and register', () => {
    cy.contains('Register').click();
    cy.contains('Register').should('exist');
    cy.contains('Login').click();
    cy.contains('Login').should('exist');
  });

  it('visual regression: shopping list', () => {
    cy.contains('Shopping List').should('be.visible');
    cy.screenshot('shopping-list');
    // For real visual regression, use cypress-image-snapshot or similar plugin
  });
}); 