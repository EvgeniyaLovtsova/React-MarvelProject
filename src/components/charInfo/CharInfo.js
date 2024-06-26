import { useEffect, useState } from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import { Link } from "react-router-dom";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharecter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const updateChar = () => {
    if (!props.charId) {
      return;
    }

    clearError();
    getCharecter(props.charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  // const skeleton = char || loading || error ? null : <Skeleton />;
  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {/* {skeleton}
      {errorMessage}
      {spinner}
      {content} */}
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There are no comics with this character"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          const comicId = item.resourceURI.split("/").pop();

          return (
            <li key={i} className="char__comics-item">
              <Link to={`/comics/${comicId}`} style={{ width: "100%" }}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
