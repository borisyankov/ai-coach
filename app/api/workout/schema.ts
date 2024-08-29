import { z } from "zod";

const workoutSchema = z.object({
  exerciseName: z.string(),
  sets: z.number(),
  reps: z.number(),
  focus: z.array(z.string()),
  instructions: z.string(),
});

export type Workout = z.infer<typeof workoutSchema>;

const workoutDaySchema = z.object({
  dayOfWeek: z.string(),
  workouts: z.array(workoutSchema),
});

export type WorkoutDay = z.infer<typeof workoutDaySchema>;

export const workoutPlanSchema = z.object({
  days: z.array(workoutDaySchema),
});
