import { Request, Response } from "express";
import { EventRepository } from "../../infrastructure/database/EventRepository";
import { EventService } from "../../application/services/EventService";

const eventRepository = new EventRepository()
const eventService = new EventService(eventRepository)

export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const event = await eventService.getEvent(id)
        return res.status(200).json(event)
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
}