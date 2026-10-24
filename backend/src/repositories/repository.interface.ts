export default interface IRepository<T, TCreate> {
    findById(id: string): Promise<T | null>
    create(entity: TCreate): Promise<T>
    update(entity: T): Promise<T>
    delete(id: string): Promise<void>
}