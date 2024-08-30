"use client";

import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { experimental_useObject as useObject } from "ai/react";
import clsx from "clsx";
import { Oswald } from "next/font/google";
import { workoutPlanSchema } from "./api/workout/schema";
import { FormEvent, useState } from "react";
import Exercise from "./exercise";
import Day from "./day";

const font = Oswald({ subsets: ["latin"], weight: "600" });

export default function Home() {
  const [experience, setExperience] = useState("beginner");
  const [duration, setDuration] = useState("1 hour");
  const [frequency, setFrequency] = useState("3");
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/workout",
    schema: workoutPlanSchema,
  });
  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit({ experience, duration, frequency });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1
        className={clsx(
          font.className,
          "leading-[6rem] text-7xl uppercase text-blue-700"
        )}
      >
        AI coach
      </h1>
      <form onSubmit={handleFormSubmit}>
        <Flex gap="4">
          <Flex gap="2">
            <Text>I am a</Text>
            <Select.Root
              size="2"
              defaultValue={experience}
              onValueChange={setExperience}
            >
              <Select.Trigger variant="classic" />
              <Select.Content>
                <Select.Item value="beginner">beginner</Select.Item>
                <Select.Item value="intermediate">intermediate</Select.Item>
                <Select.Item value="advanced">advanced</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex gap="2">
            <Text>I have</Text>
            <Select.Root
              size="2"
              defaultValue={duration}
              onValueChange={setDuration}
            >
              <Select.Trigger variant="classic" />
              <Select.Content>
                <Select.Item value="15 minutes">15 minutes</Select.Item>
                <Select.Item value="30 minutes">30 minutes</Select.Item>
                <Select.Item value="45 minutes">45 minutes</Select.Item>
                <Select.Item value="1 hour">1 hour</Select.Item>
                <Select.Item value="1h 30m">1h 30m</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
          <Flex gap="2">
            <Text>I want to train</Text>
            <Select.Root
              size="2"
              defaultValue={frequency}
              onValueChange={setFrequency}
            >
              <Select.Trigger variant="classic" />
              <Select.Content>
                <Select.Item value="1">once a week</Select.Item>
                <Select.Item value="2">twice a week</Select.Item>
                <Select.Item value="3">3 times / week</Select.Item>
                <Select.Item value="4">4 times / week</Select.Item>
                <Select.Item value="5">5 times / week</Select.Item>
                <Select.Item value="7">everyday</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>
        </Flex>
        <Button
          size="4"
          loading={isLoading}
          variant="classic"
          className={clsx(font.className, "uppercase")}
        >
          Create workout
        </Button>
      </form>
      <Flex direction="row" gap="4">
        {(object?.days || []).map((x) => (
          <Day key={x?.dayOfWeek} day={x} />
        ))}
      </Flex>
    </main>
  );
}
