import { useSelector } from '@xstate/react';
import React, { FormEvent, useContext } from 'react';

import {
  getCompletedCount,
  getDraft,
  getCount,
} from '../machines/todo/selectors';
import Todos from '../components/Todos';
import { GlobalStateContext } from '../machines/Context';

export default function Home() {
  const { todoService } = useContext(GlobalStateContext);
  const { send } = todoService;

  const draft = useSelector(todoService, getDraft);
  const completedCount = useSelector(todoService, getCompletedCount);
  const count = useSelector(todoService, getCount);

  const create = (e) => {
    e.preventDefault();
    send({ type: 'CREATE' });
  };

  const updateDraft = (e: FormEvent<HTMLInputElement>) => {
    send({ type: 'DRAFT.CHANGE', title: e.currentTarget.value });
  };

  const deleteCompleted = () => {
    send({ type: 'DELETE.COMPLETED' });
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="p-5 shadow-md rounded bg-white w-2/6 h-2/4">
        <form className="mb-2 flex w-full" onSubmit={create}>
          <input
            className="border-none rounded-l-lg w-full bg-gray-100 focus:no-border"
            type="text"
            onChange={updateDraft}
            value={draft}
            placeholder="What needs to be done"
          />
          <button
            className="px-4 rounded-r-lg bg-gray-200 text-md"
            type="submit"
          >
            Create
          </button>
        </form>
        <div className="flex mb-4 justify-between">
          <div className="flex gap-3">
            <button className="text-sm rounded bg-blue-100 px-2 py-1">
              All ({count})
            </button>
            <button className="text-sm rounded bg-blue-50 px-2 py-1">
              Todo ({count - completedCount})
            </button>
            <button className="text-sm rounded bg-blue-50 px-2 py-1">
              Completed ({completedCount})
            </button>
          </div>
          {completedCount > 0 && (
            <button
              onClick={deleteCompleted}
              className="text-sm rounded bg-blue-50 px-2 py-1 "
            >
              Delete completed ({completedCount})
            </button>
          )}
        </div>
        <Todos />
      </div>
    </div>
  );
}
