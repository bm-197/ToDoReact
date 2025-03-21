import { useReducer, useState } from "react";
import styles from "./Todo.module.css";
import Task from "../Task/Task";
import EditModal from "../EditModal/EditModal";

export const enum ACTION {
  ADD,
  DELETE,
  TOGGLE,
  EDIT,
}

export interface Todo {
  id: number;
  name: string | undefined;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Action {
  type: number;
  payload: { name?: string; id?: number };
}

function reducer(todos: Array<Todo>, action: Action): Array<Todo> {
  switch (action.type) {
    case ACTION.ADD:
      return [
        ...todos,
        {
          id: Date.now(),
          name: action.payload.name,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    case ACTION.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTION.TOGGLE:
      return todos.map((todo) => {
        todo.completed = todo.id === action.payload.id ? true : false;
        return todo;
      });
    case ACTION.EDIT:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.name = action.payload.name
          todo.updatedAt = new Date()
        }
        return todo;
      });
    default:
      return todos;
  }
}

function Todo() {
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskBeingEdited, setTaskBeingEdited] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setTaskBeingEdited(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (newName: string) => {
    if (taskBeingEdited) {
      dispatch({
        type: ACTION.EDIT,
        payload: { id: taskBeingEdited.id, name: newName },
      });
    }
    setIsModalOpen(false);
    setTaskBeingEdited(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskBeingEdited(null);
  };


  return (
    <div className={`${styles.container}`}>
      <h1>ToDo App</h1>
      <div className={`${styles.addTask}`}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({ type: ACTION.ADD, payload: { name: name } });
            setName("");
          }}
        >
          ADD
        </button>
      </div>

      {todos.length > 0 && <div className={`${styles.tasks}`}>
        {todos.map((todo) => (
          <Task key={todo.id} todo={todo} dispatch={dispatch}  onEdit={() => handleEdit(todo)} />
        ))}
      </div>}

      <EditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        currentName={taskBeingEdited ? taskBeingEdited.name || "" : ""}
      />
    </div>
  );
}

export default Todo;
