import { useSelector } from '@xstate/react';
import classNames from 'classnames';
import { ComponentProps, useState } from 'react';

import { useGlobalState } from 'providers/StateProvider';
import { FilterShow, getCompletedCount, getCount, getFilter } from '../machine';
import Ellipses from 'components/Icons/Ellipses';
import Menu from 'components/Menu';

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
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="flex mt-3 mb-4 justify-between items-center h-10">
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
      <Menu
        triggerElement={
          <button className="hover:bg-black/10 p-2 rounded-full h-10 w-10 grid place-items-center">
            <Ellipses />
          </button>
        }
        items={[
          completedCount && {
            label: 'Delete selected items',
            onClick: deleteCompleted,
          },
          { label: 'Delete all items' },
          { label: 'Uncheck all items' },
          { label: 'Check all items' },
        ]}
      />
    </div>
  );
};

export default Filter;
