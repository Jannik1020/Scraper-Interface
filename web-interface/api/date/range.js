const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

module.exports = allowCors(async (request, response) => {
    const connectionString = process.env.DB_URL
    var Pool = require('pg-pool');
    const pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false,
        }
    });

    var all_tables = await pool.query("select table_name from information_schema.tables where table_schema='big_table' order by table_name ASC")
    response.status(200).json({
        body: all_tables["rows"].map(table => {
            return table.table_name
        }),
        query: request.query,
    })
});