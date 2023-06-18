import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTop10List } from "../../apis/queries/mainQuery";

const LikeTop10 = () => {
  const [storeList, setStoreList] = useState<Array<Object> | undefined>();

  const { mutate: Top10List } = useMutation(
    () => {
      const type: string = "MOST_LIKES_COUNT";
      const count: string = storeList ? "10" : "3";
      return getTop10List(type, count);
    },
    {
      onSuccess: (res) => {
        setStoreList(res.data);
      },
    }
  );

  //onClick
  const seeMoreBtnOnClick = () => {
    Top10List();
  };

  useEffect(() => {
    Top10List();
  }, []);

  return (
    <LikeContainer>
      <Title>좋아요 많은 Top10</Title>
      <SeeMoreInput id="Like" type="checkbox" />
      <Like10List>
        {Array.isArray(storeList)
          ? storeList.map((value: any, index: any) => (
              <Like10Item key={index}>
                <Link to={"/"}>
                  <StoreImgBox>
                    <StoreImg src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHkAogMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xABBEAACAQMCAwUECAQEBQUAAAABAgMABBEFIRIxQQYTIlFhMnGRoQcUQlKBscHRFWLh8CMzcnMkNDWC8VNUdJLC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJBEAAgICAgICAgMAAAAAAAAAAAECEQMhEjEiQQQyUWEjcfD/2gAMAwEAAhEDEQA/AJpbt+0Pai41O6Vms7aTEanfH3R8N/hWnazJtYY7Zl7xpMybdQOX4cXx91MZ7eLszo8ccn+e0alwT7czqCfwUfkPOhdG0qTUDZyXSskEKG4uGOcsC2QPecfnSt2y6pIf6fp0WkdkEW8Lo8jh5JV6ZIGPgdq57r2uwvcX8GigIt04RmQ48CDhVfUHGT76K+kLtfJqki2NjxJAgCyDHNh5dcbDypHp1tFY2ou7kAOT/hqObGmukTSsY2KxaPZNPeDjnl9mLqx6UdcO91o/1iY+KSJSQvLJxyzVVvbtpJDJOcsdgB09BVrk/wALR0iJ3VEU/KpTLY9sryacJrG8lOTwADNX76MdChu7ZzcE93HIzFAccfhXY+lVzTI89n9WcjlwD50z0ea5OkJHHK0NvJOwmVdjImEGM9Bk9KdPRHJ2y365rK2UIFgA9x4FaRADHDgn2QOeM8+VILC7js43vNQuS8khk4pCeIueEgY+VLdQvI1ijhs2lmvASFVTlQBn4nlRuhdmJ9SlSW/KniOA7nwE+X8zbHYbe+ty/Aqh7Yp0uO91AJHGCtsTjJGeM/yj7X4bedXrRey8NqI21GQW6zP3aIX8crHoT8fCKku5ouykwaO2S64EhMhGTKQ7MDw9AMKMAetB/wAV/i9/pFxPIZrSW6uIFIGCqsSEYeoC4PvNUjhk/J9GllS8UX63hito1jjQIi7KFGBUuctk9OVVJdY0rS9YNjFHPcXbhYZJA3EcdBgnlvmrUnhUcPLHs0lmaaNm3U0MjZT86KB8JpeSQSFPvPlRMbkcYx05E0BqGnW19A0dxErDpkcqOLDmu2OlaPhm/l6nzoGo57rXZOeIG4tOJ1G438a/j1/H41t2e7ZPphFhqwLRqcLKowyZ+8Kvcux8/wBTXNfpHtRHqFnImBxQke8hv60GUjvTOhLr2ksoYajbYIzvIKyuG8T+Unz/AHrKW2PwiW/tO8HajtBYGBm7ic8aH2fBjr5ezWfSH2mg063k0rSCFaQYkZDsRj/wMf1of6sJL9SAywxLwgdfdt6Uu7RafBJqCSvaXEsneLHIUO3FwghNzzwR0/GtF7DLHfRXNN0x+6a/ulJjBzvzbYn9KilvTez5Lbk8Kg9M8gKcxyvOmomTwJGgRIwPY5jGPPzqDRNNS4urVm63ijOPLejdsWSqId2S7ITapdxyXsblSTwwgbnHVvuimGtAKJUGwEnCNvWr5d6ra2Ek0ejpD9Y73xyD2QScZ/mPP0HyqhagrXU8kUILMZCdvfSzBge2yDRpsaHq8cqBV7yLg39snc4orT7TUNUjjtbSN0hLHxhcs+eHOPTwjyHrTXTeybw2gvtQQ9zxoAMfeIAwDz58z8DRt44W1tnjIgeKSNnKEgkhmOd9+QHwp4QcgtLckOND7J6dpiq+oSwBuJUMZkG7E+EE9ST0ofWtbttQ0o2vcTwG3uFz3SEBgGZCEwcnoDy57Uh1O8jVGvXCkXFxJKylvZbK4KjHPGR0xnPnSPUtSnlDrbPKeMkFyAu2SQMDpv1znbyqyWPHu7IJTyDS41i1tYBD43kQRiOPJ8ASR3Az1A48fhzoa21S5dIVjt1DRFyjg9WO7Y5ZP7+ZoK0sbW3VJNTu4oQ/2pXAyaf2etdlbJQJtTgYrtxRoz5+ANSeSUi8cSXSHPZLTSl015dgvM7Fi7dSavqEdeS9TXMbr6T9Esl7rS4nnJ2MssbJGv4EZPwHvqm6/wDSJc6gTFF3l2OgkJjhz/tKfF/3sfdQRpQl7R2fVO1OmWnEIZvrE424YNxn1PKhLHtFp9yoVpDBIeYl239/L8q5vp9vFqejw6jp6iFyuJo4xwhXHPYbc96iMtzA2HBbHM4pbdk6Owq4bHCQQd+IHbHnW2Rw4HIflXKrHX7i0OIZ3izzXO3w5VYrHtiHAW8iz/PDt8v60VI1FvzxbkjPSqH9KC8MenygbcTqfTl+1W601azvVBtp0ZvuDZvgd6qv0mrnSbZid1uQMj1Rv2FZsaH2KB3o8z8Kyhv+6spDpLs1xDbxd9cMUhjxxEcyfIetV7V9QM2sSta39zZ3CPkruyOwAHGMcjjGcj8aX315c6jq6WuMRQyBVA5c9yfWjLBVk1m7mdeNYyG4fMcY/aitE3JraDtUs2tdLhuHnM0t6GmkJThGS3IDy3qHSVSLT4pZCAO+kO/XCgUz7SXjas0QVVGFUFFOeDrgmp9B7LXF13feFhCDlBzJ8+Efqa3sV047ItOjvdbvhbW5MSsNznhJA/IfE71bHstP7NRjAW5v1YO+BxLHyxkczz674zyoLSrzSp7rVdA0q3kkvIIJFmbh9pkcKyluZOfIYpRq9xf20c0bQNHOTmRpBjhzg888/htVYqK3Ilt+MeixNqF9cM8V02LdOF08RODxocHzAKnB8iaRTazFbKGijNw8L+FSp4WB4hz67MRj+lVp722gXBmlvJ2GCqtt7if7FQyXl1e4SQrDGq4CIPdWlkb6Or4/xZy8Y7sNN3Y20Ekl07s7uWjiBJ4R93J6dMULLfTXOTDGsMfUH+9/72oGeKNcMeucsTkmoTfhRiPhPqd/lSUdqwYcEv5XYu1q/kW4aCSVjErcaJ0BwBSk3LueGJPjTl4I7u4M0qmRztxYwtFR2yhCiIqjqFGM0bRyZM1t8NIr0UE9w24bbnk4AptpelxtL/iCSRhuEjx8zTi0sUZhwKAW6irVpOmLDhkUevrWsg3J9s27HQ3lo72YtUFrOeLGSCjb5bPXOfyqwXGlxPHgKB0NMdKgVQWxg+VEXMXiKj7XM+VChCi3ujLIzbHA2z5mktxY3Fu2I2Oc/wBmuj3NsAOLGABg+gpVLaK7GRl57Y9KFGKJLe3VsnFwcWD543rLzXdQvrRbW8lYwBg6q5yQRkDc++rB2isEi0u6nKHhhTjbh3O29Va2v7S5jCCSMk/YJwfgf0oDxdMgzWUx+rQ/+g3/ANTWUpTmibQisc13csisWkKLxdDg7j13rLC1ljEzueESndQNzvn8KJsre1t7OVnkw3FwAkE8LZA4gBz26Vq/EbkT27MunqnAXn4V436tk8vLG59KLiwKrYRBqNhZxmLEkE8M1u7zYBUIz8h7+EgnyO2+1LR2t15Yb3TNEWLT4ReTtNcxuXZuKQk+NuW+emfUULOP4xPFdsscaRoIwow2cZ3JIzn05DfFevcWNunC0yyEc1GD8htVV0NH4rn5TdIL7H303Zu8uby1T65d3EZQySk8AJYMSfvHIqXWbi71SRrjVLtpGYcRVfAi/CkL660svd2yKBvjJyf6UNfRSmPvb6aWQKAwTI3+WB8KBZT+Nh+q5MKN/awqRB49+UQ269eVQC5vrhyYU7hN/GBn5nahPrfBtBDGh+8fEfnUck3fcRnuGJAyAwJyfwrWTl8vLJUnSCnjhXLXFwZMc8Zcj9BWpu4U3ggH+qQ5+VBtdMbcxjAUDY8J3/GolulHCFUk+ZxtWOZu3sbWM0t1Kwd84GVwNhTe2iydx780q0GV7u7maU5YgEsTkk+tWi3tizDhG4/KlCuifT7UhhIBt1FWvTolYqBgrzI9aWWEI4V235YPnVgs4DEAVGfMedMgNjSBQFBzvkDHnvRLICh9ahtxxDi6DlU854DkfaPzoiWATxcWUJ5bn1oKSPhBGN+lNiv4n86EdONjjpyoBQj1i2V9FvYG344HHv2rjBhgYbcQNd4u4u9jdANmUr8RiuCICWi7lu8LNwqqjdvIjFFY3JNo3NJ0z3uGG3E1ZREl1Orsr3MyuCQytK2QfWsqWymgmTtBJ9XWOJMs27ljwLxdduZpdc6lfXEYhkuP8LfwKNvwof6u0sLSAHKDOenuxXq6dLxf4jADBCjO5P8AZFUFlJslkkmtoIYUkYxyKXC52G9R5XgYzxO3hPKTh6bdKO1G24ZrSJPs2w/rWESDTpMbqAcnhpJSaZlvsg0lxxrH3asxX2iN1x5fGnOtqRZjoeFfzFC6ZbRm7LJgsIVJOeuN6d9oLfhtUOOQUfPFFCsrYtXmnVQQOLkaJm0to7eSaVJAiqcNw8IJxRFoh+vw45xuDjOAd6O124Fxp5STgXx54uIkjYiqaomm7K1CkixsIp37k/5kZDDHPH5fKsMGcSyM0m4XIPP9aaQW0MkUcsbAiJOE8LbHPPI8+dbat3R1F0tExEoRY8rglgihs59RmkTOtRlVtaN+ykCG+vBwYHdKfM8zjervYW3AcPz5n1qnaW1zaXSiztjIxKrOzDPAM+n4/CukWdt3tvEcgkqGJxW7JSe9G1rAQwlUbcseY/enNuvHhRyxv7qhhUBBtvnGPWjbeLus75yct+9FCWFIpVSwG+Nx+tSsvGDxcjy91ar4hwjcAb16W4PaOx6+VEBA+QCmd/MeVCv4Tty9KKlyfEPa5j9qGbxnYnA6+tYKIT4HBPInNfPurTtC00JSPjjdl4lPlt5V9APlsgjhwfOuC9pYoYtQ1LDkub6VcEDAXOT+OapilVozimtiD60/kPia9qHgH3qypaCXLTYJZrOaJWARlAOc/eFQ3EV7YgS3djiFjxKzOMEY9Cf3rplv2L01IoUDSIhBJy+7BebDIORyOKAl0q2gWUNA07JExCy8DcKjrw7Y+FTvdjP617KzLCB2gt8SyxhbVcSRoC24PQ0vuUe0AjDu0byZDHbrncU61NpIdcnEXB4YogeLYZAFLtXuYImWJWMj3CFm8kO23r1rPsZVpE3Zixh792SRmfuMcBUjhGfOrL2ztVijjAHORF+ZqDspb8RJCjHCig+eTmnPbuIhrcL1uY8/A0yJS9lMnszGkj8LghPsrg7+RoG5gY6dKQzcewVXIwOY+dWHUA8Vv/wrt3rMB0wBSe7lJ01kummCg4cAZPPG1Wa8WyMXsg0y1lWFe+S3RiAAFxk7n2vXlRmrmT+PTyfU4FccIw7HIwgHPryoPRZYgvB3jsvBnLAcxv13/SnGrTRvd3EjM0RZ/ErDdcYAzUI7PVhC4/78jTsQz3N3dCaFAUiGMe+rxbQcAx58qqvYOJRqF0VCnEQyR13q8LHxZA5dTTJL0c2dKM6X6I44t+8x/wCKKX2RjmeVbKAFwelbxpwNnz+VEhZ6q90u3s/lUTgOvCeVE9PMkYx50KTwnhO3lRMQyMcY+0PnUJHDvnIPP0NTyZO46VA+WG3vNAKIH2PEeXUVw7tckUfajUgVcsLliwKDhIO/Ou4uxx4t8e1XHu1OkmbttqTzxM0DlZAehPdrt8c0Vk4bDw5CAXcIGP4dpx9TBufnWUwOkQZP/DD5/vWVG0V4svVhr88FvBDPxPGjcYVjvzzsKi1zT7mYXEhu4LZD4lRGJLDHyz1HnWjWUYHiLHypdDoljb3X1hO/L8XEcEZ+P6VlEply8t1sh1l+HtBenw4Doo4hkHYUj1CIPcd+xUE7KqjAHvq0zW1tcFiwVnJ3LbMf3pdd6OH/AMhsjO6OcZphUoP+xv8ARxG/f3YY8SCSIIM5wMmrH29HC9p5/WAfgv8AWlPYCJLAzNclYOKeM+OQYwOoNGfSJdozWhidZMSMx4GBwMDemRzuO6K8ZBzYD2jg+W1LdYYNatgHmPZBPUV59aDDxFlznYivJ34rZgrbkjnXTa4E1ilysX2c4gZ8CY4ViQEwDtnfPupvZl7xnuZ2L7qzHHsFs44gOmR8KUrHI5kDtkGNh7OOlPrV/wCG2UXdQxzNKgEisAp9nIPPfoK5q4xZ245SqSLB9GB4ru8AXA7vGc7sQwBbkOZrosacP486oX0b2pt9YvQHjePuSy8Jzw+P2fPy510FvEQq/ifIUSOXTNeHxZ+yOdTbcO/416mDyFYoGf5fs1iR5GNyDz6ZoaUeIgc87Hyo0rmgn9tvM9P7/vasEgyOHHKh22bkADU0gGT6cx6VBK3EvnmsxkQTfe89jXNO28Mra/KVumjRo0PCqj7uP0ro7zopCyyIp/mYDIrnPb64jg1scTAcUKkY95qch4or31Z//e3HxH7VlQfxGLyf4V5S8WUr9nVJLMupwBigptOYDYMadx+xWk3I+6jYjRVp7Ik4MePXNeJxQYBHeL5SD8jTaT9aW3PsmmEsimaOUf4K92wIyruCCfShJYif81Co6HpW78m91ej/AKUf9wflQYLA5LVSNlU+6g5bUDYZHpnFMY+nuFRzcm/ChyaGTYq+rrGxEpKh1ZckZ6VuI72NFEE/exjkpOR8DTWy5J76Xx/81L7xTKTDyknaZcfosuZ5NWv/AKxEFcW4IIUjiPEK6bEOElTzO+a579Gv/Urr/Y//AFXQuqU1iSk5O2bMfEQNgeZqThGMYqE+w341N0/CtYtGgOTg9OdB3R4HJA5UYnJv76mgbz/Mf3VmFEJIIJxjNAzOI5OE/aOxNFt7Un+o/nS2+5j/AFfrQsZFV7Zd0blS552+FHnhj+9VftpE9zPpkkSO5ayQeEZzz/erD2u/5q0/2X/OlnaP/pFj/wDF/WoQdTkWT0mU/wDh1x91R75F/esrevavbNzP/9k=" />
                  </StoreImgBox>
                  <StoreNameAndGrade>
                    <StoreName>Baskinrobbins</StoreName>
                    <StoreGrade>4.8</StoreGrade>
                  </StoreNameAndGrade>
                  <StoreAddress>경기도 부천시</StoreAddress>
                </Link>
              </Like10Item>
            ))
          : null}
        <SeeMoreBtnBox className="seeMoreBtn">
          <SeeMoreBtn htmlFor="Like" onClick={() => seeMoreBtnOnClick()}>
            &gt;<p>더보기</p>
          </SeeMoreBtn>
        </SeeMoreBtnBox>
      </Like10List>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  color: #4a4a4a;
`;
const Title = styled.h3`
  margin: 0;
  padding: 0 0 15px 20px;
`;

const Like10List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const Like10Item = styled.li`
  width: calc(25% - 22.5px);
  margin-right: 30px;
  a {
    width: 100%;
    height: 100%;
    color: #4a4a4a;
  }
`;
const StoreImgBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
`;
const StoreImg = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in;
  &:hover {
    scale: 1.12;
  }
`;
const StoreNameAndGrade = styled.div`
  display: flex;
  padding-top: 15px;
`;
const StoreName = styled.span`
  padding-right: 10px;
  font-weight: 600;
`;
const StoreGrade = styled.span`
  font-weight: 600;
  color: #ff6262;
`;
const StoreAddress = styled(StoreName)`
  font-size: 0.8rem;
  font-weight: 400;
`;

const SeeMoreBtnBox = styled(Like10Item)`
  display: flex;
  justify-content: center;
  margin: 0;
`;
const SeeMoreInput = styled.input`
  display: none;
  &:checked {
    & + ul {
      justify-content: center;
    }
    & + ul > li {
      margin: 0 15px 30px 15px;
      width: calc(33.3333% - 30px);
    }
    & + ul > .seeMoreBtn {
      display: none;
    }
  }
`;
const SeeMoreBtn = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: fit-content;
  background-color: transparent;
  border: none;
  color: #666666;
  font-size: 5rem;
  font-weight: 400;
  cursor: pointer;
  P {
    color: ${({ theme }) => theme.colors.black};
    font-size: 0.8rem;
  }
`;
export default LikeTop10;
