import { Flex, Select, Text } from "@radix-ui/themes";

type Props = {
  label: string;
  defaultValue: string;
  options: string[];
  onValueChange: (value: string) => void;
};

export default function ParamSelect({
  label,
  defaultValue,
  options: values,
  onValueChange,
}: Props) {
  return (
    <Flex gap="2">
      <Text>{label}</Text>
      <Select.Root
        size="2"
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <Select.Trigger variant="classic" />
        <Select.Content>
          {values.map((x) => (
            <Select.Item key={x} value={x}>
              {x}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
