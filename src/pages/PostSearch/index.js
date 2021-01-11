import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import AppButton from "../../common/AppButton";
import AppCol from "../../common/AppCol";
import AppContainer from "../../common/AppContainer";
import AppRow from "../../common/AppRow";
import MainTitle from "../../common/MainTitle";
import ArticleItem from "../../components/ArticleItem";

import { actFetchListPostsAsync } from '../../store/posts/actions';
import { usePostsPaging } from '../../hooks/usePostsPaging';

export default function PostSearch() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryObj = queryString.parse(location.search);
  const queryStr = queryObj.q;

  const {
    isLoading,
    listArticles,
    handleLoadMore,
    hasMorePosts,
    total_items
  } = usePostsPaging()
 
  useEffect(() => {
    if (!queryStr) {
      history.push('/');
    } else {
      dispatch(actFetchListPostsAsync({
        page: 1,
        search: queryStr
      }))
    }
  }, [history, queryStr, dispatch]);

  

  return (
    <div className="articles-list section">
      <AppContainer>
        <MainTitle isSearch >Tìm kiếm {total_items} kết quả với từ khoá "{queryObj.q}"</MainTitle>
        <AppRow className="tcl-jc-center">
          {
            listArticles.map(post => (
              <AppCol xs={12} md={8} key={post.id}>
                <ArticleItem post={post} isShowCategories isStyleCard isShowAvatar={false} />
              </AppCol>
            ))
          }
        </AppRow>
        
        {
          hasMorePosts &&
          <div className="text-center">
            <AppButton 
              isLoading={isLoading}
              isSizeLarge
              btnType="primary"
              onClick={() => {
                handleLoadMore({
                  search: queryStr
                })
              }}
            >Tải thêm</AppButton>
          </div>
        }
        
      </AppContainer>
    </div>
  )
}