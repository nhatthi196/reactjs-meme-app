export default function ArticleItemDesc({
    shortDesc
}) {
    
    let str = shortDesc
        .replace('<p>', '')
        .replace('</p>', '')
        .split(' ')
        .slice(0, 20)
        .join(' ')

    if (str !== shortDesc) {
        str += '...'
    }

    return (
        <p className="article-item__desc">{ str }</p>
    )
}