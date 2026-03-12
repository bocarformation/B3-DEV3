import { IProjectRepository } from "../../domain/interfaces/project-repository.interface";

export class ProjectsQuery {
    constructor(private readonly projectRepository: IProjectRepository){}

    async execute(){
        return this.projectRepository.findAll();
    }
}