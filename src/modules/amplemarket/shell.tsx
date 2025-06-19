import { Box, Text } from "ink";
import type React from "react";

export const AmpleMarketShell: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="blue">
        📈 AmpleMarket Shell
      </Text>
      <Text color="yellow">🚧 Coming Soon</Text>
    </Box>
  );
};
