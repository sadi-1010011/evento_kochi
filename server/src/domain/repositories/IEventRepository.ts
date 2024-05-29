import { IEvent } from '../entities/Event';

export interface IEventRepository {
    create(event: IEvent): Promise<IEvent>; 
    findAll(): Promise<IEvent[]>;
    findById(id: string): Promise<IEvent | null>;
    updateById(id: string, event: Partial<IEvent>): Promise<IEvent>;
    deleteById(id: string): Promise<boolean>;
}      