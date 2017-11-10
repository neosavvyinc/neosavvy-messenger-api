/**
 * This is probably a massive production no-no but I'd want to research
 * some form of Investion of Control framework or a better abstraction for stashing
 * a Database Connection Pool for global user in a Node application.
 *
 * This is a super-common problem for all server-side applications, surely someone has solved this
 */
import mysql from 'mysql'
const pool = mysql.createPool({
    host: 'db',
    user: 'root',
    password: 'testpass',
    database: 'challenge',
});

const DataBaseConnectionPool = {
    db: pool
};

export default DataBaseConnectionPool