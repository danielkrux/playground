import { useSelector } from '@xstate/react';
import { AnimatePresence, Reorder } from 'framer-motion';

import { useGlobalState } from 'providers/StateProvider';
import { useMemo } from 'react';
import { getFilter, getTodos, Todo as TodoType } from '../machine';
import Todo from './Todo';

const filterTodos = (show: string, todos: TodoType[]) => {
  switch (show) {
    case 'completed':
      return todos.filter((t) => t.completed);
    case 'todo':
      return todos.filter((t) => !t.completed);
    default:
      return todos;
  }
};

const Todos = () => {
  const { todoService } = useGlobalState();
  const { send } = todoService;

  const todos = useSelector(todoService, getTodos);
  const filter = useSelector(todoService, getFilter);

  const handleReorder = (todos: TodoType[]) => {
    send({ type: 'REORDER', todos });
  };

  const filteredTodos = useMemo(
    () => filterTodos(filter, todos),
    [filter, todos]
  );

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={handleReorder}
      initial={false}
      dragConstraints={{ top: 0 }}
      className="overflow-hidden h-full"
    >
      <AnimatePresence>
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Todos;
