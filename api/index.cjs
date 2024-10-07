const app = require ("../src/app.js")
const { conectDB } = require("../src/db.js")

conectDB()
app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;