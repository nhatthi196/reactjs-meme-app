import { useSelector } from 'react-redux';
import { getCurrentUser } from "../../store/auth/selectors";

function PostCommentSection({ 
  comment, 
  toggleShowForm 
}) {
  const currentUser = useSelector(getCurrentUser)

  if (!comment) {
    return null;
  }

  const authorId = comment.author;
  const avatarNumber = (authorId % 4) + 1;
  const authorAvatar = comment.author_data.avatar;
  const srcAvatar = authorAvatar 
      ? authorAvatar 
      : `/assets/images/avatar${avatarNumber}.jpg`;

  return (
    <div className="comments__section">
      <div className="comments__section--avatar">
        <a href="/">
          <img src={srcAvatar} alt="" />
        </a>
      </div>
      <div className="comments__section--content">
        <a href="/" className="comments__section--user">{comment.author_name}</a>
        <p className="comments__section--time">2 minutes ago</p>
        <div className="comments__section--text" dangerouslySetInnerHTML={{
          __html: comment.content.rendered
        }}></div>
        {
          currentUser && <i className="ion-reply comments__section--reply" onClick={() => {
            if (comment.parent !== 0) {
              toggleShowForm(comment.author_name);
            } else {
              toggleShowForm();
            }
          }} />
        }
      </div>
    </div>
  )
}

export default PostCommentSection;