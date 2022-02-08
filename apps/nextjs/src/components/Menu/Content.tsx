import React, { useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { StateFrom } from 'xstate';

import { menuMachine } from 'machines/menu';

type MenuItem = {
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
    const [focused, setFocused] = useState<number>();

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

    useEffect(() => {
      if (typeof window === 'undefined') return;

      function handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
          case 'Enter':
            send('KEYDOWN_ENTER');
            // items[state.context.focusedIndex].onClick();
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
    }, [focused, items, send, state.context.focusedIndex]);

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
            <div
              className={classNames(
                'hover:cursor-pointer hover:bg-gray-100 focus:bg-gray-100 focus:outline-none px-4 py-2 text-sm'
              )}
              id="menu-item"
              data-focusid={`menu-item-${index}`}
              key={item.label}
              onClick={item.onClick && item.onClick}
              tabIndex={-1}
              onFocus={() => setFocused(index)}
            >
              {item.label}
            </div>
          ))}
        </motion.div>
      </Portal>
    );
  }
);

Content.displayName = 'Content';

export default Content;
