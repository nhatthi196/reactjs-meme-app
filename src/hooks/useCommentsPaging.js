import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchCommentsAsync } from '../store/comments/actions';

export function useCommentsPaging({
  selectorFunc = state => state.Comments.listComments
} = {}) {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const commentsPaging = useSelector(selectorFunc);
  const listComments = commentsPaging.items;
  const { page, total_pages, total_items } = commentsPaging;

  async function handleLoadMore({ ...extraParams } = {}) {  
    if (isLoading) {
      return;
    }

    if (page < total_pages) {
      setIsLoading(true);
      await dispatch(actFetchCommentsAsync({
        page: page + 1,
        ...extraParams
      }))
      setIsLoading(false);
    }
  }

  const hasMoreComments = page < total_pages;

  return {
    isLoading,
    listComments,
    handleLoadMore,
    hasMoreComments,
    total_items
  }
}
