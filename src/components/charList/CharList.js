import "./charList.scss";
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CharInfo from "../charInfo/CharInfo";
import useMarvelService from "../../services/MarvelService";

const CharList = (props) => {
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  let itemRefs = useRef([]);

  const { loading, error, getAllCharecters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharecters(offset).then(onListLoaded);
  };

  const onListLoaded = (newCharacters) => {
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
      );
    });

    return (
      <>
        <ul className="char__grid">{charList} </ul>
      </>
    );
  };

  const items = renderCharList(characters);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {items}
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
