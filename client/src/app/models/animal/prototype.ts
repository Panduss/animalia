export interface AnimalPrototype {
    id: string;
    classis: string;
    status: string;
    commonName: string;
    scientificName: string;
    description?: string | null;
    image?: string | null;
}

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
