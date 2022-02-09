/// <reference types="cypress" />

import { mount } from '@cypress/react';
import Editable from '../Editable';

const initialLabel = 'test';

describe('<Editable />', () => {
  beforeEach(() => {
    mount(<Editable label={initialLabel} onValueChange={cy.stub()} />);
  });

  const getEditableLabel = () => cy.get('[data-testid="editable-label"]');
  const getEditableInput = () => cy.get('[data-testid="editable-input"]');

  it('renders with correct label', () => {
    getEditableLabel().contains(initialLabel);
  });

  it('renders an input on double click', () => {
    getEditableLabel().dblclick();
    getEditableInput().should('exist');
  });

  it('renders initial label on input cancel', () => {
    getEditableLabel().dblclick();
    getEditableInput().type('test').type('{esc}');
    getEditableLabel().should('have.text', initialLabel);
  });

  it('renders initial label on input blur', () => {
    getEditableLabel().dblclick();
    getEditableInput().type('new label');
    getEditableInput().blur();
    getEditableLabel().should('have.text', initialLabel);
  });

  it('has new state on input commit', () => {
    getEditableLabel().dblclick();
    getEditableInput().type(' new label').type('{enter}');
    getEditableLabel().dblclick();
    getEditableInput().should('have.value', 'test new label');
  });
});
