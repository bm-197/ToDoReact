import styles from "./Task.module.css";
import { Todo, Action, ACTION } from "../Todo/Todo";
import Edit from "../../assets/edit-icon.svg";
import Delete from "../../assets/delete-icon.svg";

interface Props {
  todo: Todo;
  dispatch: (action: Action) => any;
  onEdit: () => void;
}

function Task({ todo, dispatch, onEdit }: Props) {
  return (
    <div className={`${styles.task}`}>
      <input
        type="checkbox"
        onChange={() =>
          dispatch({ type: ACTION.TOGGLE, payload: { id: todo.id } })
        }
      />
      <span
        style={{
          color: todo.completed ? "#AAA" : "#000",
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.name}
      </span>

      <div className={`${styles.buttons}`}>
      <button className={`${styles.editIcon}`} onClick={onEdit}>
        <img src={Edit} className={`${styles.editIcon}`} alt="Edit Button" />
      </button>
        <button
          onClick={() =>
            dispatch({ type: ACTION.DELETE, payload: { id: todo.id } })
          }
          className={`${styles.deleteIcon}`}
        >
          <img
            src={Delete}
            alt="Delete Button"
          />
        </button>
      </div>
    </div>
  );
}


export default Task;
