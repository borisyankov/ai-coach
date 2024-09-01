import { Button, Flex, Select, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { Oswald } from "next/font/google";
import { FormEvent, useState } from "react";
import { WorkoutParams } from "./api/workout/schema";
import ParamSelect from "./param-select";

const font = Oswald({ subsets: ["latin"], weight: "600" });

type Props = {
  isLoading: boolean;
  onFormSubmit: (workoutParams: WorkoutParams) => void;
};

export default function ParametersForm({ isLoading, onFormSubmit }: Props) {
  const [experience, setExperience] = useState("beginner");
  const [duration, setDuration] = useState("1 hour");
  const [frequency, setFrequency] = useState("twice a week");
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFormSubmit({ experience, duration, frequency });
  };
  return (
    <form className="text-center" onSubmit={handleFormSubmit}>
      <Flex
        direction={{ initial: "column", sm: "row" }}
        gap="4"
        align="center"
        justify="center"
      >
        <ParamSelect
          label="I am a"
          defaultValue={experience}
          options={["beginner", "intermediate", "advanced"]}
          onValueChange={setExperience}
        />
        <ParamSelect
          label="I have"
          defaultValue={duration}
          options={[
            "15 minutes",
            "30 minutes",
            "45 minutes",
            "1 hour",
            "1h 30m",
          ]}
          onValueChange={setDuration}
        />
        <ParamSelect
          label="I want to train"
          defaultValue={frequency}
          options={[
            "once a week",
            "twice a week",
            "3 times / week",
            "4 times / week",
            "5 times / week",
            "everyday",
          ]}
          onValueChange={setFrequency}
        />
      </Flex>
      <Button
        size="4"
        loading={isLoading}
        variant="classic"
        className={clsx(font.className, "uppercase mt-4")}
      >
        Create workout
      </Button>
    </form>
  );
}
