import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';
import genresRouter from './src/genres';
import createAccountsRouter from './src/accounts/routes';
import buildDependencies from './src/config/dependencies';

dotenv.config();

const app = express();

const port = process.env.PORT;

//.. Add this after db.init();
const dependencies = buildDependencies();

app.use(express.json());

app.use('/api/movies', moviesRouter);

app.use('/api/genres', genresRouter);

app.use('/api/accounts', createAccountsRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});