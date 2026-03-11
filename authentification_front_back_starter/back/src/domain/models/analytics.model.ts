import { maxLength, minLength } from "class-validator";
import mongoose from "mongoose";

export type EventType = "pageview" | "click" | "purchase" | "add-to-cart" | "remove-from-cart";

export const EventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        enum: ["pageview", "click", "purchase", "add-to-cart", "remove-from-cart"],
        lowercase: true,
        maxLength: 255,
    },
    userId: String,
    page: String,
    timestamp: Date
}, {
    timestamps: true, // créé les champ createdAt, updatedAt et __v 
});

export type Event = mongoose.Document & {
    eventName: EventType;
}

