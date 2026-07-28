export default interface IRepository<T> {
    findById(id: string): Promise<T | null>
    delete(id: string): Promise<void>
}