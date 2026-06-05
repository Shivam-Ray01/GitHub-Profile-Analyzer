function calculateInsights(user, repos){
    // calucalting gitHub account age in days //
     const newDate = new Date();
       const gitHubAccount = user.created_at;
       const difference = newDate - gitHubAccount;
       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    // calculating average repos a year //    
    const accountAgeInYears = (days / 365 ) || 1;
    const userRepos = user.public_repos;
    const averageReposPerYear = userRepos / accountAgeInYears;    
    // calculating followers ratios //  
    let followersRatio;    
    if (user.following === 0){
     followersRatio = user.followers;
    } else {
     followersRatio = user.followers / user.following;
    }
    // calculating popularity score //
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
     let popularityScore;
     popularityScore = (user.followers *2) + (userRepos *1.5 ) + (totalStars * 3);
     
    let completenessScore = 0;
    if (user.name) completenessScore += 15;
    if (user.bio) completenessScore += 20;
    if (user.location) completenessScore += 15;
    if (user.email) completenessScore += 15;
    if (user.avatar_url) completenessScore += 5;
    if (user.company) completenessScore += 10;
    if (user.blog) completenessScore += 10;
    if (user.twitter_username) completenessScore += 10;

const ownRepos = repos.filter(repo => !repo.fork);
 const langCount = {};
    ownRepos.forEach(repo => {
        if (repo.language){
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
        
    });
const topLanguage = Object.entries( langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null; 

    return {
        accountAgeInDays: days,
        averageReposPerYear: averageReposPerYear,
        followersRatio: followersRatio,
        popularityScore: popularityScore,
        completenessScore: completenessScore,
        topLanguage: topLanguage,
        totalStars: totalStars
    }

}  export { calculateInsights };   