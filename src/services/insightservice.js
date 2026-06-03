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
     
    let completnessScore = 0;
    if (user.name) completnessScore += 15;
    if (user.bio) completnessScore += 20;
    if (user.location) completnessScore += 15;
    if (user.email) completnessScore += 15;
    if (user.avatar_url) completnessScore += 5;
    if (user.company) completnessScore += 10;
    if (user.blog) completnessScore += 10;
    if (user.twitter_username) completnessScore += 10;

    

}  export { calculateInsights };   