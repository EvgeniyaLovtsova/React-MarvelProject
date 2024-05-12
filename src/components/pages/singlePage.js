import "./singlePage.scss";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/singleComic";
import SingleChar from "../singleChar/singleChar";

const SinglePage = ({ dataType }) => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const { loading, error, getComic, getCharecter, clearError } =
    useMarvelService();

  useEffect(() => {
    dataUpdate();
  }, [id]);

  const dataUpdate = () => {
    clearError();
    if (dataType === "comic") {
      getComic(id).then(onDataLoaded);
    }
    if (dataType === "char") {
      getCharecter(id).then(onDataLoaded);
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  let view = null;
  if (dataType === "comic") {
    view = <SingleComic data={data} />;
  }
  if (dataType === "char") {
    view = <SingleChar data={data} />;
  }
  const content = !(loading || error || !data) ? view : null;

  return (
    <>
      <AppBanner />
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

export default SinglePage;
