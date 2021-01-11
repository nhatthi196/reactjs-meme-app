import { Link } from 'react-router-dom';

export default function ArticleItemTitle({
    title,
    slugLink
}) {
    return (
        <h2 className="article-item__title">
            <Link to={slugLink}>{title}</Link>
        </h2>
    )
}