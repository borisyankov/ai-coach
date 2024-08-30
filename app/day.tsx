import type { PartialDeep } from "type-fest";
import { Card } from "@radix-ui/themes";
import Exercise from "./exercise";
import { WorkoutDay } from "./api/workout/schema";

export default function Day({ day }: { day?: PartialDeep<WorkoutDay> }) {
  return (
    <Card key={day?.dayOfWeek}>
      <h2>{day?.dayOfWeek}</h2>
      {day?.workouts?.map((x) => (
        <Exercise key={x?.exerciseName} workout={x} />
      ))}
    </Card>
  );
}
