"use client";

import { Flex, Grid } from "@radix-ui/themes";
import { experimental_useObject as useObject } from "ai/react";
import clsx from "clsx";
import { Oswald } from "next/font/google";
import { WorkoutParams, workoutPlanSchema } from "./api/workout/schema";
import Day from "./day";
import ParametersForm from "./parameters-form";

const font = Oswald({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const { object, submit, isLoading } = useObject({
    api: "/api/workout",
    schema: workoutPlanSchema,
  });
  async function handleFormSubmit(workoutParams: WorkoutParams) {
    submit(workoutParams);
  }
  return (
    <Flex
      direction="column"
      gap="8"
      align="center"
      className="p-8 max-w-screen-xl mx-auto"
    >
      <h1
        className={clsx(
          font.className,
          "leading-[6rem] text-7xl uppercase text-blue-700"
        )}
      >
        AI coach
      </h1>
      <ParametersForm onFormSubmit={handleFormSubmit} isLoading={isLoading} />

      <Grid
        rows={{ initial: object?.days?.length.toString(), sm: "1" }}
        columns={{ initial: "1", sm: object?.days?.length.toString() }}
        gap="4"
      >
        {(object?.days || []).map((x) => (
          <Day key={x?.dayOfWeek} day={x!} />
        ))}
      </Grid>
    </Flex>
  );
}
