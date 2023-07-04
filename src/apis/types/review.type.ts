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
      comment: {
        commentId: number;
        content: string;
        createdDate: string;
      };
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

//가게 리뷰 댓글 수정 api props type정의
export type putReplyProps = {
  reviewId: any;
  storeId: number;
  commentId: any;
  content: string;
};

//사용자가 댓글 남긴 리스트 가져오기 api response type정의
export type getUserReviewResponse = {
  data: [
    {
      reviewId: number;
      content: string;
      score: number;
      createdDate: string;
      consumerName: string;
      url: string;
      storeId: number;
      storeName: string;
      storeAddress: string;
    }
  ];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
};
