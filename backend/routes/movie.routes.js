import express from 'express';
import { getTrendingMovie } from '../controllers/movie.controller.js';

const routes  = express.Router();

routes.get("/trending",getTrendingMovie);

export default routes;