import ArticleItem from '../ArticleItem';
import MainTitle from '../../common/MainTitle';
import AppContainer from '../../common/AppContainer';
import AppRow from '../../common/AppRow';
import AppCol from '../../common/AppCol';
import AppButton from '../../common/AppButton';
import { usePostsPaging } from '../../hooks/usePostsPaging';

export default function ArticlesList() {

  const {
    isLoading: loading,
    listArticles,
    handleLoadMore,
    hasMorePosts,
  } = usePostsPaging();

  return (
    <div className="articles-list section">
			<AppContainer>
        <MainTitle isShowBtn btnProps={{ btnText: 'Xem thêm' }}>Danh sách bài viết</MainTitle>
        <AppRow>
          {
            listArticles.map(post => (
              <AppCol xs={12} md={6} key={post.id} >
                <ArticleItem isStyleCard post={post} isShowAvatar={false} />
              </AppCol>
            ))
          }
        </AppRow>

        {
          hasMorePosts
          ? (
            <div className="text-center">
              <AppButton 
                isLoading={loading}
                isSizeLarge
                btnType="primary"
                onClick={() => {
                  handleLoadMore()
                }}
              >Tải thêm</AppButton>
            </div>
          )
          : null
        }
      </AppContainer>
    </div>
  )
}