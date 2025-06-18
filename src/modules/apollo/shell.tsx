import React from 'react';
import { Text, Box } from 'ink';

export const ApolloShell: React.FC = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="green">
        🎯 Apollo Shell
      </Text>
      <Text>Interactive shell coming soon...</Text>
    </Box>
  );
}; 