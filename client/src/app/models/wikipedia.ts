export interface WikiResponsePrototype {
    batchcomplete: string;
    query: {
        normalized: [{}],
        pages: [WikiPageResponsePrototype]
    };
}

export interface WikiPageResponsePrototype {
    extract: string;
    ns: number;
    pageid: number;
    pageimage: string;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
    title: string;
}
