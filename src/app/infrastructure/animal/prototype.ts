interface Prototype {
  commonName: string;
  scientificName: string;
  description?: string;
  image?: string;
}

export { Prototype as AnimalPrototype };

interface WikiResponse {
  batchcomplete: string;
  query: {
    normalized: [{}],
    pages: [Wikipage]
  };
}

export { WikiResponse as WikiResponsePrototype };

interface Wikipage {
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

export { Wikipage as WikipageResponsePrototype };
