import React, { ComponentProps, KeyboardEvent, useRef } from 'react';
import classNames from 'classnames';
import { useMachine } from '@xstate/react';

import { editableMachine } from './machine';
import useClickOutside from 'hooks/useClickOutside';

export type Props = {
  label: string;
  onValueChange: (value: string) => void;
  containerProps?: ComponentProps<'div'>;
  labelProps?: ComponentProps<'p'>;
  inputProps?: ComponentProps<'input'>;
};

const Editable = ({
  label,
  onValueChange,
  labelProps,
  inputProps,
  ...props
}: Props) => {
  const containerRef = useRef<HTMLDivElement>();

  const [state, send] = useMachine(editableMachine, {
    context: { value: label },
    actions: {
      handleValueChange: ({ value }) => onValueChange(value),
    },
  });

  useClickOutside(containerRef, () => send({ type: 'CANCEL' }));

  const handleDoubleClick = () => {
    send('EDIT');
  };

  const handleBlur = () => {
    send({ type: 'CANCEL' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      send({ type: 'CANCEL' });
    }
    if (e.key === 'Enter') {
      send({ type: 'COMMIT', value: e.currentTarget.value });
    }
  };

  return (
    <div ref={containerRef} data-testid="editable" {...props}>
      {state.matches('reading') && (
        <p
          {...labelProps}
          data-testid="editable-label"
          onDoubleClick={handleDoubleClick}
        >
          {label}
        </p>
      )}
      {state.matches('editing') && (
        <input
          type="text"
          data-testid="editable-input"
          defaultValue={state.context.value}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={classNames(inputProps?.className, 'w-full')}
          autoFocus
        />
      )}
    </div>
  );
};

export default Editable;
