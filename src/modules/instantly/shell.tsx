import { Box, Text } from "ink";
import type React from "react";

export const InstantlyShell: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="orange">
        🚀 Instantly Shell
      </Text>
      <Text>Interactive shell coming soon...</Text>
    </Box>
  );
};
