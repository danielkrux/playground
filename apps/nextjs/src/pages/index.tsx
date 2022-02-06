import { useSelector } from '@xstate/react';
import React, { FormEvent } from 'react';

import { useGlobalState } from 'providers/StateProvider';
import { getDraft } from 'features/todo/machine';

import Filter from 'features/todo/components/Filter';
import Todos from 'features/todo/components/Todos';

export default function Home() {
  const { todoService } = useGlobalState();
  const { send } = todoService;

  const draft = useSelector(todoService, getDraft);

  const create = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send({ type: 'CREATE' });
  };

  const updateDraft = (e: FormEvent<HTMLInputElement>) => {
    send({ type: 'DRAFT.CHANGE', title: e.currentTarget.value });
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 h-2/4 overflow-hidden w-2/6">
        <form className="mb-2 flex w-full " onSubmit={create}>
          <input
            className="border-none shadow-md rounded-md w-full bg-white text-lg"
            type="text"
            onChange={updateDraft}
            value={draft}
            placeholder="What needs to be done"
          />
        </form>
        <Filter />
        <Todos />
      </div>
    </div>
  );
}
