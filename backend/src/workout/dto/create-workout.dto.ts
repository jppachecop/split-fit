import { MuscleGroup } from '@prisma/client';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';

export class CreateWorkoutDto {
  name: string;
  muscleGroups: MuscleGroup[];
  exercises: CreateExerciseDto[];
}
