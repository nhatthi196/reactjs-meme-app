export default function ArticleItemStats({
    view_count
}) {
    return (
        <ul className="article-item__stats">
            <li>
                <i className="icons ion-ios-eye"></i>
                <span className="text">{view_count}</span>
            </li>
        </ul>
    )
}