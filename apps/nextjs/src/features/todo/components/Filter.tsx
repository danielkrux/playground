import { useSelector } from '@xstate/react';
import classNames from 'classnames';
import { ComponentProps } from 'react';

import { useGlobalState } from 'providers/StateProvider';
import { FilterShow, getCompletedCount, getCount, getFilter } from '../machine';

type ButtonProps = { selected?: boolean } & ComponentProps<'button'>;

const Button = ({ selected, children, ...props }: ButtonProps) => (
  <button
    {...props}
    className={classNames('rounded-full bg-white shadow-sm text-sm py-1', {
      'ring-blue-500 ring-2 px-4': selected,
      'px-4 ': !selected,
    })}
  >
    {children}
  </button>
);

type FilterProps = {};

const Filter = ({}: FilterProps) => {
  const { todoService } = useGlobalState();
  const { send } = todoService;

  const completedCount = useSelector(todoService, getCompletedCount);
  const count = useSelector(todoService, getCount);
  const filter = useSelector(todoService, getFilter);

  const deleteCompleted = () => {
    send({ type: 'DELETE.COMPLETED' });
  };

  const handleFilter = (show: FilterShow) => {
    send({ type: 'FILTER', show });
  };

  return (
    <div className="flex mt-3 mb-4 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Button onClick={() => handleFilter('all')} selected={filter === 'all'}>
          All ({count})
        </Button>
        <Button
          onClick={() => handleFilter('todo')}
          selected={filter === 'todo'}
        >
          Todo ({count - completedCount})
        </Button>
        <Button
          onClick={() => handleFilter('completed')}
          selected={filter === 'completed'}
        >
          Completed ({completedCount})
        </Button>
      </div>
      {completedCount > 0 && (
        <button
          className="bg-white py-2 px-4 rounded text-sm"
          onClick={deleteCompleted}
        >
          Delete completed ({completedCount})
        </button>
      )}
    </div>
  );
};

export default Filter;
