import actorsService from "./../services//index.js";
import { validateParams } from "../../utils/paramsValidator.js";
import { processAndPersistLogs } from "../../utils/logProcessor.js";

export default (dependencies) => {

  const getActor = async (request, response, next) => {
    //input
    const actorId = request.params.resource_id;
    try {
      validateParams(request, next);
      // Treatment
      const actor = await actorsService.getActor(actorId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(actor);
    } catch (error) {
      next(error);
    }
  };
  const find = async (request, response, next) => {
    try {
      //input
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const actors = await actorsService.find(query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(actors);
    } catch (error) {
      next(error);
    }
  };
  const search = async (request, response, next) => {
    try {
      //input
      const query = request.url.substr(request.url.indexOf('?') + 1);
      // Treatment
      const actors = await actorsService.search(query, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(actors);
    } catch (error) {
      next(error);
    }
  };

  const getPersonImages = async (request, response, next) => {
    //input
    const personId = request.params.resource_id;
    try {
      validateParams(request, next);
      // Treatment
      const images = await actorsService.getPersonImages(personId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (error) {
      next(error);
    }
  };

  return {
    getActor,
    find,
    search,
    getPersonImages
  };
};
