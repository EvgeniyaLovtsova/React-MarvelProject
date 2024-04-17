import "./charList.scss";
import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CharInfo from "../charInfo/CharInfo";

class CharList extends Component {
  state = {
    loading: true,
    error: false,
    characters: [],
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }
  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharecters(offset)
      .then(this.onListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onListLoaded = (newCharacters) => {
    let ended = false;
    if (newCharacters.length < 9) {
      ended = true;
    }
    this.setState(({ characters, offset }) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  itemRefs = [];
  setRef = (elem) => {
    this.itemRefs.push(elem);
  };
  focusOnItem = (id) => {
    this.itemRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    this.itemRefs[id].classList.add("char__item_selected");
  };

  renderCharList = (arr) => {
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
          ref={this.setRef}
          tabIndex={0}
          onClick={() => {
            this.props.onCharSelected(id);
            this.focusOnItem(i);
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

  render() {
    const { loading, error, characters, newItemLoading, offset, charEnded } =
      this.state;
    const items = this.renderCharList(characters);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const charList = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {charList}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharInfo.propTypes = {
  charId: PropTypes.number,
  onCharSelected: PropTypes.func,
};

export default CharList;
