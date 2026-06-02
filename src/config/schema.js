import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function runSchema(){
   try {
const connection = await mysql2.createConnection({
    multipleStatements : true, 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});
   console.log ("Connected to database successfully");
    
    const sql = `CREATE TABLE IF NOT EXISTS profiles (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(100) NOT NULL UNIQUE, 
         name VARCHAR(50),
         bio TEXT,
         location VARCHAR(200),
         email VARCHAR(200),
         public_repos INT,
         followers INT DEFAULT 0,
         following INT DEFAULT 0,
         total_stars INT DEFAULT 0,
         top_language VARCHAR(100),
         follower_ratio FLOAT,
         popularity_score FLOAT,
         github_created_at DATETIME ,
        analyzed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS repo_snapshots (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profile_id INT NOT NULL,
        repo_name VARCHAR(200) NOT NULL,
        stars INT DEFAULT 0,
        forks INT DEFAULT 0,
        is_fork BOOLEAN DEFAULT FALSE,
        description TEXT,
        language VARCHAR(100),
        repo_url VARCHAR(400),
        
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
    );`;
        await connection.query(sql);
       console.log("Tables created succcessfully");

   await connection.end();

}  catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
     }
};   runSchema();