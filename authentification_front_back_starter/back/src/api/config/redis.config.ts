import { createClient, RedisClientType } from "redis";
import { getEnv } from "./get-env";

let redisClient: RedisClientType | null = null;

export async function initializeRedisClient(): Promise<void>{
    const redisUrl = getEnv("REDIS_URI");
    
    redisClient = createClient({url : redisUrl});

    redisClient.on("error", (err) => {
        console.log("Erreur redis: ", err);
        
    });

    try {
        
        await redisClient.connect();
        console.log("✅ Client Redis connecté");
        
    } catch (error) {
        console.log("Erreur lors de la connexion Redis: ", error);
        
    }
}

export function getRedisClient(): RedisClientType{
    if(!redisClient || !redisClient.isOpen) {
        throw new Error("Le client Redis n'est pas encore initialisé ou connecté");
    }

    return redisClient;
}