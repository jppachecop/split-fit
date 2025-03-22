import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [WorkoutModule, ExerciseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
