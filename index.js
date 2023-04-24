import dotenv from 'dotenv';
import express from 'express';
// import createGenresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import createGenresRouter from './src/genres/routes';
import createTvSeriesRouter from './src/tvSeries/routes';
import buildDependencies from './src/config/dependencies';
import createMoviesRouter from './src/movies/routes';
import createActorsRouter from './src/actors/routes';
import db from './src/config/db';
import errorHandler from './src/utils/ErrorHandler';
import { genres } from "./src//genres/genresData";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger.yaml')

dotenv.config();
db.init();

const app = express();

const port = process.env.PORT;

//.. Add this after db.init();
const dependencies = buildDependencies();

app.use(express.json());

app.use('/api/movies', createMoviesRouter(dependencies));

app.use('/api/genres', createGenresRouter(dependencies));

app.use('/api/accounts', createAccountsRouter(dependencies));

app.use('/api/tv', createTvSeriesRouter(dependencies));

app.use('/api/actors', createActorsRouter(dependencies));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

console.log(`Seeding genres to database`);
(async () => {
  try {
    for (let index = 0; index < genres.genres.length; index++) {
      await dependencies.genresRepository.persist({tmdbID: genres.genres[index].id, name: genres.genres[index].name});
    }
  } catch (e) {
    console.log(e);
  }
})();

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});