/**
 * This is probably a massive production no-no but I'd want to research
 * some form of Investion of Control framework or a better abstraction for stashing
 * a Database Connection Pool for global user in a Node application.
 *
 * This is a super-common problem for all server-side applications, surely someone has solved this
 */
import mysql from 'mysql';

let $DataBaseConnectionPool = {
    db: undefined
};

const findOrInitializePool = () => {
    if( $DataBaseConnectionPool.db ) {
        return $DataBaseConnectionPool.db;
    } else {
        const pool = mysql.createPool({
            // debug: true,
            host: 'db',
            user: 'root',
            password: 'testpass',
            database: 'challenge',
        });
        $DataBaseConnectionPool.db = pool;
        return $DataBaseConnectionPool.db;
    }
};

export default findOrInitializePool