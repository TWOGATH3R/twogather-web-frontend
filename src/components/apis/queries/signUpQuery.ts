import axios from "axios";

export const buisnessCheckMutaionPostInfo = async (
  number: string,
  name: string,
  date: string
) => {
  const serviceKey =
    "ogOXawrNeeKckedJw7whjeVYQ0PVA6GIJOkVCNTMTEM%2F9C37ZlRjaoDgkHDsmki2MCJlxZSCG9p9I1pe6pcwOA%3D%3D";
  const res = await axios.post(
    `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${serviceKey}`,
    {
      businesses: [
        {
          b_no: number,
          start_dt: date,
          p_nm: name,
        },
      ],
    }
  );
  return res.data;
};
