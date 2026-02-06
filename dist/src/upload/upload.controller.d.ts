import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, projectId: string): Promise<{
        success: boolean;
        message: string;
        data: {
            tableName: string;
            originalName: string;
            columns: string[];
            rowCount: number;
        };
    }>;
    deleteTable(projectId: string, tableName: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
