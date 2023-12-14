import { projectModel } from "../../database/schemas/project.schema";
import { ProjectInterface } from "../../util/interfaces";

class ProjectMongooseService {

    async createProject(projectData: ProjectInterface) {
        const isCreated = await projectModel.create(projectData);
        if (!isCreated) {
            return false;
        }
        return true;
    }

    async findProject(projectID: object) {
        const projectDocument = await projectModel.findOne(projectID);
        if (!projectDocument) {
            return false;
        }
        return projectDocument;
    }

    async findProjects(userID: object) {
        const projectsDocuments = await projectModel.find(userID);
        if(!projectsDocuments) {
            return false;
        }
        return projectsDocuments;
    }

    async updateProject(projectID: object, update: object) {
        const isUpdated = await projectModel.findOneAndUpdate( projectID, update);
        if (!isUpdated) {
            return false;
        }
        return true;
    }

    async deleteProject(projectID: object) {
        const isDeleted = await projectModel.findOneAndDelete(projectID);
        if (!isDeleted) {
            return false;
        }
        return true;
    }

    async deleteProjects(projectID: object) {
        const isDeleted = await projectModel.deleteMany(projectID);
        if (!isDeleted) {
            return false;
        }
        return true;
    }
}

export const projectMongooseService = new ProjectMongooseService();
