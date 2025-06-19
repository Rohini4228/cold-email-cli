# 🤝 Contributing to Cold Email CLI

Thank you for your interest in contributing to the Cold Email CLI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- **Bun** (recommended for 2x performance) or Node.js 18+
- **TypeScript** knowledge
- **React** knowledge for UI components
- API keys for the platforms you want to test

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/your-username/smartlead-cli-ink.git
cd smartlead-cli-ink

# Install dependencies
bun install

# Run in development mode
bun run dev

# Run type checking
bun run type-check

# Run linting
bun run lint
```

## 🏗️ Project Architecture

### Core Structure
```
src/
├── cli.ts                 # Main CLI entry point
├── core/                  # Core functionality
│   ├── index.ts          # Shell rendering and command execution
│   ├── module-selector.ts # Platform discovery and loading
│   └── utils/            # Shared utilities
├── modules/              # Platform-specific modules
├── types/                # TypeScript definitions and schemas
└── components/           # Shared React components
```

### Platform Module Structure
Each platform follows a consistent structure:
```
src/modules/[platform]/
├── index.ts              # Platform configuration
├── api.ts                # Complete API client
├── ascii.ts              # Branded ASCII art
├── shell.tsx             # Interactive shell UI
├── commands/             # Command implementations
│   ├── campaigns.ts      # Campaign management
│   ├── contacts.ts       # Contact/lead management
│   ├── accounts.ts       # Email account management
│   ├── templates.ts      # Template management
│   └── analytics.ts      # Analytics & reporting
├── mcp/                  # MCP integration
│   └── [platform]-mcp.json
└── types.ts              # Platform-specific types (if needed)
```

## ➕ Adding a New Platform

### 1. Create Platform Module
```bash
mkdir -p src/modules/[platform]/{commands,mcp}
```

### 2. API Client (`api.ts`)
Create a comprehensive API client:
```typescript
import axios, { type AxiosInstance } from "axios";

export class PlatformAPI {
  private client: AxiosInstance;
  private baseURL = "https://api.platform.com/v1";

  constructor(apiKey?: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${apiKey || process.env.PLATFORM_API_KEY}`,
        "Content-Type": "application/json",
        "User-Agent": "CEC-Platform/2.0.0",
      },
    });
  }

  // Implement all API methods...
}
```

### 3. ASCII Art (`ascii.ts`)
Create branded ASCII art with the platform's theme:
```typescript
export const platformAscii = `
    Your ASCII art here...
`;

export const platformBanner = `
    Your banner here...
`;
```

### 4. Commands (`commands/*.ts`)
Implement command categories:
- **campaigns.ts** - Campaign management
- **contacts.ts** - Contact/lead management  
- **accounts.ts** - Email account management
- **templates.ts** - Template management
- **analytics.ts** - Analytics & reporting

### 5. Interactive Shell (`shell.tsx`)
Create React Ink component with:
- Welcome screen with ASCII art
- Category navigation (1-6 keys)
- Command listing by category
- ESC navigation
- Branded theming

### 6. Platform Configuration (`index.ts`)
Define the platform:
```typescript
export default {
  name: "Platform Name",
  description: "Platform description",
  version: "2.0.0",
  totalCommands: allCommands.length,
  categories: [
    {
      name: "📊 Category Name",
      description: "Category description",
      commands: commandCount,
    },
  ],
  api,
  commands: allCommands,
} as Platform;
```

### 7. MCP Configuration (`mcp/platform-mcp.json`)
Create comprehensive MCP server configuration for AI assistant integration.

### 8. Integration
- Add to `src/core/module-selector.ts`
- Add shell import to `src/core/index.ts`
- Add theme to `src/core/utils/theme.ts`
- Add package script to `package.json`
- Update README.md

## 🎨 Theming Guidelines

### Color Selection
Choose colors that represent the platform's brand:
- **Primary**: Main brand color
- **Secondary**: Complementary color
- **Accent**: Highlight color

### ASCII Art Guidelines
- Keep it recognizable and branded
- Use consistent character density
- Test at different terminal sizes
- Maintain professional appearance

## 📝 Command Development

### Command Structure
```typescript
{
  name: "category:action",
  description: "📋 Clear description with emoji",
  usage: "category:action --required [--optional]",
  category: "📊 Category Name",
  handler: async (args) => {
    // Implementation
  },
}
```

### Best Practices
- **Consistent naming**: Use `category:action` format
- **Clear descriptions**: Include emoji and clear purpose
- **Comprehensive usage**: Show all options
- **Error handling**: Validate required arguments
- **Output formatting**: Use consistent JSON output
- **Aliases**: Create short aliases for common commands

## 🧪 Testing

### Manual Testing
```bash
# Test specific platform
bun run src/cli.ts [platform]

# Test specific command
bun run src/cli.ts [platform] [command] --args

# Test type safety
bun run type-check
```

### Quality Checklist
- [ ] TypeScript compiles without errors
- [ ] All commands work as expected
- [ ] Shell navigation is smooth
- [ ] ASCII art displays correctly
- [ ] Theme colors are consistent
- [ ] MCP configuration is complete
- [ ] Documentation is updated

## 📋 Code Style

### TypeScript
- Use strict TypeScript settings
- Prefer `type` over `interface` for unions
- Use Zod for runtime validation
- Import types with `type` keyword

### Formatting
```bash
# Auto-format code
bun run format

# Check linting
bun run lint
```

### Naming Conventions
- **Files**: kebab-case (`email-accounts.ts`)
- **Variables**: camelCase (`emailAccount`)
- **Constants**: UPPER_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`EmailAccount`)

## 🐛 Bug Reports

### Issue Template
When reporting bugs, include:
- Platform and command affected
- Expected vs actual behavior
- Steps to reproduce
- Environment details (OS, Bun/Node version)
- Error messages and stack traces

## ✨ Feature Requests

### Enhancement Guidelines
- Describe the use case clearly
- Explain the expected benefit
- Consider impact on existing functionality
- Provide implementation suggestions if possible

## 📚 Documentation

### README Updates
When adding features:
- Update command counts
- Add new platform information
- Update examples and usage
- Maintain accurate statistics

### Code Documentation
- Add JSDoc comments for public APIs
- Include usage examples
- Document complex logic
- Maintain type definitions

## 🚀 Deployment

### Release Process
1. Update version in `package.json`
2. Update CHANGELOG.md
3. Run full test suite
4. Update documentation
5. Create release notes
6. Tag release

## 🤖 AI Integration

### MCP Guidelines
- Complete endpoint coverage
- Accurate parameter documentation
- Usage examples
- Proper error handling
- Version compatibility

## 📞 Support

### Getting Help
- **Discord**: [Join our community](https://discord.gg/mB76X5QJ)
- **Issues**: GitHub Issues for bugs and features
- **Discussions**: GitHub Discussions for questions

### Code Review
- All PRs require review
- Focus on code quality and consistency
- Test thoroughly before requesting review
- Be responsive to feedback

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mention in Discord community

---

**Thank you for contributing to Cold Email CLI! Together we're building the most comprehensive cold email automation suite available.** 🌊✨ 