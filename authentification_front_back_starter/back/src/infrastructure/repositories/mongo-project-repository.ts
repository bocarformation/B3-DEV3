import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";
import { ProjectModel } from "../../domain/models/project.model";

export class MongoProjectRepository implements IProjectRepository {

    async findAll(): Promise<any[]> {
        return ProjectModel.find().sort({date: -1})
    }

    // Pagination par offset (skip + limit)
    async findPaginated(page: number, limit: number): Promise<{projects: any[]; total: number}> {

        const skip = (page - 1) * limit ;
        const [projects, total] = await Promise.all([
            ProjectModel.find()
            .sort({date: -1})
            .skip(skip)
            .limit(limit), 
            ProjectModel.countDocuments()
        ]);

        return {projects, total};
    }

    // Pagination par curseur (keyset)
    async findByCursor(lastDate?: string, lastId?: string, limit: number = 10): Promise<any[]> {
        if(!lastDate || !lastId){
            return ProjectModel.find()
                .sort({date: -1, _id: -1})
                .limit(limit)
        }

        return ProjectModel.find({
            $or: [
                {date: { $lt: new Date(lastDate)}},
                {date: new Date(lastDate), _id: {$lt: lastId}}
            ]
        })
        .sort({date: -1, _id: -1})
        .limit(limit)
    }
}