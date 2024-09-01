import { Flex, Heading } from "@radix-ui/themes";
import type { DeepPartial } from "ai";
import { Oswald } from "next/font/google";
import { WorkoutDay } from "./api/workout/schema";
import WorkoutView from "./workout-view";

const font = Oswald({ subsets: ["latin"], weight: "600" });

export default function Day({ day }: { day: DeepPartial<WorkoutDay> }) {
  return (
    <Flex direction="column" gap="4">
      <Heading className={font.className}>{day?.dayOfWeek}</Heading>
      {day?.workouts?.map((workout) => (
        <WorkoutView key={workout?.exerciseName} workout={workout!} />
      ))}
    </Flex>
  );
}
