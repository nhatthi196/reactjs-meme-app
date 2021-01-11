import './ArticlesLatest.css';
import { useSelector } from 'react-redux';
import ArticleItem from '../ArticleItem';
import MainTitle from '../../common/MainTitle';
import AppContainer from '../../common/AppContainer';

export default function ArticlesLatest() {
    const latestPosts = useSelector(state => state.Posts.latestPosts);

    return (
        <div className="latest-news section">
            <AppContainer>

                <MainTitle isShowBtn btnProps={{ btnText: 'Xem thêm' }}>Bài viết gần đây</MainTitle>

                {/* Latest News List */}
                <div className="latest-news__list spacing">

                    {
                        latestPosts.map(post => (
                            <div key={post.id} className="latest-news__card">
                                <ArticleItem post={post} />
                            </div>
                        ))
                    }
                </div>
                {/* End Latest News List */}
            </AppContainer>
        </div>
    );
}
