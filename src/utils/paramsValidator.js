import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import CustomError from './errors/custom-error.js';

export async function validateParams(request, next) {
  if (request.params.id !== undefined) {
    if (!ObjectId.isValid(request.params.id)) {
      next( new CustomError('INVALID_ID', ""));
    }
  }
  if (request.params.movie_id !== undefined) {
    if (!ObjectId.isValid(request.params.movie_id)) {
      next( new CustomError('INVALID_MOVIE_ID', ""));
    }
  }
  if (request.params.resource_id !== undefined) {
    if (isNaN(request.params.resource_id)) {
      next( new CustomError('INVALID_RESOURCE_ID', ""));
    }
  }
  if (request.params.genre_id !== undefined) {
    if (isNaN(request.params.genre_id)) {
      next( new CustomError('INVALID_RESOURCE_ID', ""));
    }
  }
  if (request.params.cast_id !== undefined) {
    if (!ObjectId.isValid(request.params.id)) {
      next( new CustomError('INVALID_CAST_ID', ""));
    }
  }
}