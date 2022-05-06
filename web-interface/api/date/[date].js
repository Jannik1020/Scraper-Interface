export default function handler(request, response) {
    const Pool = require('pg-pool');
    const pool = new Pool(require("../_utils.js").config());

    var date = request.query.date

    var detail_table = await pool.query('SELECT * from big_table.d' + request.query.date) 

    response.status(200).json({
        body: detail_table,
        query: request.query,
    }
    )
}