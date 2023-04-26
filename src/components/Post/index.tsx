import { format, formatDistanceToNow } from "date-fns";
import styles from "./Post.module.css";
import { ArrowSquareOut, Trash } from "phosphor-react";
import { enUS } from "date-fns/locale";
import { useState } from "react";
import { ModalDelete } from "../Modal/ModalDelete";
import { ModalEdit } from "../Modal/ModalEdit";

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
  onEditPost: (postId: number, newContent: string, newTitle: string) => void;
}

export function Post({ posts, onDeletePost, onEditPost }: Props) {
  const [editedContent, setEditedContent] = useState("");
  //const [editedTitle, setEditedTitle] = useState("");

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  function handleDeletePost(postId: number) {
    onDeletePost(postId);
  }

  // function handleEditPost(postId: number) {
  //   const newTitle = prompt("Title:");
  //   const newContent = prompt("Content:");

  //   if (newContent && newTitle) {
  //     setEditedTitle(newTitle);
  //     setEditedContent(newContent);
  //     onEditPost(postId, newContent, newTitle);
  //   }
  // }

  return (
    <>
      {posts.map((itemPost) => (
        <section key={itemPost.id} className={styles.post}>
          <div className={styles.titlePost}>
            <h2>My First Post at CodeLeap Network!</h2>

            <div className={styles.buttons}>
              <button
                onClick={() => {
                  setOpenModalDelete(true);
                }}
                type="button"
                title="Delete"
              >
                <Trash size={32} weight="thin" />
              </button>
              <button
                onClick={() => {
                  setOpenModalEdit(true);
                }}
                // onClick={() => handleEditPost(itemPost.id)}
                type="button"
                title="Edit"
              >
                <ArrowSquareOut size={32} weight="thin" />
              </button>
            </div>
          </div>
          <div className={styles.nameAndDate}>
            <div>
              <span>
                @<strong>{itemPost.username}</strong>
              </span>
              <time
                title={format(
                  new Date(itemPost.created_datetime),
                  "d LLLL 'at' HH:mm'h'",
                  {
                    locale: enUS,
                  }
                )}
                dateTime={new Date(itemPost.created_datetime).toISOString()}
              >
                {formatDistanceToNow(new Date(itemPost.created_datetime), {
                  locale: enUS,
                  addSuffix: true,
                })}
              </time>
            </div>
            <div>
              <p>{editedContent || itemPost.content}</p>
            </div>
          </div>
        </section>
      ))}

      <ModalDelete
        posts={posts}
        onDeletePost={handleDeletePost}
        setOpenModalDeleteClose={() => setOpenModalDelete(!openModalDelete)}
        isOpen={openModalDelete}
      />
      <ModalEdit
        posts={posts}
        isOpen={openModalEdit}
        setOpenModalEdit={() => setOpenModalEdit(!openModalEdit)}
        onEditPost={(postId, newContent, newTitle) => {
          setEditedContent(newContent);
         
          onEditPost(postId, newContent, newTitle);
        }}
      />
    </>
  );
}
