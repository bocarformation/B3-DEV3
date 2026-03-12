import { Request } from "express";
import hash from "object-hash";
import { getRedisClient } from "../../api/config/redis.config";
import { SetOptions } from "redis";

export const requestToKey = (req: Request): string => {
    const reqDataToHash = {
        query: req.query,
        body: req.body,
        params: req.params
    };

    const hashKey = hash(reqDataToHash, { algorithm: "sha1" });

    return `${req.path}@${hashKey}`;

    //  /projects/public@a1b2c3d4e5
}

export const isRedisWorking = (): boolean => {
    try {
        const redisClient = getRedisClient();
        return redisClient !== null && redisClient.isOpen
    } catch {
        return false
    }
}

export const writeToRedis = async (key: string, value: string, options: SetOptions | undefined) => {
    const redisClient = getRedisClient();
    if (isRedisWorking()) {
        try {
            await redisClient.set(key, value, options);
        } catch (error) {
            console.log("Erreur Redis lors de l'écriture: ", error);

        }
    }
}

export const readFromRedis = async (key: string): Promise<string | null> => {
    const redisClient = getRedisClient();
    let value: string | null = null;
    if (isRedisWorking()) {
        try {
            value = await redisClient!.get(key)
        } catch (error) {
            console.log("Erreur Redis lors de la lecture: ", error);

        }
    }
    return value
}
