import styles from "./ModalUsername.module.css";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onSave: (username: string) => void;
  closeModalUserName: () => void;
}

export default function ModalUsername({
  isOpen,
  onSave,
  closeModalUserName,
}: Props) {
  const [userName, setUserName] = useState("");

  function handleSaveUsername() {
    closeModalUserName();
    console.log(userName);
    onSave(userName);
  }

  if (isOpen) {
    const isNewCommentEmpty = userName.length === 0;

    return (
      <div className={styles.UsernameModal}>
        <div>
          <span>Welcome to CodeLeap network!</span>

          <label>Please enter your username</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Jhon doe"
          />
          <button
            type="submit"
            disabled={isNewCommentEmpty}
            onClick={handleSaveUsername}
          >
            Enter
          </button>
        </div>
      </div>
    );
  }
  return null;
}
