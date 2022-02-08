import React, { RefObject } from 'react';

type TriggerProps = {
  element: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getTriggerButtonWithProps = (
  element: React.ReactNode,
  onClick: () => void,
  ref: any
) => {
  if (!React.isValidElement(element)) return;
  return React.cloneElement(element, {
    ref,
    onClick,
  });
};

const Trigger = React.forwardRef(
  ({ element, setIsOpen }: TriggerProps, ref) => {
    const triggerBtn = getTriggerButtonWithProps(
      element,
      () => setIsOpen((state) => !state),
      ref
    );

    return <>{triggerBtn}</>;
  }
);

Trigger.displayName = 'Trigger';

export default Trigger;
