import PostDetailAuthor from "./PostDetailAuthor";
import PostRelatedAuthor from "./PostRelatedAuthor";



function PostDetailSidebar(props) {
  return (
    <div className="post-detail__side">
      <PostDetailAuthor />
      <div className="spacing" />
      <PostRelatedAuthor />
    </div>
  )
}

export default PostDetailSidebar;