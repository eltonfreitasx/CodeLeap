import ModalUsername from "../components/Modal/ModalUsername";
import { Post } from "../components/Post";
import styles from "./Home.module.css";
import { useState, FormEvent, useEffect } from "react";

interface PostProps {
  id: number;
  title: string;
  username: string;
  content: string;
  created_datetime: string;
  isNewPost: boolean
}

export function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const reversedPosts = [...posts].reverse();

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");


  const [closeModalUserName, setCloseModalUserName] = useState(true);
  const [selectedUsername, setSelectedUsername] = useState('');



  function deletePost(postToDelete: number) {
    const commentsWithouDeleteOne = posts.filter(
      (post) => post.id !== postToDelete
    );
    setPosts(commentsWithouDeleteOne);
  }

  // function handleEditPost(postId: number, contentEdit: string, titleEdit: string) {
  //   const updatedPosts = posts.map((post) => {
  //     if (post.id === postId) {
  //       return { ...post, content: contentEdit, title: titleEdit,  };
  //     } else {
  //       return post;
  //     }
  //   });
  //   setPosts(updatedPosts);
  // }

  function handleEditPost(
    postId: number,
    contentEdit: string,
    titleEdit: string
  ) {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        if (post.isNewPost) { // se for novo post, adiciona ao final do array
          return { ...post, content: contentEdit, title: titleEdit, isNewPost: false };
        } else { // se não for novo, atualiza normalmente
          return { ...post, content: contentEdit, title: titleEdit };
        }
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  }
  

  function handleSaveUsername(username: string) {
    setSelectedUsername(username)
  }

   useEffect(() => {
   const fetchApi = async () => {
       const url = "https://dev.codeleap.co.uk/careers/?format=json";
       const response = await fetch(url);
       const objJson = await response.json();
       setPosts(objJson.results);
       console.log(objJson.results[0])
     };
     fetchApi();
   }, []);




  function handleCreateNewPost(e: FormEvent) {
    e.preventDefault();

    const newPost: PostProps = {
      id: Date.now(),
      title: newPostTitle,
      username: selectedUsername, //MUDAR PARA PEGAR O USER DO MODAL
      content: newPostContent,
      created_datetime: new Date().toISOString(),
      isNewPost: true
    };

    setNewPostTitle("");
    setNewPostContent("");
    setPosts([...posts, newPost]);
  }

  const isNewCommentEmpty =
    newPostTitle.length === 0 || newPostContent.length === 0;

  return (
    <main className={styles.main}>
      <div className={styles.codeLeap}>
        <h2>CodeLeap Network</h2>
      </div>
      <form onSubmit={handleCreateNewPost}>
        <strong>What's on your mind?</strong>

        <label className={styles.label}>Title</label>
        <input
          className={styles.inputTitle}
          type="text"
          placeholder="Hello World"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <label className={styles.label}>Content</label>

        <textarea
          name="name"
          className={styles.areaContent}
          placeholder="Content here"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          required
        />

        <div>
          <button type="submit" disabled={isNewCommentEmpty}>
            Create
          </button>
        </div>
      </form>

      <Post
        posts={reversedPosts}
        onDeletePost={deletePost}
        onEditPost={handleEditPost}
        userName={handleSaveUsername}
      />

          <ModalUsername
          closeModalUserName={() => setCloseModalUserName(false)}
          onSave={handleSaveUsername}
          isOpen={closeModalUserName}

        />
    </main>
  );
}
