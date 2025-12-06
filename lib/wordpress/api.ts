import { getClient } from './client';
import { GET_ALL_POST_SLUGS, GET_POSTS, GET_POST_BY_SLUG } from './queries/posts';
import type {
  AllPostSlugsResponse,
  Post,
  PostResponse,
  PostsResponse,
  PostsVariables,
} from './types';

export async function getPosts(variables?: PostsVariables): Promise<{
  posts: Post[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
}> {
  const client = getClient();
  const { data } = await client.query<PostsResponse>({
    query: GET_POSTS,
    variables: {
      first: 10,
      ...variables,
    },
  });

  return {
    posts: data.posts.edges.map(({ node }) => node),
    pageInfo: data.posts.pageInfo,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = getClient();
  try {
    const { data } = await client.query<PostResponse>({
      query: GET_POST_BY_SLUG,
      variables: {
        id: slug,
      },
    });

    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllPostSlugs() {
  const client = getClient();
  const { data } = await client.query<AllPostSlugsResponse>({
    query: GET_ALL_POST_SLUGS,
  });

  return data.posts.edges.map(({ node }) => ({
    params: {
      slug: node.slug,
    },
  }));
}
