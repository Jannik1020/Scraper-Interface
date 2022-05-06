export default function handler(request, response) {
    const Pool = require('pg-pool');
    const pool = new Pool(config);

    var date = request.query.date

    var big_table = await pool.query('SELECT * from big_table.d' + request.query.date) 

    response.status(200).json({
        body: big_table,
        query: request.query,
    }
    )
}