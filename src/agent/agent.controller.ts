import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { QueryDto } from './dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('query')
  async executeQuery(@Body() queryDto: QueryDto) {
    const result = await this.agentService.executeQuery(
      queryDto.projectId,
      queryDto.question,
    );

    return {
      success: true,
      data: result,
    };
  }

  @Get('preview/:projectId/:tableName')
  async previewTable(
    @Param('projectId') projectId: string,
    @Param('tableName') tableName: string,
    @Query('limit') limit?: string,
  ) {
    const data = await this.agentService.previewTable(
      projectId,
      tableName,
      limit ? parseInt(limit, 10) : 10,
    );

    return {
      success: true,
      data,
    };
  }
}
