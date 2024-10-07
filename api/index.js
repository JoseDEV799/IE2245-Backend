import app from "../src/app.js"
import { conectDB } from "./db.js"
conectDB()
app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;