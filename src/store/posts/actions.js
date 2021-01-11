import { PostService } from "../../services/posts";
import { actFetchCommentsAsync } from "../comments/actions";
import { actFetchUserByIdAsync } from "../users/actions";

export const ACT_POPULAR_POSTS = 'ACT_POPULAR_POSTS';
export const ACT_LATEST_POSTS = 'ACT_LATEST_POSTS';
export const ACT_FETCH_POSTS = 'ACT_FETCH_POSTS';
export const ACT_FETCH_POST_DETAIL = 'ACT_FETCH_POST_DETAIL';
export const ACT_FETCH_RELATED_AUTHOR_POST = 'ACT_FETCH_RELATED_AUTHOR_POST';
export const ACT_INCREASE_POST_COMMENT_COUNT = 'ACT_INCREASE_POST_COMMENT_COUNT'

export function actSetPopularPosts({ posts = [] } = {}) {
  return {
    type: ACT_POPULAR_POSTS,
    payload: { posts }
  }
}
export function actSetLatestPosts({ posts = [] } = {}) {
  return {
    type: ACT_LATEST_POSTS,
    payload: { posts }
  }
}
export function actFetchListPosts({ 
  items, 
  page, 
  per_page, 
  total_items,
  total_pages 
} = {}) {
  return {
    type: ACT_FETCH_POSTS,
    payload: { items, page, per_page, total_pages, total_items }
  }
}
export function actFetchPostDetail({ post }) {
  return {
    type: ACT_FETCH_POST_DETAIL,
    payload: { post }
  }
}
export function actFetchRelatedAuthorPost({ posts }) {
  return {
    type: ACT_FETCH_RELATED_AUTHOR_POST,
    payload: { posts }
  }
}
export function actIncreaseCommentCount() {
  return {
    type: ACT_INCREASE_POST_COMMENT_COUNT
  }
}

// Action Async 

export function actFetchRelatedAuthorPostAsync({ author: authorId }) {
  return async function(dispatch) {
    try {
      const response = await PostService.getRelatedPostByAuthor(authorId);
      const posts = response.data;
      dispatch(actFetchRelatedAuthorPost({ posts }))
    } catch(e) { }
  }
}

export function actPopularPostsAsync() {
  return async function(dispatch) {
    try {
      const response = await PostService.popularPost();
      const posts = response.data;
      dispatch(actSetPopularPosts({ posts }))
      return {
        ok: true,
        data: response.data
      }
    } catch(e) {
      return {
        ok: false,
        error: e
      }
    }
  }
}

export function actLatestPostsAsync() {
  return async (dispatch) => {
    try {
      const response = await PostService.listPost();
      const posts = response.data;
      dispatch(actSetLatestPosts({ posts }));
    } catch(e) {
      // Handle error
    }
  }
}

export function actFetchListPostsAsync({
  page = 1,
  per_page = 2,
  ...restParams
} = {}) {
  return async (dispatch) => {
    try {
      const response = await PostService.listPost({
        page,
        per_page,
        ...restParams
      });
      const total_items = Number(response.headers['x-wp-total']);
      const total_pages = Number(response.headers['x-wp-totalpages']);
      const items = response.data;
      dispatch(actFetchListPosts({ 
        page,
        per_page,
        total_items,
        total_pages,
        items,
      }));
      // 
    } catch(e) {
      // Handle error
    }
  }
}

export function actFetchPostDetailAsync({ slug }) {
  return async (dispatch, getRootState) => {
    try {
      const rootState = getRootState();
      const mapPostBySlug = rootState.Posts.mapPostBySlug;

      if (mapPostBySlug[slug]) {
        return { ok: true, post: mapPostBySlug[slug] }
      }

      const response = await PostService.getPostBySlug(slug);
      const post = response.data[0];
      
      if (!post) {
        throw new Error('No post');
      }

      const postId = post.id;
      const userId = post.author;

      dispatch(actFetchUserByIdAsync({ userId }));
      dispatch(actFetchRelatedAuthorPostAsync({ author: userId }))
      dispatch(actFetchPostDetail({ post }));
      // dispatch(actFetchCommentsAsync({ postId }));

      return {
        ok: true,
        post,
      }

    } catch(e) {
      return {
        ok: false,
        error: e
      }
    }
  }
}

// async function delay(seconds) {
//  return new Promise(resolve => {
//   setTimeout(() => {
//     resolve({});
//   }, seconds * 1000);
//  })
// }

/*

Homepage
  Dispatch 2 action async (LatestPost, PopularPost)
  Sau khi action async chạy xong -> Có dữ liệu 
  Dispatch 2 action sync 
    -> Đẩy qua reducer


Pagination 
  - Current Page : Trang hiện tại là bao nhiêu? Trang 1, Trang 2, 3, ...
  - Per page : Số lượng item trong mỗi page (Số lượng phần tử lấy về trong mỗi request)
  - Tổng số trang (Tổng số phần tử)

*/