class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=ccbd62db6bd6ac17da5b584b9f880788";
  _baseOffset = 210;

  getRecource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharecters = async (offset = this._baseOffset) => {
    const url = `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`;
    const res = await this.getRecource(url);
    return res.data.results.map(this._transformCharecter);
  };

  getCharecter = async (id) => {
    const url = `${this._apiBase}characters/${id}?${this._apiKey}`;
    const res = await this.getRecource(url);
    return this._transformCharecter(res.data.results[0]);
  };

  _transformCharecter = (char) => {
    // console.log("char = ", char);
    // console.log("char.comics.items = ", char.comics.items);
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
}

export default MarvelService;
