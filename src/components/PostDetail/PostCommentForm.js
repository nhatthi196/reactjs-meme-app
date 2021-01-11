import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "../../store/auth/selectors";
import AppButton from '../../common/AppButton';
import { actPostCommentAsync } from "../../store/comments/actions";

export default function PostCommentForm({
  postId,
  parentId = 0,
  value: externalValue = '',
  placeholder = 'Để lại bình luận ở đây ...',
  onPostCommentSuccess
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser)
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(externalValue)
  }, [externalValue])

  if (!currentUser) {
    return null;
  }

  function handleChange(evt) {
    setValue(evt.target.value);
  }

  async function handleSubmit() {
    if (isLoading || !value.trim()) {
      return;
    }

    setIsLoading(true)
    const res = await dispatch(actPostCommentAsync({
      author: currentUser.id,
      content: value.trim(),
      post: postId,
      parent: parentId
    }))

    if (res.ok && onPostCommentSuccess) {
      setValue('');
      onPostCommentSuccess(res.comment.id);
    }

    setIsLoading(false)
  }

  const avatarNumber = (currentUser.id % 4) + 1;
  const authorAvatar = currentUser.simple_local_avatar?.full;
  const srcAvatar = authorAvatar 
      ? authorAvatar 
      : `/assets/images/avatar${avatarNumber}.jpg`;

  return (
    <div className="comments__form">
      <div className="comments__form--control">
        <div className="comments__section--avatar">
          <a href="/">
            <img src={srcAvatar} alt="" />
          </a>
        </div>
        <textarea value={value} placeholder={placeholder} onChange={handleChange} />
      </div>
      <div className="text-right">
        <AppButton 
          btnType="primary"
          isLoading={isLoading}
          onClick={handleSubmit}
        >Bình luận</AppButton>
      </div>
    </div>
  )
}