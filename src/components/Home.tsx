import { useEffect, useState } from "react";
import { FvHero } from "./FvHero";
import { ResultCards } from "./ResultCards";
import axios from "axios";

type storeType = {
  id: string;
  name: string;
  address: string;
  non_smoking: string;
  parking: string;
  station_name: string;
  lat: string;
  lng: string;
  open: string;
  urls: {
    pc: string;
  };
  photo: {
    pc: {
      l: string;
    };
  };
};

export const Home = () => {
  const [getData, setGetData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<Array<storeType>>([]);

  const KEY = "3f02e0fca4a245b1";

  const hotpepper = axios.create({
    // baseURL: "https://find-smoking-place.herokuapp.com/http://webservice.recruit.co.jp/hotpepper/gourmet/v1/",
    baseURL: "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/",
  });

  const FindStore = async () => {
    // 現在地取得処理
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const url =
          "https://us-central1-find-smoking-space.cloudfunctions.net/getAPI";

        // axiosを使用してCloud Functionsを呼び出します
        axios
          .get(url, {
            // 緯度と経度を渡します
            params: {
              latitude: lat,
              longitude: lng,
            },
          })
          .then((res) => {
            setStoreData(res.data.results.shop);
            if (res.data.results.shop.length === 0) {
              alert("この付近には喫煙可能店は見つけられませんでした。");
              setGetData(false);
              setIsLoading(false);
            } else {
              setGetData(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      },
      (error) => {
        setIsLoading(false);
        switch (error.code) {
          case 1: //PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:" + error.code + ")");
            break;
        }
      }
    );

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     hotpepper
    //       .get("", {
    //         params: {
    //           key: KEY,
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude,
    //           range: "5",
    //           format: "json",
    //           count: 200,
    //         },
    //       })

    //       // 店舗情報取得
    //       .then((res) => {
    //         // console.log(res);
    //         setStoreData(res.data.results.shop);
    //         if (res.data.results.shop.length === 0) {
    //           alert("この付近には喫煙可能店は見つけられませんでした。");
    //           setGetData(false);
    //           setIsLoading(false);
    //         } else {
    //           setGetData(true);
    //           setIsLoading(false);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setIsLoading(false);
    //       });
    //   },
    //   (error) => {
    //     setIsLoading(false);
    //     switch (error.code) {
    //       case 1: //PERMISSION_DENIED
    //         alert("位置情報の利用が許可されていません");
    //         break;
    //       case 2: //POSITION_UNAVAILABLE
    //         alert("現在位置が取得できませんでした");
    //         break;
    //       case 3: //TIMEOUT
    //         alert("タイムアウトになりました");
    //         break;
    //       default:
    //         alert("その他のエラー(エラーコード:" + error.code + ")");
    //         break;
    //     }
    //   }
    // );
  };

  return (
    <>
      <FvHero FindStore={FindStore} isLoading={isLoading} />
      <ResultCards getData={getData} storeData={storeData} />
    </>
  );
};
