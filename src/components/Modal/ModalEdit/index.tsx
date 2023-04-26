import { useState } from "react";
import styles from "./Modal.module.css";

interface PostProps {
  id: number;
  title: string;
  username: string;
  content: string;
  created_datetime: string;
}

interface Props {
  posts: PostProps[];
  isOpen: boolean;
  setOpenModalEdit: () => void;
  onEditPost: (postId: number, newContent: string, newTitle: string) => void;
}

export function ModalEdit({
  posts,
  isOpen,
  onEditPost,
  setOpenModalEdit,
}: Props) {
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

  function handleSave() {
    const postId = posts[0].id;
    
    onEditPost(postId, newContent, newTitle);
    

    setNewContent("");
    setNewTitle("");
    setOpenModalEdit();
  }

  if (isOpen) {
    return (
      <div className={styles.ModalEdit}>
        <div>
          <form>
            <span>Edit item</span>

            <label className={styles.label}>Title</label>
            <input
              className={styles.inputTitle}
              type="text"
              placeholder="Hello World"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <label className={styles.label}>Content</label>
            <textarea
              name="name"
              className={styles.areaContent}
              placeholder="Content here"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />

            <div className={styles.buttons}>
              <button onClick={setOpenModalEdit} type="submit">
                Cancel
              </button>
              <button onClick={handleSave} type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
}
