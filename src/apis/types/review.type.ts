//리뷰 등록 api props type정의
export type postReviewProps = {
  consumerId: string | null;
  storeId: number;
  content: string;
  score: number;
};

//가게 리뷰리스트 가져오기 api response type정의
export type getStoreReviewResponse = {
  data: [
    {
      reviewId: number;
      content: string;
      score: number;
      createdDate: string;
      consumerName: string;
      consumerId: number;
      consumerAvgScore: number;
    }
  ];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
};

//가게 댓글 대댓글 달기 api response type정의
export type postStoreReviewReplyResponse = {
  data: {
    commentId: number;
    content: string;
    isOwner: boolean;
    createDate: string;
  };
};
