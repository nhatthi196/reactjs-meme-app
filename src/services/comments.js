import api from '.';

export const CommentsService = {
  getCommentsByPostId: ({ 
    postId, 
    parentId = 0, 
    per_page = 3, 
    page = 1,
    ...restParams
  }) => {
    return api.get('/wp/v2/comments', {
      params: {
        page,
        per_page: 2,
        post: postId,
        parent: parentId,
        order: 'asc',
        ...restParams
      }
    })
  },
  postNewComment: ({
    author,
    content,
    post,
    parent
  }) => {
    return api.post('/wp/v2/comments', {
      author,
      content,
      post,
      parent
    })
  }
}