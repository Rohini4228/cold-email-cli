import { Box, Text, useApp, useInput } from "ink";
import React, { useState } from "react";
import { getTheme } from "../../core/utils/theme";
import { quickmailAscii, quickmailBanner } from "./ascii";
import quickmailModule from "./index";

interface Props {
  onBack: () => void;
}

export function QuickMailShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const theme = getTheme("quickmail");

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
    if (selectedCategory === null && !showWelcome && /^[1-6]$/.test(input)) {
      const categoryIndex = parseInt(input) - 1;
      if (quickmailModule.categories[categoryIndex]) {
        setSelectedCategory(categoryIndex);
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{quickmailAscii}</Text>
        <Text>{quickmailBanner}</Text>
        <Box marginTop={1}>
          <Text color="cyan" bold>
            Press any key to continue...
          </Text>
        </Box>
      </Box>
    );
  }

  if (selectedCategory !== null) {
    const category = quickmailModule.categories[selectedCategory];
    const categoryCommands = quickmailModule.commands.filter((cmd) => cmd.category === category.name);

    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="cyan" bold>
            🌊 {quickmailModule.name} - {category.name}
          </Text>
        </Box>

        <Box flexDirection="column" marginBottom={1}>
          {categoryCommands.slice(0, 15).map((cmd) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="cyan">{cmd.name}</Text>
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
        <Text color="cyan" bold>
          🌊 {quickmailModule.name} v{quickmailModule.version}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="gray">{quickmailModule.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="cyan" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">• Total Commands: {quickmailModule.totalCommands}</Text>
        <Text color="gray">• Categories: {quickmailModule.categories.length}</Text>
        <Text color="gray">• Status: ✅ Active</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="cyan" bold>
          📋 Command Categories:
        </Text>
        {quickmailModule.categories.map((category, index) => (
          <Box key={category.name} marginLeft={2}>
            <Text color="cyan">{index + 1}.</Text>
            <Text color="white"> {category.name}</Text>
            <Text color="gray"> ({category.commands} commands)</Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">Press 1-6 to explore categories, ESC to go back, Ctrl+C to exit</Text>
      </Box>
    </Box>
  );
}
