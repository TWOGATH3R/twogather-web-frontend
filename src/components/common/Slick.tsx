import { useMemo } from "react";
import styled from "styled-components";
import Slider, { Settings } from "react-slick";
import { ReactComponent as Next } from "../../assets/next-arrow-icon.svg";
import { ReactComponent as Prev } from "../../assets/prev-arrow-icon.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
}

function Slick({
  children,
  className,
  autoplay = true,
  speed = 300,
  loop = true,
}: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      nextArrow: (
        <Div>
          <Next />
        </Div>
      ),
      prevArrow: (
        <DivPre>
          <Prev />
        </DivPre>
      ),
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    }),
    [autoplay, loop, speed]
  );
  return (
    <SlideWrapper className={className}>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
}
const SlideWrapper = styled.section`
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;
export default Slick;
