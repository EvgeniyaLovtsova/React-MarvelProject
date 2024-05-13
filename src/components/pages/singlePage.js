import "./singlePage.scss";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import { useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const { getComic, getCharecter, clearError, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    dataUpdate();
  }, [id]);

  const dataUpdate = () => {
    clearError();
    if (dataType === "comic") {
      getComic(id)
        .then(onDataLoaded)
        .then(() => setProcess("confirmed"));
    }
    if (dataType === "char") {
      getCharecter(id)
        .then(onDataLoaded)
        .then(() => setProcess("confirmed"));
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
