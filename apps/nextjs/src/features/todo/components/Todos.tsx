import { useSelector } from '@xstate/react';
import { AnimatePresence, Reorder } from 'framer-motion';

import { useGlobalState } from 'providers/StateProvider';
import { getFilteredTodos, Todo as TodoType } from '../machine';
import Todo from './Todo';

const Todos = () => {
  const { todoService } = useGlobalState();
  const { send } = todoService;

  const todos = useSelector(todoService, getFilteredTodos);

  const handleReorder = (todos: TodoType[]) => {
    send({ type: 'REORDER', todos });
  };

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
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default Todos;
