import React, { useState } from "react";
import { Box, Text, useInput, useApp } from "ink";
import { getTheme } from "../../core/utils/theme";
import salesforgeModule from "./index";
import { salesforgeAscii, salesforgeBanner } from "./ascii";

interface Props {
  onBack: () => void;
}

export function SalesforgeShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const theme = getTheme("salesforge");

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
    if (selectedCategory === null && !showWelcome && /^[1]$/.test(input)) {
      const categoryIndex = parseInt(input) - 1;
      if (salesforgeModule.categories[categoryIndex]) {
        setSelectedCategory(categoryIndex);
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{salesforgeAscii}</Text>
        <Text>{salesforgeBanner}</Text>
        <Box marginTop={1}>
          <Text color="red" bold>Press any key to continue...</Text>
        </Box>
      </Box>
    );
  }

  if (selectedCategory !== null) {
    const category = salesforgeModule.categories[selectedCategory];
    const categoryCommands = salesforgeModule.commands.filter(cmd => 
      cmd.category === category.name
    );
    
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="red" bold>
            🔥 {salesforgeModule.name} - {category.name}
          </Text>
        </Box>
        
        <Box flexDirection="column" marginBottom={1}>
          {categoryCommands.slice(0, 15).map((cmd) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="red">{cmd.name}</Text>
              <Text color="gray"> - {cmd.description}</Text>
            </Box>
          ))}
          {categoryCommands.length > 15 && (
            <Text color="orange">... and {categoryCommands.length - 15} more commands</Text>
          )}
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
        <Text color="red" bold>
          🔥 {salesforgeModule.name} v{salesforgeModule.version}
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="gray">{salesforgeModule.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">
          • Total Commands: {salesforgeModule.totalCommands}
        </Text>
        <Text color="gray">
          • Categories: {salesforgeModule.categories.length}
        </Text>
        <Text color="gray">
          • Status: ✅ Active
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="red" bold>
          📋 Command Categories:
        </Text>
        {salesforgeModule.categories.map((category, index) => (
          <Box key={category.name} marginLeft={2}>
            <Text color="cyan">{index + 1}.</Text>
            <Text color="white"> {category.name}</Text>
            <Text color="gray"> ({category.commands} commands)</Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">
          Press 1 to explore AI sequences, ESC to go back, Ctrl+C to exit
        </Text>
      </Box>
    </Box>
  );
}
