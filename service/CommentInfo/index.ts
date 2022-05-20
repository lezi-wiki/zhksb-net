import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CommentListType, {
    CommentData,
} from "../../model/Comment/commentListType";
import CommentQuery from "../../model/Comment/commentQuery";
import CommentSubmitType from "../../model/Comment/commentSubmitType";

export const baseURL = "https://comment.zhksb.net/";

export const getBaseURL = () => {
    return baseURL;
};

const commentInfo = createApi({
    reducerPath: "comment-info",
    baseQuery: fetchBaseQuery({
        baseUrl: getBaseURL(),
        credentials: "same-origin",
    }),
    tagTypes: ["Comments", "Counts"],
    endpoints: (builder) => ({
        getCount: builder.query<number, CommentQuery>({
            query: (args) => ({
                url: "/comment",
                method: "GET",
                params: {
                    type: "count",
                    url: args.path,
                },
            }),
            transformResponse(response: number, meta, args) {
                return Math.ceil(response / args.pageSize);
            },
            providesTags: ["Counts"],
        }),
        listComments: builder.query<CommentData[], CommentQuery>({
            query: (args) => ({ url: "/comment", method: "GET", params: args }),
            transformResponse(response: CommentListType) {
                return response.data;
            },
            providesTags(result) {
                const arr: Array<{ type: "Comments"; id: number }> = [];
                if (typeof result !== "undefined") {
                    result.map((item) => {
                        arr.push({
                            type: "Comments",
                            id: item.objectId,
                        });
                    });
                }
                return arr;
            },
        }),
        sendComment: builder.mutation<
            { data: CommentData; errmsg: string; errno: number },
            CommentSubmitType
        >({
            query: (data) => ({ url: "/comment", method: "POST", body: data }),
            invalidatesTags: ["Comments", "Counts"],
        }),
    }),
});

export const {
    useGetCountQuery,
    useListCommentsQuery,
    useSendCommentMutation,
} = commentInfo;
export default commentInfo;
