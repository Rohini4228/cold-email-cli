import React, { useState } from "react";
import { Box, Text, useInput, useApp } from "ink";
import { getTheme } from "../../core/utils/theme";
import { platformInfo, commandCategories } from "./index";
import { smartleadAscii, smartleadBanner } from "./ascii";

interface Props {
  onBack: () => void;
}

export function SmartLeadShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const theme = getTheme("smartlead");

  useInput((input, key) => {
    if (key.escape || input === "q") {
      if (selectedCategory) {
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
    if (!selectedCategory && !showWelcome && /^[1-6]$/.test(input)) {
      const categories = Object.keys(commandCategories);
      const categoryIndex = parseInt(input) - 1;
      if (categories[categoryIndex]) {
        setSelectedCategory(categories[categoryIndex]);
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{smartleadAscii}</Text>
        <Text>{smartleadBanner}</Text>
        <Box marginTop={1}>
          <Text color="cyan">Press any key to continue...</Text>
        </Box>
      </Box>
    );
  }

  if (selectedCategory) {
    const commands = commandCategories[selectedCategory as keyof typeof commandCategories];
    
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="cyan" bold>
            🌊 {platformInfo.name} - {selectedCategory}
          </Text>
        </Box>
        
        <Box flexDirection="column" marginBottom={1}>
          {commands.map((cmd) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="blue">{cmd.name}</Text>
              <Text color="gray"> - {cmd.description}</Text>
            </Box>
          ))}
        </Box>

        <Box marginTop={1}>
          <Text color="gray">
            Press ESC to go back, Ctrl+C to exit
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          🌊 {platformInfo.name} v{platformInfo.version}
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="gray">{platformInfo.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">
          • Total Commands: {platformInfo.totalCommands}
        </Text>
        <Text color="gray">
          • Categories: {platformInfo.categories.length}
        </Text>
        <Text color="gray">
          • Status: {platformInfo.status === "active" ? "✅ Active" : "⏸️  Inactive"}
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="blue" bold>
          📋 Command Categories:
        </Text>
        {Object.keys(commandCategories).map((category) => {
          const commands = commandCategories[category as keyof typeof commandCategories];
          const categoryIndex = Object.keys(commandCategories).indexOf(category);
          return (
            <Box key={category} marginLeft={2}>
              <Text color="cyan">{categoryIndex + 1}.</Text>
              <Text color="white"> {category}</Text>
              <Text color="gray"> ({commands.length} commands)</Text>
            </Box>
          );
        })}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">
          Press 1-6 to explore categories, ESC to go back, Ctrl+C to exit
        </Text>
      </Box>
    </Box>
  );
}
