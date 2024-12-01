import app from "../src/app.js"
import { conectDB } from "../src/db.js"
conectDB()
app.listen(5000, () => 
    console.log('http://localhost:5000')
);

export default app;