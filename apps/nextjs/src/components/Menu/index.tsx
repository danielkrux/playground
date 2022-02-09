import React, { ComponentProps, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMachine } from '@xstate/react';

import useRect from 'hooks/useRect';

import useClickOutside from 'hooks/useClickOutside';
import { INITIAL_CONTEXT, menuMachine } from 'machines/menu';

import Trigger from './Trigger';
import Content from './Content';

export type MenuItem = ComponentProps<'button'> & {
  label: string;
  onClick?: () => void;
};

type MenuProps = ComponentProps<'div'> & {
  triggerElement: React.ReactNode;
  items: MenuItem[];
};

const Menu = ({ items, triggerElement }: MenuProps) => {
  const menuRef = useRef();
  const [triggerRect, triggerRef] = useRect();

  const [state, send] = useMachine(menuMachine, {
    devTools: true,
    context: {
      ...INITIAL_CONTEXT,
      itemsLength: items.length,
      focusableIndexes: [0, 1, 2, 3], //todo get indexes of all items that are not disabled
    },
  });

  useEffect(() => {
    send({ type: 'UPDATE_CONTEXT', value: { itemsLength: items.length } });
  }, [items.length, send]);

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
            // should probably set the machine in React context instead of drilling props...
            state={state}
            send={send}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Menu;
