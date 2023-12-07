import { Schema, model } from 'mongoose';
import { ProjectInterface } from '../../util/interfaces';

const ProjectSchema = new Schema<ProjectInterface>({
    projectID: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    }
});

export const projectModel = model<ProjectInterface>('Project', ProjectSchema);
