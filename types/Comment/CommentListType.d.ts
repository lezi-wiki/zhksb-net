export interface CommentListType {
    page: number;
    totalPages: number;
    pageSize: number;
    count: number;
    data: Datum[];
}

export interface Datum {
    link: string;
    nick: string;
    pid: null;
    rid: null;
    comment: string;
    insertedAt: Date;
    status: string;
    objectId: string;
    browser: string;
    os: string;
    avatar: string;
    children?: Datum[];
}
