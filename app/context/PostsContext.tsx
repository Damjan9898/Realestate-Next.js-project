import React from 'react';
import {  Post } from "@prisma/client"

type PostsContextType = {
  filteredPosts: Post[] | null;
  setFilteredPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
};

const PostsContext = React.createContext<PostsContextType | null>(null);

export default PostsContext;