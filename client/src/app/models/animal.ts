export interface Animal {
    id: string;
    classis: string;
    status: string;
    commonName: string;
    scientificName: string;
    description?: string | null;
    image?: string | null;
}
