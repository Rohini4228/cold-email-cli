import { Box, Text, useApp, useInput } from "ink";
import React, { useMemo, useState } from "react";
import { getTheme } from "../../core/utils/theme";
import { smartleadAscii, smartleadBanner } from "./ascii";
import smartleadModule from "./index";

interface Props {
  onBack: () => void;
}

export function SmartLeadShell({ onBack }: Props) {
  const { exit } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommand, setSelectedCommand] = useState<number | null>(null);
  const theme = getTheme("smartlead");

  // Compute category commands with proper filtering
  const categoryCommands = useMemo(() => {
    if (selectedCategory === null) return [];
    const category = smartleadModule.categories[selectedCategory];
    return smartleadModule.commands.filter((cmd) => cmd.category === category.name);
  }, [selectedCategory]);

  // Compute searched commands
  const searchedCommands = useMemo(() => {
    if (!searchQuery) return [];
    return smartleadModule.commands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cmd.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Compute actual category counts
  const actualCategoryCounts = useMemo(() => {
    return smartleadModule.categories.map((category) => ({
      ...category,
      actualCommands: smartleadModule.commands.filter((cmd) => cmd.category === category.name).length,
    }));
  }, []);

  useInput((input, key) => {
    // Global navigation
    if (key.escape || input === "q") {
      if (selectedCommand !== null) {
        setSelectedCommand(null);
      } else if (searchMode) {
        setSearchMode(false);
        setSearchQuery("");
      } else if (selectedCategory !== null) {
        setSelectedCategory(null);
      } else {
        onBack();
      }
      return;
    }

    if (key.ctrl && input === "c") {
      exit();
      return;
    }

    // Hide welcome screen on any input
    if (showWelcome && !key.ctrl && !key.escape) {
      setShowWelcome(false);
      return;
    }

    // Search mode
    if (input === "/" && !searchMode && selectedCategory === null) {
      setSearchMode(true);
      setSearchQuery("");
      return;
    }

    if (searchMode) {
      if (key.return) {
        setSearchMode(false);
        return;
      }
      if (key.delete || key.backspace) {
        setSearchQuery((prev) => prev.slice(0, -1));
      } else if (input && input.length === 1 && !key.ctrl) {
        setSearchQuery((prev) => prev + input);
      }
      return;
    }

    // Command selection in category view
    if (selectedCategory !== null && !searchMode) {
      if (/^[0-9]$/.test(input)) {
        const commandIndex = parseInt(input) - 1;
        if (commandIndex >= 0 && commandIndex < Math.min(9, categoryCommands.length)) {
          setSelectedCommand(commandIndex);
        }
      }
      if (input === "a" && categoryCommands.length > 9) {
        // Show all commands
        console.log("\n📋 All Commands in Category:\n");
        categoryCommands.forEach((cmd, index) => {
          console.log(`${index + 1}. ${cmd.name} - ${cmd.description}`);
        });
      }
      return;
    }

    // Main menu navigation
    if (selectedCategory === null && !searchMode && !showWelcome) {
      if (/^[1-6]$/.test(input)) {
        const categoryIndex = parseInt(input) - 1;
        if (actualCategoryCounts[categoryIndex] && actualCategoryCounts[categoryIndex].actualCommands > 0) {
          setSelectedCategory(categoryIndex);
        }
      }
      if (input === "h") {
        // Show help
        console.log("\n🚀 Quick Help:");
        console.log("• Press 1-6 to explore categories");
        console.log("• Press / to search commands");
        console.log("• Press ESC to go back");
        console.log("• Press Ctrl+C to exit\n");
      }
    }
  });

  if (showWelcome) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{smartleadAscii}</Text>
        <Text>{smartleadBanner}</Text>
        <Box marginTop={1}>
          <Text color="cyan" bold>
            Press any key to continue...
          </Text>
        </Box>
      </Box>
    );
  }

  // Command detail view
  if (selectedCommand !== null) {
    const command = categoryCommands[selectedCommand];
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="cyan" bold>
            🔍 Command Details: {command.name}
          </Text>
        </Box>

        <Box flexDirection="column" marginBottom={1}>
          <Text color="green">Description:</Text>
          <Text color="white">{command.description}</Text>
          <Text></Text>

          <Text color="green">Usage:</Text>
          <Text color="yellow">{command.usage}</Text>
          <Text></Text>

          <Text color="green">Category:</Text>
          <Text color="blue">{command.category}</Text>

          {command.examples && command.examples.length > 0 && (
            <>
              <Text></Text>
              <Text color="green">Examples:</Text>
              {command.examples.map((example, index) => (
                <Text key={`${command.name}-example-${index}`} color="gray">
                  {" "}
                  {example}
                </Text>
              ))}
            </>
          )}
        </Box>

        <Box marginTop={1}>
          <Text color="gray">Press ESC to go back, Ctrl+C to exit</Text>
        </Box>
      </Box>
    );
  }

  // Search results view
  if (searchMode || searchQuery) {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="cyan" bold>
            🔍 Search Commands {searchMode ? "(Type to search, Enter to finish)" : ""}
          </Text>
        </Box>

        <Box marginBottom={1}>
          <Text color="yellow">Query: {searchQuery}</Text>
        </Box>

        {searchQuery && (
          <Box flexDirection="column" marginBottom={1}>
            <Text color="green" bold>
              Found {searchedCommands.length} commands:
            </Text>
            {searchedCommands.slice(0, 10).map((cmd, index) => (
              <Box key={cmd.name} marginLeft={2}>
                <Text color="cyan">{index + 1}.</Text>
                <Text color="white"> {cmd.name}</Text>
                <Text color="gray"> - {cmd.description}</Text>
              </Box>
            ))}
            {searchedCommands.length > 10 && (
              <Text color="yellow">... and {searchedCommands.length - 10} more commands</Text>
            )}
          </Box>
        )}

        <Box marginTop={1}>
          <Text color="gray">
            {searchMode ? "Type to search, Enter to finish" : "Press / to search again, ESC to go back"}
          </Text>
        </Box>
      </Box>
    );
  }

  // Category view
  if (selectedCategory !== null) {
    const category = actualCategoryCounts[selectedCategory];

    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text color="cyan" bold>
            🌊 {smartleadModule.name} - {category.name}
          </Text>
          <Text color="gray">{category.actualCommands} commands available</Text>
        </Box>

        <Box flexDirection="column" marginBottom={1}>
          {categoryCommands.slice(0, 9).map((cmd, index) => (
            <Box key={cmd.name} marginBottom={0}>
              <Text color="cyan">{index + 1}.</Text>
              <Text color="blue"> {cmd.name}</Text>
              <Text color="gray"> - {cmd.description}</Text>
            </Box>
          ))}
          {categoryCommands.length > 9 && (
            <>
              <Text color="yellow">... and {categoryCommands.length - 9} more commands</Text>
              <Text color="gray">Press 'a' to see all commands</Text>
            </>
          )}
        </Box>

        <Box marginTop={1}>
          <Text color="gray">Press 1-9 for command details, 'a' for all, ESC to go back</Text>
        </Box>
      </Box>
    );
  }

  // Main menu
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          🌊 {smartleadModule.name} v{smartleadModule.version}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="gray">{smartleadModule.description}</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="green" bold>
          📊 Platform Stats:
        </Text>
        <Text color="gray">• Total Commands: {smartleadModule.totalCommands}</Text>
        <Text color="gray">• Categories: {actualCategoryCounts.length}</Text>
        <Text color="gray">• Status: ✅ Active</Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text color="blue" bold>
          📋 Command Categories:
        </Text>
        {actualCategoryCounts.map((category, index) => (
          <Box key={category.name} marginLeft={2}>
            <Text color={category.actualCommands > 0 ? "cyan" : "red"}>{index + 1}.</Text>
            <Text color="white"> {category.name}</Text>
            <Text color={category.actualCommands > 0 ? "green" : "red"}> ({category.actualCommands} commands)</Text>
            {category.actualCommands === 0 && <Text color="red"> ⚠️</Text>}
          </Box>
        ))}
      </Box>

      <Box flexDirection="column" marginTop={1}>
        <Text color="gray">Press 1-6 to explore categories • / to search • h for help • ESC to exit</Text>
        <Text color="yellow">
          💡 Tip: Use '/' to quickly search across all {smartleadModule.totalCommands} commands!
        </Text>
      </Box>
    </Box>
  );
}
