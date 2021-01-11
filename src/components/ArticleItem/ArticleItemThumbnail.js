import { Link } from 'react-router-dom';
import { DEFAULT_THUMB } from '../../constants';

export default function ArticleItemThumbnail({
    thumbnail,
    slugLink,
    title,
}) {
    return (
        <div className="article-item__thumbnail">
            <Link to={slugLink}>
                <img src={thumbnail || DEFAULT_THUMB} alt={title} />
            </Link>
        </div>
    )
}