import "./charList.scss";
import { useRef, useState, useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CharInfo from "../charInfo/CharInfo";
import useMarvelService from "../../services/MarvelService";

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

const CharList = (props) => {
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const itemRefs = useRef([]);

  const { getAllCharecters, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharecters(offset)
      .then(onListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onListLoaded = async (newCharacters) => {
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }
    setCharacters((characters) => [...characters, ...newCharacters]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const renderCharList = (arr) => {
    const charList = arr.map((char, i) => {
      const { name, thumbnail, id } = char;
      const style =
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
          ? { objectFit: "fill" }
          : { objectFit: "cover" };

      return (
        <CSSTransition key={id} timeout={500} classNames="char__item">
          <li
            className="char__item"
            key={id}
            ref={(el) => (itemRefs.current[i] = el)}
            tabIndex={0}
            onClick={() => {
              props.onCharSelected(id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter" || e.key === "Tab") {
                e.preventDefault();
                this.props.onCharSelected(id);
                this.focusOnItem(i);
              }
            }}
          >
            <img src={thumbnail} alt={name} style={style} />
            <div className="char__name">{name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <>
        <ul className="char__grid">
          <TransitionGroup component={null}>{charList}</TransitionGroup>
        </ul>
      </>
    );
  };

  const elements = useMemo(() => {
    return setContent(
      process,
      () => renderCharList(characters),
      newItemLoading
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process]);

  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
  onCharSelected: PropTypes.func,
};

export default CharList;
