# GitHub Profile Analyzer API

A backend REST API built with Node.js, Express.js, and MySQL that analyzes GitHub user profiles using the GitHub public API and stores useful insights in a database.

## Tech Stack

- **Node.js** — Runtime environment
- **Express.js** — Web framework
- **MySQL** — Database
- **GitHub REST API** — Data source

## Features

- Fetch and analyze any public GitHub profile
- Store useful insights like followers, stars, top language, popularity score
- Calculate derived metrics — follower ratio, account age, profile completeness
- Store top 10 repositories of each user
- Fetch all analyzed profiles
- Fetch a single profile with repo snapshots
- Delete a stored profile
- Compare multiple profiles side by side
- Built-in rate limiter to prevent API abuse

## Project Structure
github-profile-analyzer/
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection pool
│   │   └── schema.js          # Database schema setup
│   ├── controllers/
│   │   └── profileController.js  # Request handlers
│   ├── middleware/
│   │   └── rateLimiter.js     # Rate limiting middleware
│   ├── models/
│   │   └── profileModel.js    # Database queries
│   ├── routes/
│   │   └── profileRoutes.js   # API routes
│   ├── services/
│   │   ├── githubService.js   # GitHub API integration
│   │   └── insightService.js  # Insight calculations
│   └── main.js                # Entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- MySQL 8.0 or higher

## API Endpoints

### Analyze a GitHub profile
Fetches data from GitHub, calculates insights, and stores in database.

**Example:**
POST /api/profiles/analyze/${username}
---

### Get all analyzed profiles
GET /api/profiles

**Query params:**
| Param | Default | Description |
|-------|---------|-------------|
| page | 1 | Page number |
| limit | 10 | Results per page |
| sortBy | analyzed_at | Sort column |
| order | DESC | ASC or DESC |

---

### Get a single profile
GET /api/profiles/:username

---

### Delete a profile
DELETE /api/profiles/:username

---

### Compare profiles
GET /api/profiles/compare?users=user1,user2,user3

## Database Schema

### profiles table
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| username | VARCHAR | GitHub username |
| name | VARCHAR | Display name |
| bio | TEXT | Profile bio |
| location | VARCHAR | Location |
| email | VARCHAR | Email address |
| public_repos | INT | Repository count |
| followers | INT | Follower count |
| following | INT | Following count |
| total_stars | INT | Total stars received |
| top_language | VARCHAR | Most used language |
| follower_ratio | FLOAT | Followers/Following ratio |
| popularity_score | FLOAT | Weighted popularity score |
| completeness_score | INT | Profile completeness % |
| github_created_at | DATETIME | Account creation date |
| analyzed_at | DATETIME | First analysis date |
| updated_at | DATETIME | Last update date |

### repo_snapshots table
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| profile_id | INT | Foreign key to profiles |
| repo_name | VARCHAR | Full repository name |
| language | VARCHAR | Primary language |
| stars | INT | Star count |
| forks | INT | Fork count |
| is_fork | BOOLEAN | Is it a forked repo |
| description | TEXT | Repo description |
| repo_url | VARCHAR | Repository URL |

## Insights Calculated

| Insight | Description |
|---------|-------------|
| Account Age | How old the GitHub account is in days |
| Avg Repos/Year | Average repositories created per year |
| Follower Ratio | Followers divided by following |
| Popularity Score | Weighted score using followers, repos and stars |
| Profile Completeness | How complete the profile is out of 100 |
| Top Language | Most used programming language |
| Total Stars | Sum of stars across all repositories |

## Rate Limiting

API is rate limited to **30 requests per minute** per IP address.

## Author

Shivam — [GitHub](https://github.com/Shivam-Ray01)
