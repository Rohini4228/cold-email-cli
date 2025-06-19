import { Box, Text } from "ink";
import type React from "react";

export const SalesforgeShell: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="magenta">
        🤖 Salesforge Shell
      </Text>
      <Text>Interactive shell coming soon...</Text>
    </Box>
  );
};
