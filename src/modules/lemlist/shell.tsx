import React, { useState } from "react";
import { Box, Text, useInput, useApp } from "ink";
import { getTheme } from "../../core/utils/theme";
import lemlistModule from "./index";
import { lemlistAscii, lemlistBanner } from "./ascii";

interface Props {
  onBack: () => void;
}

export function lemlistShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const theme = getTheme("lemlist");

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
      if (lemlistModule.categories[categoryIndex]) {
        setSelectedCategory(categoryIndex);
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{lemlistAscii}</Text>
        <Text>{lemlistBanner}</Text>
        <Box marginTop={1}>
          <Text color="magenta" bold>Press any key to continue...</Text>
        </Box>
      </Box>
    );
  }

  if (selectedCategory !== null) {
    const category = lemlistModule.categories[selectedCategory];
    const categoryCommands = lemlistModule.commands.filter(cmd => 
      cmd.category === category.name
    );
    
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="magenta" bold>
            💖 {lemlistModule.name} - {category.name}
          </Text>
        </Box>
        
        <Box flexDirection="column" marginBottom={1}>
          {categoryCommands.map((cmd) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="magenta">{cmd.name}</Text>
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
        <Text color="magenta" bold>
          💖 {lemlistModule.name} v{lemlistModule.version}
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="gray">{lemlistModule.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">
          • Total Commands: {lemlistModule.totalCommands}
        </Text>
        <Text color="gray">
          • Categories: {lemlistModule.categories.length}
        </Text>
        <Text color="gray">
          • Status: ✅ Active
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="magenta" bold>
          📋 Command Categories:
        </Text>
        {lemlistModule.categories.map((category, index) => (
          <Box key={category.name} marginLeft={2}>
            <Text color="cyan">{index + 1}.</Text>
            <Text color="white"> {category.name}</Text>
            <Text color="gray"> ({category.commands} commands)</Text>
          </Box>
        ))}
      </Box>

      <Box marginTop={1}>
        <Text color="gray">
          Press 1-6 to explore categories, ESC to go back, Ctrl+C to exit
        </Text>
      </Box>
    </Box>
  );
}
