export default interface CommentListType {
    page: number;
    totalPages: number;
    pageSize: number;
    count: number;
    data: CommentData[];
}

export interface CommentData {
    like: number;
    link: string;
    nick: string;
    addr: string;
    pid: number | null;
    rid: number | null;
    comment: string;
    insertedAt: Date;
    status: string;
    objectId: number;
    browser: string;
    os: string;
    avatar: string;
    children: CommentData[];
}
