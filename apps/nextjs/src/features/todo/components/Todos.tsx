import { useContext } from 'react';
import { useSelector } from '@xstate/react';
import { Reorder } from 'framer-motion';

import { getTodos, Todo as TodoType } from 'features/todo/machine';
import Todo from './Todo';
import { useGlobalState } from 'providers/StateProvider';

const Todos = () => {
  const { todoService } = useGlobalState();
  const { send } = todoService;
  const todos = useSelector(todoService, getTodos);

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
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </Reorder.Group>
  );
};

export default Todos;
