import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req,res) {
    try {
      const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
  
      res.json({status: true, data: randomMovie});
  
    } catch (error) {
      console.error(error);
      res.status(500).json({status: false, message:"Internal server error"});
    } 
  }