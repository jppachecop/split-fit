import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        name: createWorkoutDto.name,
        muscleGroups: createWorkoutDto.muscleGroups,
        user: {
          connect: {
            id: createWorkoutDto.userId,
          },
        },
        exercises: {
          create: createWorkoutDto.exercises,
        },
      },
    });
  }

  async findAllByUser(userId: string): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: { userId },
    });
  }

  async findOne(id: string): Promise<Workout> {
    const workout = await this.prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: true,
      },
    });
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }
    return workout;
  }

  async update(
    id: string,
    updateWorkoutDto: UpdateWorkoutDto,
  ): Promise<Workout> {
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

  async remove(id: string): Promise<string> {
    await this.prisma.workout.delete({
      where: { id },
    });
    return id;
  }
}
