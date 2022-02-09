import React, { FormEvent } from 'react';
import { useSelector } from '@xstate/react';

import { useGlobalState } from 'providers/StateProvider';
import { getDraft } from '../machine';
import Filter from './Filter';
import Todos from './Todos';

const Page = () => {
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
      <div className="p-5 h-2/4 overflow-hidden w-3/6">
        <form className="mb-2 flex w-full " onSubmit={create}>
          <input
            className="border-none shadow-sm rounded-md w-full bg-white text-lg focus:outline-blue-500/80 focus:outline-offset-0 focus:ring-0"
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
};

export default Page;
