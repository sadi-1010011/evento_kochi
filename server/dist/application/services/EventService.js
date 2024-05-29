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
exports.EventService = void 0;
class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    registerEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventRepository.create(event);
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventRepository.findAll();
        });
    }
    updateEvent(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventRepository.updateById(id, event);
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventRepository.deleteById(id);
        });
    }
}
exports.EventService = EventService;
