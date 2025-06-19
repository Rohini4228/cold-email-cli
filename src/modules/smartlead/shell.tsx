import { Box, Text } from "ink";
import type React from "react";

export const SmartLeadShell: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">
        ⚡ SmartLead Shell
      </Text>
      <Text>Interactive shell coming soon...</Text>
    </Box>
  );
};
