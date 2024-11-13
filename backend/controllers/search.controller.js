import { fetchFromTMDB } from "../services/tmdb.service.js"
import { User } from "../model/user.model.js"

export async function searchPerson(req, res) {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (data.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Error in searchPerson controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function searchMovie(req, res) {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (data.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "Movie",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Error in searchPerson controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function searchTv(req, res) {
    try {
        const { query } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (data.results.length === 0) {
            return res.status(404).send(null)
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "Tv",
                    createdAt: new Date(),
                }
            }
        })

        res.status(200).json({ success: true, content: data.results })
    } catch (error) {
        console.log("Error in searchPerson controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success: true, content:req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export async function removeItemFromHistory(req, res) {
    try {
        let {id} = req.params;

        id = parseInt(id);
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id : id},
            },
        });
        res.status(200).json({success: true, message: "Item removed from search History"})
    } catch (error) {
        console.log("Error in removeItemFromHistory controller: " + error.message)
        res.status(500).json({success: false, message:"Internal Server Error"})
    }

}