export interface MediaItem {
  id: string;
  sourceUrl: string;
  altText?: string;
  mediaDetails?: {
    width?: number;
    height?: number;
  };
}

export interface Author {
  node: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export interface Category {
  node: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  content: string;
  featuredImage?: {
    node: MediaItem;
  };
  author?: Author;
  categories?: {
    edges: Category[];
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface PostsResponse {
  posts: {
    edges: Array<{
      node: Post;
    }>;
    pageInfo: PageInfo;
  };
}

export interface PostResponse {
  post: Post;
}

export interface PostsVariables {
  first?: number;
  after?: string;
  where?: {
    categoryName?: string;
    search?: string;
  };
}

export interface AllPostSlugsResponse {
  posts: {
    edges: Array<{
      node: {
        slug: string;
      };
    }>;
  };
}
