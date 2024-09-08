interface Post {
  created?: Date;
  content: string;
  title: string;
}

type CustomPost = Post | FormData;
