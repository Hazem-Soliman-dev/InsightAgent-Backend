import { AgentService } from './agent.service';
import { QueryDto } from './dto';
export declare class AgentController {
    private readonly agentService;
    constructor(agentService: AgentService);
    executeQuery(queryDto: QueryDto): Promise<{
        success: boolean;
        data: import("./agent.service").QueryResult;
    }>;
    previewTable(projectId: string, tableName: string, limit?: string): Promise<{
        success: boolean;
        data: Record<string, unknown>[];
    }>;
}
