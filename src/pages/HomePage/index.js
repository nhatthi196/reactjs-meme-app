import ArticlesList from '../../components/ArticlesList';
import ArticlesLatest from '../../components/ArticlesLatest';
import ArticlesPopular from '../../components/ArticlesPopular';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    actFetchListPostsAsync,
    actLatestPostsAsync,
    actPopularPostsAsync,
} from '../../store/posts/actions';


function HomePage() { 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actPopularPostsAsync())
        dispatch(actLatestPostsAsync());
        dispatch(actFetchListPostsAsync());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <ArticlesLatest />
            <ArticlesPopular />
            <ArticlesList />
            <div className="spacing"></div>
        </main>
    )
}

export default HomePage