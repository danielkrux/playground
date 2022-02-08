import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import useRect from 'hooks/useRect';

import useClickOutside from 'hooks/useClickOutside';
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

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(menuRef, () => setIsOpen(false), triggerRef);

  return (
    <>
      <Trigger
        element={triggerElement}
        setIsOpen={setIsOpen}
        ref={triggerRef}
      />
      <AnimatePresence>
        {isOpen && (
          <Content
            items={items}
            triggerRect={triggerRect}
            ref={menuRef}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuRoot;
