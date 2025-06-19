# Module Framework Structure

This document outlines the standardized directory structure and conventions for all platform modules in the Cold Email CLI.

## Directory Structure

```
src/modules/
├── {platform}/
│   ├── index.ts                 # Main module export
│   ├── api.ts                   # Platform API client
│   ├── types.ts                 # Platform-specific types
│   ├── shell.tsx                # React Ink shell component
│   └── commands/
│       ├── {category}.ts        # Command category (e.g., campaigns.ts)
│       ├── {category}.ts        # Command category (e.g., leads.ts)
│       └── ...
```

## Platform Module Standards

### 1. **index.ts** - Main Module Export
```typescript
import { CLICommand } from '../../types/global';
import { PlatformAPI } from './api';
import { categoryCommands, categoryAliases } from './commands/category';

// Initialize API client
export const api = new PlatformAPI();

// All platform commands
export const platformCommands: CLICommand[] = [
  ...categoryCommands,
  // ... other categories
];

// All platform aliases
export const platformAliases: CLICommand[] = [
  ...categoryAliases,
  // ... other category aliases
];

// All commands combined
export const allPlatformCommands: CLICommand[] = [
  ...platformCommands,
  ...platformAliases
];

// Platform info
export const platformInfo = {
  name: 'Platform Name',
  description: 'Platform description',
  totalCommands: allPlatformCommands.length,
  categories: ['Category 1', 'Category 2'],
  status: 'active' | 'coming_soon'
};

// Command categories for organized display
export const commandCategories = {
  'Category 1': categoryCommands.filter(cmd => cmd.category === 'Category 1'),
  // ... other categories
};

// Exports for MCP and CLI usage
export { categoryCommands };

export default {
  commands: allPlatformCommands,
  platformInfo,
  commandCategories,
  api
};
```

### 2. **api.ts** - Platform API Client
```typescript
import axios, { AxiosInstance } from 'axios';

export class PlatformAPI {
  private client: AxiosInstance;
  private baseURL = 'https://api.platform.com/v1';

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey || process.env.PLATFORM_API_KEY}`
      }
    });
  }

  // Category-specific methods
  async getCategoryItems(params?: any) {
    const response = await this.client.get('/category', { params });
    return response.data;
  }

  async createCategoryItem(data: any) {
    const response = await this.client.post('/category', data);
    return response.data;
  }

  // ... other API methods
}
```

### 3. **types.ts** - Platform-specific Types
```typescript
import { z } from 'zod';

// Zod schemas for validation
export const CategoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['active', 'inactive']),
  // ... other fields
});

export type CategoryItem = z.infer<typeof CategoryItemSchema>;

