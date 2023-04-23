import actorsService from "./../services";

export default (dependencies) => {

  const getActor = async (request, response, next) => {
    //input
    const actorId = request.params.id;
    // Treatment
    const tvSeries = await actorsService.getActor(actorId, dependencies);
    //output
    response.status(200).json(tvSeries);
  };
  const find = async (request, response, next) => {
    //input
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const actors = await actorsService.find(query, dependencies);
    //output
    response.status(200).json(actors);
  };
  const search = async (request, response, next) => {
    //input
    const query = request.url.substr(request.url.indexOf('?')+1);
    // Treatment
    const actors = await actorsService.search(query, dependencies);
    //output
    response.status(200).json(actors);
  };

  const getPersonImages = async (request, response, next) => {
    //input
    const personId = request.params.id;
    // Treatment
    const images = await actorsService.getPersonImages(personId, dependencies);
    //output
    response.status(200).json(images);
  };

  return {
    getActor,
    find,
    search,
    getPersonImages
  };
};