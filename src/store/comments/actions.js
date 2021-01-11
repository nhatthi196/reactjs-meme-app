import { CommentsService } from "../../services/comments"
import { actIncreaseCommentCount } from "../posts/actions";

// Action Type
export const ACT_SET_COMMENTS = 'ACT_SET_COMMENTS';
export const ACT_POST_COMMENTS = 'ACT_POST_COMMENTS';
export const ACT_RESET_HASH_REPLY_COMMENTS = 'ACT_RESET_HASH_REPLY_COMMENTS';

// Action Creator
export const actFetchComments = ({ 
  items, 
  page, 
  per_page, 
  total_items,
  total_pages,
  parentId
} = {}) => {
  return {
    type: ACT_SET_COMMENTS,
    payload: { 
      items, 
      page, 
      per_page, 
      total_pages, 
      total_items,
      parentId
    }
  }
}

export const actPostComment = ({
  parentId,
  newComment
}) => {
  return {
    type: ACT_POST_COMMENTS,
    payload: {
      parentId,
      newComment
    }
  }
}

export const actResetHashReplyComments = () => {
  return {
    type: ACT_RESET_HASH_REPLY_COMMENTS
  }
}


export const actFetchCommentsAsync = ({ 
  postId, 
  parentId = 0,
  per_page = 3, 
  page = 1,
  ...restParams
}) => {
  return async dispatch => {
    try {
      const response = await CommentsService.getCommentsByPostId({
        postId,
        parentId,
        per_page,
        page,
        ...restParams
      })

      const total_items = Number(response.headers['x-wp-total']);
      const total_pages = Number(response.headers['x-wp-totalpages']);
      const items = response.data;

      // Nếu parentId = 0 -> Xử lý cho thằng cha
      // Nếu parentId != 0 -> Xử lý cho reply

      dispatch(actFetchComments({ 
        page,
        per_page,
        total_items,
        total_pages,
        items,
        parentId
      }));

    } catch(e) {

    }
  }
}

export const actPostCommentAsync = ({
  author,
  content,
  post,
  parent = 0
}) => {

  if (!author || !content || !post) {
    return;
  }

  return async (dispatch, getState) => {
    try {
      // const rootState = getState();
      // const currentPostSlug = rootState.Posts.currentPostSlug
      const response = await CommentsService.postNewComment({
        author,
        content,
        post,
        parent
      })
      
      dispatch(actPostComment({
        parentId: parent,
        newComment: response.data
      }));
      dispatch(actIncreaseCommentCount());

      return {
        ok: true,
        comment: response.data
      }

    } catch(e) {
      return {
        ok: false
      }
    }
  }
}