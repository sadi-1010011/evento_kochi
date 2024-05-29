"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getAllEvents = exports.createEvent = void 0;
const EventService_1 = require("../../application/services/EventService");
const EventRepository_1 = require("../../infrastructure/database/EventRepository");
const eventRepository = new EventRepository_1.EventRepository();
const eventService = new EventService_1.EventService(eventRepository);
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    try {
        const newEvent = yield eventService.registerEvent(event);
        return res.status(201).json(newEvent);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield eventService.getAllEvents();
        return res.status(200).json(events);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.getAllEvents = getAllEvents;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eventUpdates = req.body;
    try {
        const updatedEvent = yield eventService.updateEvent(id, eventUpdates);
        return res.status(200).json(updatedEvent);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const success = yield eventService.deleteEvent(id);
        if (success) {
            return res.status(204).send();
        }
        else {
            return res.status(400).json({ error: 'Event not found' });
        }
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.deleteEvent = deleteEvent;
