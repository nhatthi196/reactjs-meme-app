import { useState } from 'react';
import Loading from '../../common/Loading';
import { useCommentsPaging } from "../../hooks/useCommentsPaging";
import { getDefaultReplyComments } from '../../store/comments/reducer';
import PostCommentForm from './PostCommentForm';
import PostCommentSection from "./PostCommentSection";

function PostCommentItem({ comment, postId }) {
  
  const parentId = comment.id;
  const { 
    isLoading: isReplyLoading,
    listComments: listReplyComments,
    handleLoadMore: handleLoadMoreReply,
    hasMoreComments: hasMoreReplyComments,
    // total_items
  } = useCommentsPaging({
    selectorFunc: (state) => {
      if (state.Comments.hashReplyComments[parentId]) {
        return state.Comments.hashReplyComments[parentId];
      }
      return getDefaultReplyComments();
    }
  });
  const [excludeNewCmtReplyId, setExcludeNewCmtReplyId] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const [valueFormReply, setValueFormReply] = useState('');

  function toggleShowForm(authorName) {
    if (authorName) {
      setValueFormReply(`@${authorName}: `)
      setIsShowForm(true);
    } else {
      setIsShowForm(!isShowForm)
    }
  }

  function onPostCommentSuccess(newId) {
    setExcludeNewCmtReplyId([...excludeNewCmtReplyId, newId])
  }

  return (
    <li className="item">
      <PostCommentSection 
        comment={comment} 
        toggleShowForm={toggleShowForm} 
      />
      
      {
        comment.comment_reply_count > 0 && hasMoreReplyComments &&  (
          <div 
            onClick={() => {
              handleLoadMoreReply({
                postId,
                parentId: comment.id,
                exclude: excludeNewCmtReplyId
              })
            }}
            className="comments__hidden"
          >
            <span>
              <i className="icons ion-ios-undo" /> 
              Xem thêm {comment.comment_reply_count} câu trả lời 
              { isReplyLoading && <Loading /> } 
            </span>
          </div>
        )
      }

      {
        !!listReplyComments?.length && (
          <ul className="comments">
            { 
              listReplyComments.map(replyComment => (
                <li className="item" key={replyComment.id}>
                  <PostCommentSection 
                    comment={replyComment} 
                    toggleShowForm={toggleShowForm} 
                  />
                </li>
              ))
            }
          </ul>
        )
      }

      {/* Reply form */}
      {
        isShowForm && (
          <PostCommentForm
            postId={postId}
            parentId={parentId}
            value={valueFormReply}
            onPostCommentSuccess={onPostCommentSuccess}
            placeholder={`Phản hồi bình luận của ${comment.author_name}`} 
          />
        )
      }
    </li>
  )
}

export default PostCommentItem;