import React, { useState } from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';

interface MenuItem {
  label: string;
  value: string;
  description: string;
  commands: number;
  icon: string;
  color: string;
}

const platforms: MenuItem[] = [
  {
    label: 'SmartLead - Advanced Campaign Management & Analytics',
    value: 'smartlead',
    description: 'Enterprise-grade email campaign automation with advanced analytics and lead scoring',
    commands: 68,
    icon: '⚡',
    color: 'cyan'
  },
  {
    label: 'Instantly - High-Volume Automation & Deliverability',
    value: 'instantly', 
    description: 'Scale email outreach with industry-leading deliverability and warmup features',
    commands: 45,
    icon: '🚀',
    color: 'orange'
  },
  {
    label: 'Salesforge - AI-Powered Multi-Channel Sequences',
    value: 'salesforge',
    description: 'AI-driven email personalization with multi-channel sequence automation',
    commands: 42,
    icon: '🤖',
    color: 'magenta'
  },
  {
    label: 'Apollo - Email Sequence & Outreach Automation',
    value: 'apollo',
    description: 'Professional email sequencing with contact enrichment and analytics',
    commands: 42,
    icon: '🎯',
    color: 'green'
  }
];

const utilityItems: MenuItem[] = [
  {
    label: 'Discord Community - Join our community',
    value: 'discord',
    description: 'Get help, share tips, and connect with other cold email professionals',
    commands: 0,
    icon: '💬',
    color: 'blue'
  },
  {
    label: 'Exit - Close the application',
    value: 'exit',
    description: 'Exit the Cold Email CLI',
    commands: 0,
    icon: '🚪',
    color: 'gray'
  }
];

export const MainMenu: React.FC = () => {
  const allItems = [
    ...platforms.map(platform => ({
      label: `${platform.icon} ${platform.label} (${platform.commands} commands)`,
      value: platform.value
    })),
    ...utilityItems.map(item => ({
      label: `${item.icon} ${item.label}`,
      value: item.value
    }))
  ];

  const handleSelect = (item: any) => {
    const selectedValue = item.value;
    
    if (selectedValue === 'discord') {
      console.log(chalk.blue('\n🌐 Opening Discord community:'));
      console.log(chalk.cyan('https://discord.gg/mB76X5QJ\n'));
      return;
    }
    
    if (selectedValue === 'exit') {
      console.log(chalk.gray('\n👋 Thanks for using Cold Email CLI!'));
      process.exit(0);
    }
    
    // For platform selection, we'll need to exit and let the parent handle it
    console.log(chalk.cyan(`\n🚀 Launching ${selectedValue} shell...`));
    console.log(chalk.gray('Use Ctrl+C to return to main menu\n'));
    
    // Launch the platform shell by spawning a new process
    const { spawn } = require('child_process');
    const child = spawn('cec', [selectedValue], {
      stdio: 'inherit'
    });
    
    child.on('exit', () => {
      process.exit(0);
    });
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          ❄️ Cold Email CLI v2.0.0
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="gray">
          Select a platform to launch its interactive shell:
        </Text>
      </Box>

      <SelectInput
        items={allItems}
        onSelect={handleSelect}
        indicatorComponent={({ isSelected }) => (
          <Text color={isSelected ? 'cyan' : 'gray'}>
            {isSelected ? '❯' : ' '}
          </Text>
        )}
        itemComponent={({ isSelected, label }) => (
          <Text color={isSelected ? 'cyan' : 'white'}>
            {label}
          </Text>
        )}
      />

      <Box marginTop={2}>
        <Text color="gray" dimColor>
          💡 Pro Tips:
        </Text>
      </Box>
      
      <Box flexDirection="column" marginLeft={2}>
        <Text color="gray" dimColor>
          • Use arrow keys to navigate
        </Text>
        <Text color="gray" dimColor>
          • Press Enter to select
        </Text>
        <Text color="gray" dimColor>
          • Use "cec &lt;platform&gt;" for direct access
        </Text>
        <Text color="gray" dimColor>
          • Join Discord for community support
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text color="blue" dimColor>
          Community: https://discord.gg/mB76X5QJ
        </Text>
      </Box>
    </Box>
  );
}; 