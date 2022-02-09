import React from 'react';

type TriggerProps = {
  element: React.ReactNode;
  setIsOpen: () => void;
};

const getTriggerButtonWithProps = (
  element: React.ReactNode,
  onClick: () => void,
  ref: any,
  props?: Partial<any> & React.Attributes
) => {
  if (!React.isValidElement(element)) return;
  return React.cloneElement(element, {
    ref,
    onClick,
    ...props,
  });
};

const Trigger = React.forwardRef(
  ({ element, setIsOpen }: TriggerProps, ref) => {
    const triggerBtn = getTriggerButtonWithProps(element, setIsOpen, ref, {
      'data-testid': 'menu-trigger',
    });

    return <>{triggerBtn}</>;
  }
);

Trigger.displayName = 'Trigger';

export default Trigger;
