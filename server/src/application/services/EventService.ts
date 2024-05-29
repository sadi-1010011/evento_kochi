import { IEventRepository } from "../../domain/repositories/IEventRepository";
import { IEvent } from "../../domain/entities/Event";

export class EventService {
    constructor(private eventRepository: IEventRepository) {}

    async registerEvent(event: IEvent): Promise<IEvent> {
        return await this.eventRepository.create(event);
    }

    async getAllEvents(): Promise<IEvent[]> {
        return await this.eventRepository.findAll();
    }

    async updateEvent(id: string, event: Partial<IEvent>): Promise<IEvent> {
        return await this.eventRepository.updateById(id, event);
    }

    async deleteEvent(id: string): Promise<boolean> {
        return await this.eventRepository.deleteById(id);
    }
}