export default function handler(request, response) {


    console.log("Hallo")
    console.log(require("../_utils.js").config())

   /* var Pool = require('pg-pool');
    const pool = new Pool(require("../_utils.js").config());

    var date = request.query.date
    console.log(date)
    var detail_table = await pool.query('SELECT * from big_table.d' + date) 

    response.status(200).json({
        body: detail_table,
        query: request.query,
    })*/
};