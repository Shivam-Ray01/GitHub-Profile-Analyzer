const GITHUB_API = "https://api.github.com";


function ErrorHandler(response, username){
        if (response.status === 404) {
        throw new Error(`GitHub User ${username} not found`);
    } else if (response.status === 403) {
         throw new Error("GitHub API rate limit exceeded");
    } else {  
         throw new Error(`Error fetching GitHub user: ${response.status}`);
    };
}
async function fetchGitHubUser(username) {
    const response =await fetch(`${GITHUB_API}/users/${username}`);
       if (!response.ok) ErrorHandler(response, username);
         return response.json();
}
 
async function fetchGitHubRepos(username) {
    const response = await fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`);
       if (!response.ok) ErrorHandler(response, username);
         return response.json();
}
export { fetchGitHubUser , fetchGitHubRepos};