import app from "../src/app.js"
import { conectDB } from "../src/db.js"
conectDB()
app.listen(3000, () => console.log('Server ready on port 3000.'));

export default app;