// Other platform-specific types
export interface PlatformConfig {
  apiKey: string;
  baseUrl?: string;
}
```

### 4. **shell.tsx** - React Ink Shell Component
```typescript
import React, { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';

interface Props {
  onExit: () => void;
}

export default function PlatformShell({ onExit }: Props) {
  const [currentView, setCurrentView] = useState('main');

  const items = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' },
    { label: 'Exit', value: 'exit' }
  ];

  const handleSelect = (item: any) => {
    if (item.value === 'exit') {
      onExit();
    } else {
      setCurrentView(item.value);
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="blue">🎯 Platform Name</Text>
      <Text color="gray">Platform description</Text>
      
      {currentView === 'main' && (
        <SelectInput items={items} onSelect={handleSelect} />
      )}
    </Box>
  );
}
```

### 5. **commands/{category}.ts** - Command Categories
```typescript
import { CLICommand } from '../../../types/global';
import { PlatformAPI } from '../api';

const api = new PlatformAPI();

export const categoryCommands: CLICommand[] = [
  {
    name: 'category:list',
    description: 'List all category items',
    usage: 'category:list [--limit 25] [--status active]',
    category: 'Category Management',
    handler: async (args) => {
      const data = await api.getCategoryItems(args);
      console.log(JSON.stringify(data, null, 2));
    }
  },
  {
    name: 'category:create',
    description: 'Create new category item',
    usage: 'category:create --name "Item Name"',
    category: 'Category Management',
    handler: async (args) => {
      if (!args.name) {
        throw new Error('Required: --name');
      }
      const data = await api.createCategoryItem(args);
      console.log(JSON.stringify(data, null, 2));
    }
  }
  // ... more commands
];

// Command aliases
export const categoryAliases: CLICommand[] = [
  { ...categoryCommands[0], name: 'cat:list' },
  { ...categoryCommands[1], name: 'cat:create' }
];
```

## Current Platform Implementations

### Active Platforms

#### 🎯 **SmartLead** (68 commands)
- **Focus**: Campaign Management & Analytics
- **Categories**: Campaign Management, Lead Management, Email Accounts, Email Sequences, Email Templates, Analytics & Reporting
- **Status**: ✅ Active

#### ⚡ **Instantly** (45 commands) 
- **Focus**: High-Volume Email Automation
- **Categories**: Campaign Automation, Lead Management, Email Accounts
- **Status**: ✅ Active

#### 🤖 **Salesforge** (42 commands)
- **Focus**: AI-Powered Sequences
- **Categories**: AI Sequences
- **Status**: ✅ Active

#### 🎯 **Apollo** (42 commands)
- **Focus**: Email Sequences & Outreach
- **Categories**: Email Sequences, Email Templates, Contacts, Email Accounts
- **Status**: ✅ Active

### Coming Soon Platforms

#### 🦬 **Email Bison**
- **Focus**: Advanced Email Automation
- **Status**: 🚧 Coming Soon

#### 📊 **AmpleMarket**
- **Focus**: Sales Intelligence Platform
- **Status**: 🚧 Coming Soon

#### 📝 **Lemlist**
- **Focus**: Personalization at Scale
- **Status**: 🚧 Coming Soon

#### 🎯 **Outreach**
- **Focus**: Sales Engagement Platform
- **Status**: 🚧 Coming Soon

#### 📈 **SalesLoft**
- **Focus**: Revenue Intelligence
- **Status**: 🚧 Coming Soon

## Implementation Guidelines

### Command Naming Convention
- Use `category:action` format (e.g., `campaigns:list`, `leads:create`)
- Provide short aliases (e.g., `c:list`, `l:create`)
- Use consistent action verbs: `list`, `get`, `create`, `update`, `delete`

### Error Handling
```typescript
handler: async (args) => {
  try {
    if (!args.required_param) {
      throw new Error('Required: --required_param');
    }
    const data = await api.someMethod(args);
    console.log(JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
}
```

### API Response Format
- Always output JSON responses with `JSON.stringify(data, null, 2)`
- Include success messages for operations that don't return data
- Use consistent error messaging with ❌ emoji

### Environment Variables
- Use `PLATFORM_API_KEY` format (e.g., `SMARTLEAD_API_KEY`)
- Support both environment variables and constructor parameters
- Document all required environment variables

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Proper type definitions for all API responses
- Use Zod schemas for runtime validation

### Formatting & Linting
- Biome for code formatting and linting
- 2-space indentation
- Single quotes for strings
- Trailing commas in ES5 mode

### Testing
- Unit tests for API clients
- Integration tests for commands
- Mock API responses for testing

## MCP Integration

Each platform should provide an MCP (Model Context Protocol) configuration:

```json
{
  "mcpServers": {
    "@cec/platform": {
      "command": "node",
      "args": ["dist/mcp-server.js"],
      "env": {
        "PLATFORM_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Contributing

When adding a new platform:

1. Create the directory structure following this framework
2. Implement all required files (`index.ts`, `api.ts`, `types.ts`, `shell.tsx`)
3. Add comprehensive command coverage for the platform
4. Include proper error handling and validation
5. Add to the module selector in `src/core/module-selector.ts`
6. Update platform documentation
7. Run code quality checks: `npm run quality`

## Architecture Benefits

- **Modularity**: Each platform is self-contained
- **Consistency**: Standardized structure across all platforms
- **Scalability**: Easy to add new platforms and commands
- **Maintainability**: Clear separation of concerns
- **Type Safety**: Full TypeScript support with proper typing
- **Code Quality**: Automated formatting and linting
- **Testing**: Structured approach to testing each module 