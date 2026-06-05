import {pool} from '../config/db.js';   

async function upsertProfile( user, insights ){
    
       try {
    
    const sql =` INSERT INTO profiles (username, name , bio, location, email, public_repos, popularity_score, 
    followers, following, total_stars, top_language, follower_ratio, github_created_at, 
    profile_completness_score, analyzed_at, updated_at ) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) 

    ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    bio = VALUES(bio),
    location = VALUES(location),
    email = VALUES(email),
    public_repos = VALUES(public_repos),
    popularity_score = VALUES(popularity_score),
    followers = VALUES(followers),
    following = VALUES(following),
    total_stars = VALUES(total_stars),
    top_language = VALUES(top_language),
    follower_ratio = VALUES(follower_ratio),
    github_created_at = VALUES(github_created_at),
    profile_completness_score = VALUES(profile_completness_score),
    updated_at = VALUES(updated_at)
    `;

const values = [
    user.login,
    user.name,
    user.bio,
    user.location,
    user.email,
    user.public_repos,
    insights.popularityScore,
    user.followers,
    user.following,
    insights.totalStars,
    insights.topLanguage,
    insights.followersRatio,
    new Date(user.created_at),
    insights.completenessScore,
    new Date()
]

const [result] = await pool.execute(sql, values);
return result;
       
    }  catch (error) {
            throw new Error (`Database Error ${error.message}`);
        }     
}

   
     async function saveReposSnapshots(profileId, repos){
       try {
          await pool.execute(`DELETE FROM repo_snapshots WHERE profile_id = ?`, [profileId]);
          const top10 = repos.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0,10);
          
          for(const repo of top10 ) {
               await pool.execute(
                `INSERT INTO repo_snapshots  (profile_id, repo_name, language, stars, forks, is_fork, description, repo_url)
                VALUES (?,?,?,?,?,?,?,?)`, [profileId, repo.full_name, repo.language, 
                    repo.stargazers_count, repo.forks_count, repo.fork, repo.description, repo.html_url]
               );
          }


       } catch(error) {
             throw new Error (`Database error ${error.message}`);
       }
}