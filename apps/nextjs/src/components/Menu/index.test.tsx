/// <reference types="cypress" />

import { mount } from '@cypress/react';
import Menu, { MenuItem } from './index';

const menuItems: MenuItem[] = [
  {
    label: 'Delete selected items',
  },
  {
    label: 'Check all items',
    disabled: true,
  },
  {
    label: 'Check all items1',
    onClick: () => {},
  },
];

describe('<Menu />', () => {
  beforeEach(() => {
    mount(
      <Menu items={menuItems} triggerElement={<button>Toggle menu</button>} />
    );
  });

  const getTrigger = () => cy.get('[data-testid="menu-trigger"]');
  const getMenu = () => cy.get('[data-testid="menu-content"]');
  const getItem = (index: number) =>
    cy.get(`[data-testid="menu-item-${index}"]`);

  it('renders trigger', () => {
    getTrigger().contains('Toggle menu');
  });

  it('opens menu on trigger click', () => {
    getTrigger().click();
    getMenu().should('exist');
  });

  context('when menu is open', () => {
    beforeEach(() => {
      getTrigger().click();
    });

    it('closes on {escape}', () => {
      cy.get('body').type('{esc}');
      getMenu().should('not.exist');
    });

    it('closes on menu item click', () => {
      getItem(0).click();
      getMenu().should('not.exist');
    });

    it('closes on menu item select with {enter}', () => {
      getItem(0).click();
      getMenu().should('not.exist');
    });

    it('focuses first item on {downarrow}', () => {
      cy.get('body').type('{downarrow}');
      getItem(0).should('be.focused');
    });

    it('focuses first item on {uparrow}', () => {
      cy.get('body').type('{uparrow}');
      getItem(0).should('be.focused');
    });

    it('focuses items matched with typeahead query', () => {
      cy.get('body').type('che');
      getItem(1).should('not.be.focused');
      cy.wait(500);
      cy.get('body').type('Delete');
      getItem(0).should('be.focused');
    });

    it('closes the menu on outside click', () => {
      cy.get('body').click(0, 0);
      getMenu().should('not.exist');
    });
  });
});
