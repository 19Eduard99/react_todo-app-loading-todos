import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  selectedNav: string;
  handelFilter: (e: React.MouseEvent) => void;
};

const Footer = ({ todos, selectedNav, handelFilter }: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedNav === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={e => {
            handelFilter(e);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedNav === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={e => {
            handelFilter(e);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedNav === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            handelFilter(e);
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
