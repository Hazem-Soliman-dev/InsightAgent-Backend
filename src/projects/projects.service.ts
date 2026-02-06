import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
      include: { tables: true },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: { tables: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: { tables: true },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id); // Ensure project exists

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
      include: { tables: true },
    });
  }

  async remove(id: string) {
    const project = await this.findOne(id);

    // Drop all dynamic tables associated with this project
    for (const table of project.tables) {
      try {
        await this.prisma.$executeRawUnsafe(
          `DROP TABLE IF EXISTS "${table.tableName}" CASCADE`,
        );
      } catch (error) {
        console.error(`Failed to drop table ${table.tableName}:`, error);
      }
    }

    // Delete project (cascade will delete TableMetadata entries)
    return this.prisma.project.delete({
      where: { id },
    });
  }

  async getProjectTables(projectId: string) {
    const project = await this.findOne(projectId);
    return project.tables;
  }
}
