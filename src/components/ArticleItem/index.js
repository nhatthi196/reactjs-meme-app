import './ArticleItem.css';

import ArticleItemInfor from "./ArticleItemInfor";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemThumbnail from "./ArticleItemThumbnail";
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemStats from './ArticleItemStats';
import cls from 'classnames';

function ArticleItem({
    post,
    isStyleRow,
    isStyleCard,
    isShowDesc,
    isShowAvatar = true,
    isShowCategories,
}) {

    const classes = cls('article-item', {
        'style-row': isStyleRow,
        'style-card': isStyleCard,
    })

    if (!post) {
        return null;
    }
    
    const slugLink = `/post/${post.slug}`;
    const authorLink = `/author/${post.author}`;

    return (
        <article className={classes}>
            <ArticleItemThumbnail 
                slugLink={slugLink}
                title={post.title.rendered}
                thumbnail={post.featured_media_url}
            />
            <div className="article-item__content">
                { isShowCategories && <ArticleItemCategories categoriesId={post.categories} /> }
                { isShowCategories && <ArticleItemStats view_count={post.view_count} /> }
                <ArticleItemTitle 
                    slugLink={slugLink}
                    title={post.title.rendered}
                />
                { isShowDesc && <ArticleItemDesc shortDesc={post.excerpt.rendered} /> }
                <ArticleItemInfor 
                    created={post.date}
                    authorId={post.author}
                    authorLink={authorLink}
                    authorName={post.author_data.nickname}
                    authorAvatar={post.author_data.avatar}
                    isShowAvatar={isShowAvatar}
                />
            </div>
        </article>
    )
}

// ArticleItem.defaultProps = {

// }

export default ArticleItem