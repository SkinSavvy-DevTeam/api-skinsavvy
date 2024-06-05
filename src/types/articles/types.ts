export type ArticlePayload = {
  title: string;
  body: string;
  categoryName: string;
  thumbnailId: string;
};

export type ArticleQuery = {
  filterByTitle: string;
};

export type ArticleIdPathParameter = {
  id: string;
};

export type ArticleFilteredFormatted = {
  fullArticles: ({
    category: {
      name: string;
    };
    thumbnail: {
      url: string;
    };
  } & {
    articleId?: string;
    categoryId?: string;
    thumbnailId?: string;
    assignedAt?: Date;
  })[];
} & {
  id: string;
  title: string;
  body: string;
};

export type ArticleFormatted = {
  article: {
    id: string;
    title: string;
    body: string;
  };
  category: {
    name: string;
  };
  thumbnail: {
    url: string;
  };
};

