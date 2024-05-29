import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from '../../../domain/entities/Event';

interface IEventDocument extends IEvent, Document {} 

// Define the Event schema
const EventSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    timestamp: { type: String, required: true },
    imageurl: { type: String, required: true }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

export default mongoose.model<IEventDocument>('Event',EventSchema)







