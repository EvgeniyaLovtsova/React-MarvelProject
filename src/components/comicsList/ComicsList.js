import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpecting process state");
  }
};

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setnewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
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

  return (
    <div className="comics__list">
      {setContent(process, () => renderComics(comicsList), newItemLoading)}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest()}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
