import React, { useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMachine } from '@xstate/react';

import useRect from 'hooks/useRect';

import useClickOutside from 'hooks/useClickOutside';
import { INITIAL_CONTEXT, menuMachine } from 'machines/menu';

import Trigger from './Trigger';
import Content from './Content';

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type MenuProps = {
  triggerElement: React.ReactNode;
  items: MenuItem[];
};

const MenuRoot = ({ items, triggerElement }: MenuProps) => {
  const menuRef = useRef();
  const [triggerRect, triggerRef] = useRect();

  const [state, send] = useMachine(menuMachine, {
    devTools: true,
    context: {
      ...INITIAL_CONTEXT,
      itemsLength: items.length,
    },
  });

  useClickOutside(menuRef, () => send('CLOSE'), triggerRef);

  const toggleOpen = () => {
    if (state.matches('open')) {
      send('CLOSE');
    } else {
      send('OPEN');
    }
  };

  return (
    <>
      <Trigger
        element={triggerElement}
        setIsOpen={toggleOpen}
        ref={triggerRef}
      />
      <AnimatePresence>
        {state.matches('open') && (
          <Content
            items={items}
            triggerRect={triggerRect}
            ref={menuRef}
            setIsOpen={toggleOpen}
            // should probably set the machine in React.Context instead of drilling props...
            state={state}
            send={send}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuRoot;
