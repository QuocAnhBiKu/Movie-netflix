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

export async function getMovieTrailers(req,res){
  const {id} = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.status(200).json({success: true, trailers: data.results});

  } catch (error) {
    if(error.message.includes("404")){
      return res.status(404).send(null);
    }
    res.status(500).json({success: false, message:"Internal server error"});
    
  }
}

export async function getMovieDetails (req,res){
  const {id} = req.params;
try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.status(200).json({success: true, content: data})
} catch (error) {
  if(error.message.includes("404")){
    return res.status(404).send(null);
  }
  res.status(500).json({success: false, message:"Internal server error"});
  
}
}

export async function getMovieSimilar(req,res){
  try {
    const {id} = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({success: true, similar: data.results});

  } catch (error) {
    res.status(500).json({success: false, message:"Internal server error"});
  
  }
}

export async function getMoviesByCategory(req, res){
  try {
    const {category} = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)  
    res.status(200).json({success: true,content: data.results});
  } catch (error) {
    res.status(500).json({success: false, message:"Internal server error"});
    
  }
}