import './related-posts.css';
import PostRelatedCard from "./PostRelatedCard";

function PostRelatedAuthor(props) {
  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      <PostRelatedCard />
      <PostRelatedCard />
      <PostRelatedCard />
    </div>
  )
}

export default PostRelatedAuthor;