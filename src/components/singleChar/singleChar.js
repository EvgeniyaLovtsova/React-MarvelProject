import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const SingleChar = ({ data }) => {
  const { name, description, thumbnail } = data;
  return (
    <div className="single-comic">
      <Helmet>
        <meta
          name="description"
          content={`${name} - Marvel Charecter description`}
        />
        <title>{name}</title>
      </Helmet>

      <img src={thumbnail} alt="x-men" className="single-char__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
      <Link to="/" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleChar;
