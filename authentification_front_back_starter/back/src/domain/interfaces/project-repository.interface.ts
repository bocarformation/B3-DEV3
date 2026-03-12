export interface IProjectRepository {
    findAll(): Promise<any[]>;
}