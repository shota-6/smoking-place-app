import FvHero from "./FvHero";

import axios from "axios";
import { useEffect } from "react";

// const KEY = "3f02e0fca4a245b1";

// const hotpepper = axios.create({
//   baseURL: "http://webservice.recruit.co.jp/hotpepper/gourmet/v1",
// });

// export const fetchSearchData = async () => {
//   return await hotpepper.get("", {
//     params: {
//       key: KEY,
//       large_area: "Z011",
//       format: "json",
//     },
//   });
// };

export const Home = () => {
  useEffect(() => {
    // fetchSearchData().then((res) => {
    //   console.log(res);
    // });
  }, []);
  return <FvHero />;
};
