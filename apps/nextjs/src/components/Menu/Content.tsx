import React, { ComponentProps, useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { StateFrom } from 'xstate';

import { menuMachine } from 'machines/menu';

type MenuItem = ComponentProps<'button'> & {
  label: string;
  onClick?: () => void;
};

type MenuContentProps = {
  triggerRect: DOMRect;
  items: MenuItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: StateFrom<typeof menuMachine>;
  send: any;
};

const variants: Variants = {
  closed: {
    scale: 0,
    opacity: 0,
    transformOrigin: 'left top',
  },
  open: {
    scale: 1,
    opacity: 1,
  },
};

const Content = React.forwardRef<HTMLDivElement, MenuContentProps>(
  ({ items, triggerRect, state, send }, ref) => {
    const filteredItems = items.filter((i) => i);

    useEffect(() => {
      if (state.context.typeAhead === '') return;
      const index = filteredItems.findIndex((i) =>
        i.label.toLowerCase().startsWith(state.context.typeAhead)
      );

      //@ts-ignore
      const element = ref.current?.querySelectorAll(
        `[data-focusid=menu-item-${index}]`
      );
      element[0]?.focus();
    }, [filteredItems, ref, state.context.typeAhead]);

    useEffect(() => {
      if (state.context.focusedIndex === -1) return;
      //@ts-ignore
      const element = ref.current?.querySelectorAll(
        `[data-focusid=menu-item-${state.context.focusedIndex}]`
      );
      element[0]?.focus();
    }, [ref, state.context.focusedIndex]);

    const handleItemClick = (item: MenuItem) => {
      send('KEYDOWN_ENTER');
      if (!item.onClick) return;
      if (item.disabled) return;
      item.onClick();
    };

    useEffect(() => {
      if (typeof window === 'undefined') return;

      function handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
          case 'Enter':
            handleItemClick(items[state.context.focusedIndex]);
            break;
          case 'Escape':
            send('KEYDOWN_ESCAPE');
            break;
          case 'ArrowUp':
          case 'ArrowDown':
            send({ type: 'KEYDOWN_ARROW', value: e.key });
            break;
          default:
            send({ type: 'KEYDOWN', value: e.key });
            break;
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, send, state.context.focusedIndex]);

    return (
      <Portal>
        <motion.div
          ref={ref}
          className="bg-white shadow-lg absolute rounded-md overflow-hidden flex flex-col justify-start w-max"
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
          style={{
            top: triggerRect?.top + triggerRect?.height,
            left: triggerRect?.left + triggerRect?.width / 2,
          }}
        >
          {filteredItems.map((item, index) => (
            <button
              id="menu-item"
              tabIndex={-1}
              key={item.label}
              disabled={item.disabled}
              data-focusid={`menu-item-${index}`}
              onClick={() => handleItemClick(item)}
              className={classNames(
                'hover:cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none px-4 py-2 text-sm',
                'disabled:bg-gray-100 disabled:hover:cursor-not-allowed disabled:text-gray-400'
              )}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      </Portal>
    );
  }
);

Content.displayName = 'Content';

export default Content;
