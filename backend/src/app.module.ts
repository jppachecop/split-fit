import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
