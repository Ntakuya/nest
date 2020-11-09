import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>
    ) {}

    findAll$() {
        return from(this.projectRepository.find())
    }

    findOne$(id: string) {
        return from(this.projectRepository.findOne(id))
    }

    create$(createProjectDto: CreateProjectDto) {
        return of(this.projectRepository.create(createProjectDto)).pipe(
            switchMap(entity => from(this.projectRepository.save(entity)))
        )
    }

    update$(id: string, updateDto: UpdateProjectDto) {
        return from(this.projectRepository.findOne(id)).pipe(
            map(entity => this.projectRepository.merge(entity, updateDto)),
            switchMap(entity => {
                return from(this.projectRepository.save(entity))
            })
        )
    }

    delete$(id: string) {
        return from(this.projectRepository.delete(id))
    }
}
