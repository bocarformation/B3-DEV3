export interface IIDGenerator{
    generate(): Promise<string>;
}