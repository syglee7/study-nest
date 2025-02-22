import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'test',
    title: 'test title',
    content: 'test content',
    likeCount: 1,
    commentCount: 0,
  },
  {
    id: 2,
    author: 'test2',
    title: 'test title2',
    content: 'test content2',
    likeCount: 2,
    commentCount: 1,
  },
  {
    id: 3,
    author: 'test3',
    title: 'test title3',
    content: 'test content3',
    likeCount: 3,
    commentCount: 2,
  },
];

@Injectable()
export class PostsService {
  getALLPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const id = posts.length + 1;
    const newPost: PostModel = {
      id,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, newPost];

    // posts.push(newPost);

    return newPost;
  }

  updatePost(
    postId: number,
    author?: string,
    title?: string,
    content?: string,
  ) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const updatedPost = {
      ...post,
    };

    if (author) {
      updatedPost.author = author;
    }

    if (title) {
      updatedPost.title = title;
    }

    if (content) {
      updatedPost.content = content;
    }

    posts = posts.map((post) =>
      post.id === postId ? { ...post, ...updatedPost } : post,
    );

    return updatedPost;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    posts = posts.filter((post) => post.id !== postId);

    return postId;
  }
}
