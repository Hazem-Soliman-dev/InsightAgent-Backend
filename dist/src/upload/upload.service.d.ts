import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
export declare class UploadService {
    private prisma;
    private projectsService;
    private readonly logger;
    constructor(prisma: PrismaService, projectsService: ProjectsService);
    private sanitizeFilename;
    private sanitizeColumnName;
    private generateTableName;
    processCSV(projectId: string, file: Express.Multer.File): Promise<{
        tableName: string;
        originalName: string;
        columns: string[];
        rowCount: number;
    }>;
    getProjectSchemas(projectId: string): Promise<Array<{
        tableName: string;
        originalName: string;
        columns: string[];
    }>>;
    deleteTable(projectId: string, tableName: string): Promise<void>;
    private createIndexes;
}
