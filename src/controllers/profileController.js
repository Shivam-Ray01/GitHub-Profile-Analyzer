import {fetchGitHubUser, fetchGitHubRepos} from '../services/githubservice.js';
import {calculateInsights} from '../services/insightservice.js';
import {upsertProfile, saveReposSnapshots, getAllProfiles, getProfileByUsername, deleteProfile} from '../models/profile.js';


async function analyzeProfile(req, res) {
    const { username } = req.params;

    try{
const [user, repos] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username)
]);

const insights = calculateInsights(user, repos) 
    await upsertProfile (user, insights)

const profile = await getProfileByUsername(user.login);
    await saveReposSnapshots(profile.id, repos);

    return res.status(200).json({
    success: true,
    message: `Profile ${username} analyzed successfully`,
    data: profile
});

} catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
res.status(status).json({ success: false, message: error.message });
    }
}

async function listProfiles(req, res){
    try {
    const profiles = await getAllProfiles();

    res.status(200).json({
    success: true,
    message: "Profiles fetched successfully",
    data: profiles
});
    } catch (error) {
          res.status(500).json({ success: false, message: error.message });
    }
}

async function getProfile (req, res) {
    const {username} = req.params;

    try {
        const user = await getProfileByUsername(username);
         if (!user) {
         return res.status(404).json({ success: false, message: `Profile ${username} not found` });
            }    
            res.status(200).json({
            success: true,
            message: "Profiles Exists",
            data: user
});  

    } catch (error) {
  res.status(500).json({ success: false, message: error.message });
    }
}