function config() {
    const url = require('url')
    const params = url.parse(process.env.DB_URL);
    const auth = params.auth.split(':');

    return {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
    };
}

export default function handler(request, response) {

    console.log("Hallo")
    console.log(config())

    var Pool = require('pg-pool');
    const pool = new Pool(config());

    /*var date = request.query.date
    console.log(date)
    var detail_table = await pool.query('SELECT * from big_table.d' + date) 

    response.status(200).json({
        body: detail_table,
        query: request.query,
    })*/
};