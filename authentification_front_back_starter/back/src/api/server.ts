import app from "./app";
import { initializeMongoose } from "./config/mongoose.config";
import { initializeRedisClient } from "./config/redis.config";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    await initializeMongoose();
    await initializeRedisClient();
    
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`)

    })
}

startServer().then(() => console.log('✅ Server started'))