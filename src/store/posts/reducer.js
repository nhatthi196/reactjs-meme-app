import { 
    ACT_LATEST_POSTS, 
    ACT_POPULAR_POSTS, 
    ACT_FETCH_POSTS,
    ACT_FETCH_POST_DETAIL,
    ACT_FETCH_RELATED_AUTHOR_POST,
    ACT_INCREASE_POST_COMMENT_COUNT
} from './actions';

const initialState = {
    latestPosts: [],
    popularPosts: [],
    listArticles: {
        page: 1,
        per_page: 2,
        total_pages: 1,
        total_items: 0,
        items: [],
    },
    mapPostBySlug: {},
    currentPostSlug: '',
    relatedPostsByAuthor: []
}

export default function PostsReducer(state = initialState, action) {
    
    switch (action.type) {
        case ACT_POPULAR_POSTS:
            return {
                ...state,
                popularPosts: action.payload.posts
            }
        case ACT_LATEST_POSTS:
            return {
                ...state,
                latestPosts: action.payload.posts
            }
        case ACT_FETCH_POSTS:
            const data = action.payload;
            const currentPage = data.page
            return {
                ...state,
                listArticles: {
                    items: currentPage === 1 
                        ? data.items 
                        : state.listArticles.items
                            .concat(data.items),
                    page: currentPage,
                    per_page: data.per_page,
                    total_items: data.total_items,
                    total_pages: data.total_pages,         
                }
            }
        case ACT_FETCH_POST_DETAIL:
            const post = action.payload.post;
            return {
                ...state,
                mapPostBySlug: {
                    ...state.mapPostBySlug,
                    [post.slug]: post
                },
                currentPostSlug: post.slug
            }
        case ACT_FETCH_RELATED_AUTHOR_POST:
            return {
                ...state,
                relatedPostsByAuthor: action.payload.posts
            }
        case ACT_INCREASE_POST_COMMENT_COUNT:

            if (!state.mapPostBySlug[state.currentPostSlug]) {
                return state;
            }

            return {
                ...state,
                mapPostBySlug: {
                    ...state.mapPostBySlug,
                    [state.currentPostSlug]: {
                        ...state.mapPostBySlug[state.currentPostSlug],
                        comment_count: state.mapPostBySlug[state.currentPostSlug].comment_count + 1
                    }
                }
            }
        default:
            return state;
    }
}