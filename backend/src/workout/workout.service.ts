import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  create(createWorkoutDto: CreateWorkoutDto) {
    return this.prisma.workout.create({
      data: {
        name: createWorkoutDto.name,
        muscleGroups: createWorkoutDto.muscleGroups,
        user: {
          connect: {
            id: '1',
          },
        },
        exercises: {
          create: createWorkoutDto.exercises,
        },
      },
    });
  }

  findAll() {
    return this.prisma.workout.findMany();
  }

  findOne(id: string) {
    return this.prisma.workout.findUnique({
      where: { id },
    });
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({
      where: { id },
      data: {
        name: updateWorkoutDto.name,
        muscleGroups: updateWorkoutDto.muscleGroups,
        exercises: {
          create: updateWorkoutDto.exercises,
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.workout.delete({
      where: { id },
    });
  }
}
