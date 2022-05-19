module.exports = async (request, response) => {
    const connectionString = process.env.DB_URL
    var Pool = require('pg-pool');
    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        }
    });

    var all_tables = await pool.query("select * from information_schema.tables where table_schema='big_table' order by table_name ASC")
    response.status(200).json({
        body: all_tables,
        query: request.query,
    })
};