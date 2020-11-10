import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectService } from '../services/project.service';

@Controller('projects')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @Get()
    findAll() {
        return this.projectService.findAll$()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne$(id)
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create$(createProjectDto)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update$(id, updateProjectDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.projectService.delete$(id)
    }
}
