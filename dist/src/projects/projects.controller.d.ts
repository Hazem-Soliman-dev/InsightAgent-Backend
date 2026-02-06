import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    getProjectTables(id: string): Promise<any>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<any>;
    remove(id: string): Promise<any>;
}
