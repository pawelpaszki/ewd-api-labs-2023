function formatUrl(request) {
  const url = request.originalUrl.split('?')[0]; // make sure that the url query params are not included
  const nonReplaceableTokens = [
    "api",
    "actors",
    "search",
    "images",
    "tv",
    "similar",
    "movies",
    "reviews",
    "genres",
    "accounts",
    "security",
    "token",
    "favourite_movies",
    "favourite_tv",
    "favourite_actors",
    "fantasy_movies",
    "cast"
  ];
  const urlTokens = url.split("/").filter((str) => str !== "");
  let parsedUrl = "/";
  for (let index = 0; index < urlTokens.length; index++) {
    if (nonReplaceableTokens.includes(urlTokens[index])) {
      parsedUrl += `${urlTokens[index]}/`;
    } else {
      parsedUrl += "{id}/";
    }
  }
  parsedUrl = parsedUrl.slice(0, -1); // remove trailing slash
  return parsedUrl;
}

module.exports = { formatUrl };