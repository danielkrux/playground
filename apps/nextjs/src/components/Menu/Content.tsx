import React, { useEffect, useState } from 'react';
import { Portal } from 'react-portal';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';
import { useMachine } from '@xstate/react';

import { typeAheadMachine } from 'machines/typeAhead';

type MenuItem = {
  label: string;
  onClick?: () => void;
};

type MenuContentProps = {
  triggerRect: DOMRect;
  items: MenuItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  ({ items, triggerRect, setIsOpen }, ref) => {
    const [state, send] = useMachine(typeAheadMachine);
    const [focused, setFocused] = useState<number>();

    const filteredItems = items.filter((i) => i);

    useEffect(() => {
      if (state.context.value === '') return;
      const index = filteredItems.findIndex((i) =>
        i.label.toLowerCase().startsWith(state.context.value)
      );

      //@ts-ignore
      const element = ref.current?.querySelectorAll(
        `[data-focusid=menu-item-${index}]`
      );
      element[0]?.focus();
    }, [filteredItems, state.context.value]);

    useEffect(() => {
      if (typeof window === 'undefined') return;

      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
          const click = items[focused]?.onClick;
          if (click) {
            click();
            setIsOpen(false);
          }
        } else if (e.key === 'Escape') {
          setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          //@ts-ignore
          const elements = ref.current?.querySelectorAll(`#menu-item`);
          elements?.[focused >= 0 ? focused + 1 : 0]?.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          //@ts-ignore
          const elements = ref.current?.querySelectorAll(`#menu-item`);
          elements?.[focused >= 0 ? focused - 1 : 0]?.focus();
        } else {
          send('KEYDOWN', { value: e.key });
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [focused, items]);

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
