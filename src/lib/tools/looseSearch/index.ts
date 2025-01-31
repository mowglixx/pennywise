const looseSearch = (query) => {
  return new RegExp("^.{0,}" + query + ".{0,}$", "i");
};

export default looseSearch;
