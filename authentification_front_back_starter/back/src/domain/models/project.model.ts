import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: {type: String, required: true},
    skills: { type: [String], default: []},
    date: {type: Date, default: Date.now}

});

ProjectSchema.index({date: -1});
ProjectSchema.index({date: -1, _id: -1});

export const ProjectModel = mongoose.model("Project", ProjectSchema);