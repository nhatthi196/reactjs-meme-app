import './post-detail.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AppContainer from '../../common/AppContainer/index'
import PostDetailHead from "../../components/PostDetail/PostDetailHead"
import PostDetailContent from "../../components/PostDetail/PostDetailContent"
import PostDetailSidebar from "../../components/PostDetail/PostDetailSidebar"
import { actFetchPostDetailAsync } from '../../store/posts/actions';
import PageNotFound from '../PageNotFound';
import Loading from '../../common/Loading';
import { actFetchCommentsAsync, actResetHashReplyComments } from '../../store/comments/actions';

function PostDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const slug = params.slug;
    const [fetchStatus, setFetchStatus] = useState('loading');

    useEffect(() => {
        // Unmount
        return () => {
            dispatch(actResetHashReplyComments())
        }
    }, [])

    useEffect(() => {
        setFetchStatus('loading');
        dispatch(actFetchPostDetailAsync({ slug }))
            .then(res => {
                if (!res.ok) {
                    setFetchStatus('failed');
                } else {
                    setFetchStatus('success');
                    dispatch(actFetchCommentsAsync({ postId: res.post.id }));
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])

    if (fetchStatus === 'failed') {
        return <PageNotFound />
    }
    if (fetchStatus === 'loading') {
        return <Loading isFixed />
    }

    // Loading xong roi

    return (
        <main className="post-detail">
            <div className="spacing" />
            <PostDetailHead />

            <div className="spacing" />
            
            <div className="post-detail__fluid">
                <AppContainer>
                    <div className="post-detail__wrapper">
                        <PostDetailContent />

                        <PostDetailSidebar />
                    </div>
                </AppContainer>
            </div>
        </main>

    )
}

export default PostDetail