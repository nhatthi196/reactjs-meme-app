import api from '.';

export const PostService = {
  popularPost: () => {
    return PostService.listPost({
      orderby: 'post_views'
    })
  },
  latestPost: () => {
    return PostService.listPost();
  },
  listPost: ({ per_page = 3, page = 1, ...restParams } = {}) => {
    return api.get('/wp/v2/posts', {
      params: {
        page,
        per_page,
        ...restParams
      }
    })
  },
  getPostBySlug: (slug) => {
    return PostService.listPost({
      slug
    })
  },
  getRelatedPostByAuthor: (authorId) => {
    return PostService.listPost({
      author: authorId
    })
  }
}