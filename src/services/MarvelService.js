import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, process, setProcess, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ccbd62db6bd6ac17da5b584b9f880788";
  const _baseCharOffset = 210;
  const _baseComicsOffset = 4;

  const getAllCharecters = async (offset = _baseCharOffset, name = "") => {
    let url = `${_apiBase}characters?`;
    if (name.length > 0) {
      url = url + `name=${name}&${_apiKey}`;
    } else {
      url = url + `limit=9&offset=${offset}&${_apiKey}`;
    }
    const res = await request(url);
    return res.data.results.map(_transformCharecter);
  };

  const getCharecter = async (id) => {
    const url = `${_apiBase}characters/${id}?${_apiKey}`;
    const res = await request(url);
    return _transformCharecter(res.data.results[0]);
  };

  const _transformCharecter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseComicsOffset) => {
    const url = `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`;
    const res = await request(url);
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const url = `${_apiBase}comics/${id}?${_apiKey}`;
    const res = await request(url);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      price: comics.prices[0].price
        ? `${comics.prices[0].price}$`
        : "not available",
      url: comics.urls[0].url,
      description: comics.textObjects[0]?.text
        ? comics.textObjects[0].text
        : "There is no description for this character",
      language: comics.textObjects[0]?.language || "en-us",
      pageCount: comics.pageCount
        ? `${comics.pageCount} pages`
        : "No information about the number of pages",
    };
  };

  return {
    process,
    setProcess,
    getAllCharecters,
    getCharecter,
    clearError,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
