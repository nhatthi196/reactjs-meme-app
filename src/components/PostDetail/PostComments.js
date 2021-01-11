import './comments.css';
import PostCommentItem from "./PostCommentItem";
import AppButton from '../../common/AppButton';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useCommentsPaging } from '../../hooks/useCommentsPaging';
import PostCommentForm from './PostCommentForm';
import { getCurrentUser } from '../../store/auth/selectors';
import { useState } from 'react';

function PostComments(props) {
  const params = useParams();
  const slug = params.slug;
  const currentUser = useSelector(getCurrentUser)
  const [excludeNewPostId, setExcludeNewPostId] = useState([]);
  const postDetail = useSelector(state => state.Posts.mapPostBySlug[slug])
  const { 
    isLoading,
    listComments,
    handleLoadMore,
    hasMoreComments,
    total_items
  } = useCommentsPaging();

  function onPostCommentSuccess(newId) {
    setExcludeNewPostId([...excludeNewPostId, newId])
  }

  return (
    <div className="post-detail__comments">
      { !currentUser && <p>Bạn phải <Link to="/login">đăng nhập</Link> để bình luận bài viết này.</p> }
      
      <PostCommentForm 
        postId={postDetail.id}
        onPostCommentSuccess={onPostCommentSuccess}
      />
      
      <p>{postDetail.comment_count} Comments</p>
      <ul className="comments">

        {/* Parent Comment */}
        {
          listComments.map(comment => {
            return (
              <PostCommentItem 
                key={comment.id} 
                comment={comment}
                postId={postDetail.id}
              />
            )
          })
        }
      </ul>

      {
        hasMoreComments
        ? (
          <div className="text-center">
            <AppButton 
              isLoading={isLoading}
              btnType="primary"
              onClick={() => {
                // Loại trừ bớt những item mới được thêm vào
                handleLoadMore({
                  postId: postDetail.id,
                  exclude: excludeNewPostId,
                })
              }}
            >Tải thêm</AppButton>
          </div>
        )
        : null
      }
    </div>
  )
}

export default PostComments;