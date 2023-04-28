import { FormEvent, useState } from "react";
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
  onEditPost: (postId: number, contentEdit: string, titleEdit: string) => void;
}

export function ModalEdit({
  posts,
  isOpen,
  onEditPost,
  setOpenModalEdit,
}: Props) {
  const [newContent, setNewContent] = useState("");
  const [newTitle, setNewTitle] = useState("");

  function handleEditPost(e: FormEvent ,contentEdit: string, titleEdit: string) {
    e.preventDefault()

    onEditPost(posts[0].id, contentEdit, titleEdit);
     setNewContent(contentEdit)
     setNewTitle(titleEdit)
    onEditPost(posts[0].id,contentEdit, titleEdit);

    setOpenModalEdit();

    console.log(posts[0].id,contentEdit, titleEdit)
  }



  if (isOpen) {
    return (
      <div className={styles.ModalEdit}>
        <div>
          <form onSubmit={(e) => handleEditPost(e, newContent, newTitle)}>
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
              <button onClick={setOpenModalEdit} type="button">
                Cancel
              </button>
              <button  type="submit">
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
