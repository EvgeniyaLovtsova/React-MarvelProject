import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const ComicsList = (props) => {
  const { loading, error, getAllComics } = useMarvelService();
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(4);

  useEffect(() => {
    onRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = () => {
    getAllComics(offset).then(onListLoaded);
  };

  const onListLoaded = (loadedComics) => {
    setComics((comics) => [...comics, ...loadedComics]);
    setOffset((offset) => offset + 8);
  };

  const renderComics = (arr) => {
    const comicsList = arr.map((item, i) => {
      return (
        <li
          className="comics__item"
          key={i}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{comicsList}</ul>;
  };

  const comicsList = !(loading && error) ? renderComics(comics) : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {comicsList}
      <button
        className="button button__main button__long"
        onClick={() => onRequest()}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
