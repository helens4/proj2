const Pool = require('pg').Pool

const pool = new Pool({
    user: "rafal",
    password: "rafal",
    host: "localhost",
    port: 5432,
    database: "recipebookdb"
})

module.exports = pool