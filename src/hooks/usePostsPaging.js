import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchListPostsAsync } from '../store/posts/actions';

export function usePostsPaging() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const articlePaging = useSelector(state => state.Posts.listArticles);
  const listArticles = articlePaging.items;
  const { page, total_pages, total_items } = articlePaging;

  async function handleLoadMore({ ...extraParams } = {}) {  
    // debugger;
    if (page < total_pages) {
      // Goi them data
      setIsLoading(true);
      await dispatch(actFetchListPostsAsync({
        page: page + 1,
        ...extraParams
      }))
      setIsLoading(false);
    }
  }

  const hasMorePosts = page < total_pages;

  // const hasMorePosts = useMemo(() => {
  //   return page < total_pages 
  // }, [page, total_pages])
  return {
    isLoading,
    listArticles,
    handleLoadMore,
    hasMorePosts,
    total_items
  }
}