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
