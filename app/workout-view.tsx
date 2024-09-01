import { Badge, Card, Flex, Heading } from "@radix-ui/themes";
import { Workout } from "./api/workout/schema";
import type { DeepPartial } from "ai";
import { Oswald } from "next/font/google";
import clsx from "clsx";

const font = Oswald({ subsets: ["latin"], weight: "600" });

type Props = {
  workout: DeepPartial<Workout>;
};

export default function WorkoutView({ workout }: Props) {
  if (!workout) return null;
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Heading className={clsx(font.className, "uppercase")}>
          {workout.exerciseName}
        </Heading>
        <div>Sets: {workout.sets}</div>
        <div>Reps: {workout.reps}</div>
        <Flex gap="1">
          {(workout.focus || []).map((x) => (
            <Badge key={x}>{x}</Badge>
          ))}
        </Flex>
        <p>{workout.instructions}</p>
      </Flex>
    </Card>
  );
}
