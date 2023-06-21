import React from "react";
import Top10 from "./Top10";
import { top10Title, top10lderType } from "./type";

const DefaultContents = () => {
  return (
    <>
      <Top10 title={top10Title.REVIEW} type={top10lderType.REVIEW} />
      <Top10 title={top10Title.RATED} type={top10lderType.RATED} />
      <Top10 title={top10Title.LIKE} type={top10lderType.LIKE} />
    </>
  );
};

export default DefaultContents;
