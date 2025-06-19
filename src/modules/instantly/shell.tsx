import { Box, Text, useApp, useInput } from "ink";
import React, { useState } from "react";
import { getTheme } from "../../core/utils/theme";
import { instantlyAscii, instantlyBanner } from "./ascii";
import instantlyModule from "./index";

interface Props {
  onBack: () => void;
}

export function InstantlyShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const theme = getTheme("instantly");

  useInput((input, key) => {
    if (key.escape || input === "q") {
      if (selectedCategory !== null) {
        setSelectedCategory(null);
      } else {
        onBack();
      }
    }

    if (key.ctrl && input === "c") {
      exit();
    }

    // Hide welcome screen on any input
    if (showWelcome && !key.ctrl && !key.escape) {
      setShowWelcome(false);
    }

    // Number keys for category selection
    if (selectedCategory === null && !showWelcome && /^[1-3]$/.test(input)) {
      const categoryIndex = parseInt(input) - 1;
      if (instantlyModule.categories[categoryIndex]) {
        setSelectedCategory(categoryIndex);
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{instantlyAscii}</Text>
        <Text>{instantlyBanner}</Text>
        <Box marginTop={1}>
          <Text color="magenta" bold>
            Press any key to continue...
          </Text>
        </Box>
      </Box>
    );
  }

  if (selectedCategory !== null) {
    const category = instantlyModule.categories[selectedCategory];
    const categoryCommands = instantlyModule.commands.filter((cmd) => cmd.category === category.name);

    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="magenta" bold>
            🚀 {instantlyModule.name} - {category.name}
          </Text>
        </Box>

        <Box flexDirection="column" marginBottom={1}>
          {categoryCommands.slice(0, 15).map((cmd) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="magenta">{cmd.name}</Text>
              <Text color="gray"> - {cmd.description}</Text>
            </Box>
          ))}
          {categoryCommands.length > 15 && (
            <Text color="yellow">... and {categoryCommands.length - 15} more commands</Text>
          )}
        </Box>

        <Box marginTop={1}>
          <Text color="gray">Press ESC to go back, Ctrl+C to exit</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text color="magenta" bold>
          🚀 {instantlyModule.name} v{instantlyModule.version}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="gray">{instantlyModule.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">• Total Commands: {instantlyModule.totalCommands}</Text>
        <Text color="gray">• Categories: {instantlyModule.categories.length}</Text>
        <Text color="gray">• Status: ✅ Active</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="magenta" bold>
          📋 Command Categories:
        </Text>
        {instantlyModule.categories.map((category, index) => (
          <Box key={category.name} marginLeft={2}>
            <Text color="cyan">{index + 1}.</Text>
            <Text color="white"> {category.name}</Text>
            <Text color="gray"> ({category.commands} commands)</Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">Press 1-3 to explore categories, ESC to go back, Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}
