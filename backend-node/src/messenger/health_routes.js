import DatabaseConnectionPool from './database_pool_wrapper';
export const HEALTH_TEST = (req, res) => {
    DatabaseConnectionPool().getConnection(function (err, connection) {
        if (err) {
            res.status(501).send(err.message);
            return;
        }
        connection.query('SELECT col FROM test', function (err, results, fields) {
            if (err) {
                res.status(501).send(err.message);
                connection.release();
                return;
            }

            res.json({
                result: results[0].col,
                backend: 'nodejs',
            });
            connection.release();
        });
    });
};