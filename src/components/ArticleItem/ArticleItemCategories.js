import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function ArticleItemCategories({
    categoriesId
}) {
    const hashList = useSelector(state => state.Categories.hashList);

    return (
        <ul className="article-item__categories">
            {
                categoriesId.map(cateId => {
                    const category = hashList[cateId];
                    if (!category) {
                        return null;
                    }
                    
                    const slugLink = `/category/${category.slug}`;
                    return (
                        <li key={cateId}><Link to={slugLink} className="btn btn-category">{category.name}</Link></li>
                    )
                })
            }
        </ul>
    )
}