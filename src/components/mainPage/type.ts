export enum top10Title {
  REVIEW = "리뷰",
  RATED = "평점",
  LIKE = "좋아요",
}
export enum top10lderType {
  REVIEW = "MOST_REVIEWED",
  RATED = "TOP_RATED",
  LIKE = "MOST_LIKES_COUNT",
}

export type Top10Type = {
  title: top10Title;
  type: top10lderType;
};

export type cityType = {
  city: string;
  si: Array<any>;
};
