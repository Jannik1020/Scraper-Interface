

module.exports = async (request, response) => {

    console.log("Hallo")

    const connectionString = process.env.DB_URL
    var Pool = require('pg-pool');
    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        }
    });

    var date = request.query.date
    console.log(date)
    var detail_table = await pool.query('SELECT * from big_table.d' + date).body.rows

    response.status(200).json({
        body: detail_table,
        query: request.query,
    })
};