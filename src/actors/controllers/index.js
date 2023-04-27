import actorsService from "./../services";
import { validateParams } from "../../utils/paramsValidator";
import { processAndPersistLogs } from "../../utils/logProcessor";

export default (dependencies) => {

  const getActor = async (request, response, next) => {
    //input
    const actorId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const actor = await actorsService.getActor(actorId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(actor);
    } catch (err) {
      if (err.toString().includes("404")) {
        processAndPersistLogs("error", request, 404, "");
        response.status(404).json({ error: `actor with id: '${actorId}' not found` });
      } else {
        processAndPersistLogs("error", request, 500, "");
        response.status(500).json({ error: "failed to get actor" });
      }
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "failed to find actors" });
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
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "failed to search for actors" });
    }
  };

  const getPersonImages = async (request, response, next) => {
    //input
    const personId = request.params.resource_id;
    try {
      validateParams(request);
      // Treatment
      const images = await actorsService.getPersonImages(personId, dependencies);
      //output
      processAndPersistLogs("info", request, 200, "");
      response.status(200).json(images);
    } catch (err) {
      processAndPersistLogs("error", request, 500, "");
      response.status(500).json({ error: "failed to get actor images" });
    }
  };

  return {
    getActor,
    find,
    search,
    getPersonImages
  };
};
