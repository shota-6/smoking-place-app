import axios from "axios";

const KEY = "3f02e0fca4a245b1";

const hotpepper = axios.create({
    baseURL: "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/",
  });
  
  export const HotpepperData = async () => {
    return await hotpepper.get("", {
      params: {
        key: KEY,
        lat: '35.75012327488292',
        lng: '139.80508505043517',
        range: '5',
        format: "json",
        count: 200, 
      },
    });
  };