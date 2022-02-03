import React, { ComponentProps, FormEvent, KeyboardEvent } from "react";

import { useMachine } from "@xstate/react";

import { machine } from "../../machines/EditableLabel";

export type Props = {
  label: string;
  onValueChange: (value: string) => void;
} & ComponentProps<"div">;

const Editable = ({ label, onValueChange, ...props }: Props) => {
  const [state, send] = useMachine(machine, {
    context: { value: label },
    actions: {
      handleValueChange: ({ value }) => onValueChange(value),
    },
  });

  const handleDoubleClick = () => {
    send("EDIT");
  };

  const handleBlur = (e: FormEvent<HTMLInputElement>) => {
    send({ type: "COMMIT", value: e.currentTarget.value });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      send({ type: "CANCEL" });
    }
    if (e.key === "Enter") {
      send({ type: "COMMIT", value: e.currentTarget.value });
    }
  };

  return (
    <div className="editable" {...props}>
      {state.matches("reading") && (
        <div className="editable-label" onDoubleClick={handleDoubleClick}>
          {label}
        </div>
      )}
      {state.matches("editing") && (
        <input
          className="editable-input"
          onBlur={handleBlur}
          defaultValue={state.context.value}
          onKeyDown={handleKeyDown}
          type="text"
        />
      )}
    </div>
  );
};

export default Editable;
