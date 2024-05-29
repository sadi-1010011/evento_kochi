import { IEventRepository } from "../../domain/repositories/IEventRepository";
import { IEvent } from "../../domain/entities/Event";
import EventModel from "./models/EventModel";

export class EventRepository implements IEventRepository {
    async create(event: IEvent): Promise<IEvent> {
        const newEvent = new EventModel(event);
        const savedEvent = await newEvent.save()
        return savedEvent.toObject() as IEvent;
    }
    async findAll(): Promise<IEvent[]> {
        return await EventModel.find().exec();
    }
    async updateById(id: string, event: Partial<IEvent>): Promise<IEvent> {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, event, { new: true }).exec();
        if (!updatedEvent) {
            throw new Error(`Event with id ${id} not found`);
        }
        return updatedEvent.toObject() as IEvent;
    }
    async deleteById(id: string): Promise<boolean> {
        const deletedEvent = await EventModel.findByIdAndDelete(id).exec();
        return deletedEvent ? true : false;
    }
}