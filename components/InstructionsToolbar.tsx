import { instructionNamesAtom } from "@/app/atoms";
import {
  InstructionGroup,
  InstructionName,
  instructionGroups,
} from "@/lib/refiner/instructions";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";

import { useAtom } from "jotai";
import { green } from "@mui/material/colors";

export function InstructionsToolbar() {
  return (
    <Stack direction="row" gap={1} sx={{ mb: 1, flexWrap: "wrap" }}>
      {instructionGroups.map((instructionGroup) => (
        <InstructionGroupToggleBar
          key={instructionGroup.groupName}
          instructionGroup={instructionGroup}
        />
      ))}
    </Stack>
  );
}

function InstructionGroupToggleBar({
  instructionGroup,
}: {
  instructionGroup: InstructionGroup;
}) {
  const [instructionNames, setInstructionNames] = useAtom(instructionNamesAtom);

  const isInstructionSelected = (instructionName: InstructionName) => {
    return instructionNames.includes(instructionName);
  };

  return (
    <ToggleButtonGroup
      exclusive={instructionGroup.exclusive}
      value={instructionNames}
      onChange={(event, instructionName) => {
        if (isInstructionSelected(instructionName)) {
          setInstructionNames(
            instructionNames.filter((name) => name !== instructionName)
          );
        } else {
          if (instructionGroup.exclusive)  {
            const groupNames = instructionGroup.instructions.map((instruction) => instruction.name)
                    .filter((name) => name !== instructionName);
            setInstructionNames(
              [...instructionNames.filter((name) => !groupNames.includes(name)), instructionName]
            );
          } else {
            setInstructionNames([...instructionNames, instructionName]);
          }
        }
        console.log(instructionNames);
      }}
      size="small"
    >
      {instructionGroup.instructions.map((instruction) => (
        <Tooltip
          title={instruction.prompt}
          key={instruction.name}
          placement="top"
          arrow
        >
          <ToggleButton
            value={instruction.name}
            sx={{
              filter: isInstructionSelected(instruction.name)
                ? "none"
                : "grayscale(100%)",
              borderBottom: !isInstructionSelected(instruction.name)
                ? "1px solid rgba(0, 0, 0, 0.12)"
                : `4px solid ${green[300]}`,
            }}
          >
            {instruction.emoji}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
