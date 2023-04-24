var ObjectId = require('mongoose').Types.ObjectId;

async function validateParams(request) {
  let validationMessage = " ";
  let invalid = false;
  try {
    if (request.params.id !== undefined) {
      if (!ObjectId.isValid(request.params.id)) {
        validationMessage += "'id' url parameter is invalid. ";
        invalid = true;
      }
    }
    if (request.params.movie_id !== undefined) {
      if (!ObjectId.isValid(request.params.movie_id)) {
        validationMessage += "'movie_id' url parameter is invalid. ";
        invalid = true;
      }
    }
    if (request.params.resource_id !== undefined) {
      if (isNaN(request.params.resource_id)) {
        validationMessage += "'resource_id' url parameter is invalid. ";
        invalid = true;
      }
    }
    if (request.params.genre_id !== undefined) {
      if (isNaN(request.params.genre_id)) {
        validationMessage += "'resource_id' url parameter is invalid. ";
        invalid = true;
      }
    }
    if (request.params.cast_id !== undefined) {
      if (!ObjectId.isValid(request.params.id)) {
        validationMessage += "'cast_id' url parameter is invalid. ";
        invalid = true;
      }
    }
    if (invalid) {
      throw new Error(validationMessage.trim());
    }
  } catch (err) {
    throw new Error(validationMessage.trim());
  }
}

// add the code below
module.exports = { validateParams };