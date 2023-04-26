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
  onDeletePost: (postId: number) => void;
  isOpen: boolean;
  setOpenModalDeleteClose: () => void
}

export function ModalDelete({posts, isOpen,onDeletePost, setOpenModalDeleteClose }: Props) {
  function handleDeletePost(postId: number) {
    onDeletePost(postId);
    setOpenModalDeleteClose()
  }

  if (isOpen) {
    return (
      <main className={styles.ModalDelete}>
        <div>
          <div className={styles.question}>
            <span>Are you sure you want to delete this post?</span>
            <button onClick={setOpenModalDeleteClose} type="button">Cancel</button>
            <button onClick={() => handleDeletePost(posts[0].id)}  type="button">Delete</button>
          </div>
        </div>
      </main>
    );
  }


  return null;
}
