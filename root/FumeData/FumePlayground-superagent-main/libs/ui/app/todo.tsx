import React from 'react';
import TodoList from './TodoList';
import { RouteComponentProps } from '@reach/router';

const TodoRoute: React.FC<RouteComponentProps> = () => {
  return <TodoList />;
};

export default TodoRoute;
