import classNames from 'classnames';
import { useDragControls, Reorder } from 'framer-motion';

import Editable from 'components/Editable';
import ReorderIcon from 'components/Icons/Reorder';
import { Todo as TodoType } from 'features/todo/machine';
import { useGlobalState } from 'providers/StateProvider';

const Todo = ({ todo }) => {
  const dragControls = useDragControls();

  const { todoService } = useGlobalState();
  const { send } = todoService;

  const complete = (id: string) => {
    send({ type: 'COMPLETED', id });
  };

  const updateTodo = (newTodo: TodoType) => {
    send({ type: 'UPDATE', todo: newTodo });
  };

  return (
    <Reorder.Item
      id={todo.id}
      value={todo}
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex relative items-center p-4 mb-2 list-none bg-white rounded justify-between shadow-md"
    >
      <div className="flex items-center gap-3">
        <ReorderIcon dragControls={dragControls} />
        <input
          checked={todo.completed}
          onChange={() => complete(todo.id)}
          type="checkbox"
          id="complete-todo"
          className="rounded-sm h-4 w-4 border-gray-400 border-2 focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 checked:bg--600"
        />
        <Editable
          onValueChange={(value) => updateTodo({ ...todo, title: value })}
          label={todo.title}
          labelProps={{
            className: classNames(
              'select-none px-2 py-1 hover:bg-gray-100/80 rounded-sm',
              {
                'line-through': todo.completed,
              }
            ),
          }}
          inputProps={{
            className:
              'border-none p-0 px-2 py-1 rounded-sm focus:ring-2 focus:ring-gray-300',
          }}
        />
      </div>
    </Reorder.Item>
  );
};

export default Todo;
