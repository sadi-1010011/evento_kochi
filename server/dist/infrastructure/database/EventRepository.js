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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const EventModel_1 = __importDefault(require("./models/EventModel"));
class EventRepository {
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEvent = new EventModel_1.default(event);
            const savedEvent = yield newEvent.save();
            return savedEvent.toObject();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EventModel_1.default.find().exec();
        });
    }
    updateById(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedEvent = yield EventModel_1.default.findByIdAndUpdate(id, event, { new: true }).exec();
            if (!updatedEvent) {
                throw new Error(`Event with id ${id} not found`);
            }
            return updatedEvent.toObject();
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedEvent = yield EventModel_1.default.findByIdAndDelete(id).exec();
            return deletedEvent ? true : false;
        });
    }
}
exports.EventRepository = EventRepository;
