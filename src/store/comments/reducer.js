import { ACT_POST_COMMENTS, ACT_RESET_HASH_REPLY_COMMENTS, ACT_SET_COMMENTS } from "./actions";

const initialState = {
    // comments: [],
    listComments: {
        page: 1,
        per_page: 2,
        total_pages: 1,
        total_items: 0,
        items: []
    },
    hashReplyComments: {
        // [id-comment-parent] -> replyCommentsPaging
        // 20: {
        //     page: 1,
        //     per_page: 2,
        //     total_pages: 1,
        //     total_items: 0,
        //     items: [],
        // },
        // 30: {
        //     page: 1,
        //     per_page: 2,
        //     total_pages: 1,
        //     total_items: 0,
        //     items: [],
        // }
    }
}

export function getDefaultReplyComments() {
    return {
        page: 0,
        per_page: 2,
        total_pages: 1,
        total_items: 0,
        items: [],
    }
}

/*
{
    page: 0,
    per_page: 2,
    total_pages: 1,
    total_items: 0,
    items: [{}],
}
*/

export default function CommentsReducer(state = initialState, action) {

    switch (action.type) {
        case ACT_SET_COMMENTS:
            const { parentId, ...data } = action.payload;
            const currentPage = data.page;

            if (parentId === 0) {
                return {
                    ...state,
                    listComments: {
                        items: currentPage === 1
                            ? data.items
                            : state.listComments.items
                                .concat(data.items),
                        page: currentPage,
                        per_page: data.per_page,
                        total_items: data.total_items,
                        total_pages: data.total_pages,
                    }
                }
            }

            const currentReply = state.hashReplyComments[parentId] || getDefaultReplyComments()
            
            /*
                1. User chưa đăng bình luận mới. Nhấn vào fetch dữ liệu
                {
                    items: [{}, {}],
                    page: 0,
                    per_page: 2,
                    total_pages: 1,
                    total_items: 0,
                }

                2. User đã đăng một số bình luận mới (1, nhiều, ...)
                {
                    items: [{}, {}, {}],
                    page: 0,
                    per_page: 2,
                    total_pages: 1,
                    total_items: 0,
                }
            */
            // currentPage -> từ action cộng lên truyền vào
            // thực tế trong store vẫn đang có page = 0 
            return {
                ...state,
                hashReplyComments: {
                    ...state.hashReplyComments,
                    [parentId]: {
                        items: currentPage === 1
                            ? currentReply === 0 && currentReply.items.length ? 
                                currentReply.items.concat(data.items) : 
                                data.items
                            : currentReply.items
                                .concat(data.items),
                        page: currentPage,
                        per_page: data.per_page,
                        total_items: data.total_items,
                        total_pages: data.total_pages,
                    }
                }
            }

        case ACT_POST_COMMENTS:
            // IIFE
            return (() => {
                const parentId = action.payload.parentId;
                const { newComment } = action.payload;
                if (parentId === 0) {
                    return {
                        ...state,
                        listComments: {
                            ...state.listComments,
                            items: [
                                ...state.listComments.items,
                                newComment
                            ]
                        }
                    }
                }
                const currentReply = state.hashReplyComments[parentId] || getDefaultReplyComments()
                return {
                    ...state,
                    hashReplyComments: {
                        ...state.hashReplyComments,
                        [parentId]: {
                            ...currentReply,
                            items: [
                                ...currentReply.items,
                                newComment
                            ]
                        }
                    }
                };
            })()
        case ACT_RESET_HASH_REPLY_COMMENTS:
            return {
                ...state,
                hashReplyComments: {}
            }
        default:
            return state;
    }


}