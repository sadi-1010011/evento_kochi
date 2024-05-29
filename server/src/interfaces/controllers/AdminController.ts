import { Request, Response } from 'express'
import { EventService } from '../../application/services/EventService'
import { EventRepository } from '../../infrastructure/database/EventRepository' 
import { IEvent } from '../../domain/entities/Event'

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository)

export const createEvent = async (req: Request, res: Response) => {
    const event: IEvent = req.body;
    try {
        const newEvent = await eventService.registerEvent(event)
        return res.status(201).json(newEvent);
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await eventService.getAllEvents();
        return res.status(200).json(events);
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eventUpdates: Partial<IEvent> = req.body;
    try {
        const updatedEvent = await eventService.updateEvent(id, eventUpdates);
        return res.status(200).json(updatedEvent);
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}

export const deleteEvent = async ( req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const success = await eventService.deleteEvent(id);
        if(success) {
            return res.status(204).send();
        } else {
            return res.status(400).json({error: 'Event not found'})
        }
    } catch (error: any) {
        return res.status(400).json({error: error.message});
    }
}