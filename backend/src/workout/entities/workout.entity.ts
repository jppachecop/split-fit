import { MuscleGroup, Workout as WorkoutModel } from '@prisma/client';

export class Workout implements WorkoutModel {
  id: string;
  name: string;
  userId: string;
  muscleGroups: MuscleGroup[];
  createdAt: Date;
}
