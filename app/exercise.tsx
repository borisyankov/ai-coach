import { Workout } from "./api/workout/schema";

export default function Exercise({ workout }: { workout?: Workout }) {
  if (!workout) return null;
  return (
    <div>
      <h2>{workout.exerciseName}</h2>
      {workout.sets}
      {workout.reps}
      {(workout.focus || []).map((x) => (
        <p key={x}>{x}</p>
      ))}
      <p>{workout.instructions}</p>
    </div>
  );
}
