import './ArticlesPopular.css';

import MainTitle from "../../common/MainTitle";
import AppContainer from '../../common/AppContainer';

import ArticleItem from "../ArticleItem";
import { useSelector } from 'react-redux';

const commonProps = {
    isShowDesc: true,
    isStyleCard: true,
    isShowCategories: true,
}

export default function ArticlesPopular() {
    const popularPosts = useSelector(state => state.Posts.popularPosts);

    return (
        <div className="popular-news section bg-white-blue">
            <AppContainer> 
                <MainTitle 
                    isShowBtn 
                    btnProps={{
                        htmlType: 'a',
                        href: '/posts',
                        btnText: 'View more'
                    }}>Bài viết nổi bật</MainTitle>

                <div className="popular-news__list spacing">
                    <div className="popular-news__list--left">
                        <div className="popular-news__list--row">
                            <div className="popular-news__list--card">
                                <ArticleItem {...commonProps} post={popularPosts[0]} />
                            </div>
                            <div className="popular-news__list--card">
                                <ArticleItem {...commonProps} post={popularPosts[1]} />
                            </div>
                        </div>
                    </div>
                    <div className="popular-news__list--right">
                        <div className="popular-news__list--row">
                            <div className="popular-news__list--card">
                                <ArticleItem isStyleRow {...commonProps} post={popularPosts[2]} />
                            </div>
                        </div>
                    </div>
                </div> 
            </AppContainer>
        </div>
    )
}