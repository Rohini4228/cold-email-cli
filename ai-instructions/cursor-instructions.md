# Cursor IDE Instructions - Cold Email CLI

## Project Overview
Cold Email CLI is a professional TypeScript-based command-line interface for email sequence automation across multiple platforms (SmartLead, Instantly, Salesforge, Apollo). Built with React Ink for interactive terminal interfaces.

## Development Environment Setup

### Prerequisites
- Node.js 18+
- TypeScript 5.0+
- React Ink 4.0+
- pnpm or npm

### Key Project Structure
```
src/
├── core/           # CLI core functionality
├── modules/        # Platform implementations
│   ├── smartlead/  # SmartLead.ai integration (68 commands)
│   ├── instantly/  # Instantly.ai integration (35 commands)
│   ├── salesforge/ # Salesforge.ai integration (42 commands)
│   └── apollo/     # Apollo.io integration (42 commands)
├── types/          # TypeScript definitions
└── components/     # React Ink UI components
```

## Cursor-Specific Workflows

### 1. Auto-completion & IntelliSense
- Enable TypeScript strict mode for better type checking
- Use Cursor's AI suggestions for API endpoint implementations
- Enable auto-imports for React Ink components

### 2. Code Generation Patterns
When adding new endpoints to modules:

```typescript
// Pattern for new command in any module
{
  name: 'command:action',
  description: 'Brief description of what this does',
  usage: 'command:action --param value --flag',
  category: 'Category Name'
}
```

### 3. Testing Strategy
- Use Cursor's test generation for new commands
- Focus on email sequence functionality only
- Mock API calls with proper TypeScript interfaces

### 4. Refactoring Guidelines
- Keep modules completely separate (no cross-dependencies)
- Focus on email sequences, not data enrichment
- Maintain consistent TypeScript types across all modules

## Platform-Specific Development

### SmartLead Module (`src/modules/smartlead/`)
- **Focus**: Campaign management and analytics
- **API Base**: `https://server.smartlead.ai/api/v1`
- **Key Features**: Advanced analytics, email warmup, deliverability

### Instantly Module (`src/modules/instantly/`)
- **Focus**: High-volume email automation
- **API Base**: `https://api.instantly.ai/api/v1`
- **Key Features**: Unibox management, bulk operations, deliverability

### Salesforge Module (`src/modules/salesforge/`)
- **Focus**: AI-powered email sequences
- **API Base**: `https://api.salesforge.ai/public/v2`
- **Key Features**: AI generation, template optimization, personalization

### Apollo Module (`src/modules/apollo/`)
- **Focus**: Email sequences and contact management
- **API Base**: `https://api.apollo.io/v1`
- **Key Features**: Sequence management, contact automation, inbox handling

## Cursor AI Prompts for Development

### Adding New Commands
```
Add a new command to [MODULE] for [FUNCTIONALITY]:
- Command name: [module]:[action]
- Description: [what it does]
- Parameters: [list parameters]
- API endpoint: [HTTP method] [path]
- Focus on email sequences only
```

### TypeScript Interface Generation
```
Generate TypeScript interfaces for [PLATFORM] API response:
- Base URL: [api_url]
- Endpoint: [endpoint]
- Include proper typing for email sequence data
- Follow existing naming conventions
```

### React Ink Component Creation
```
Create a React Ink component for [FUNCTIONALITY]:
- Use existing theme system
- Include proper TypeScript props
- Follow established UI patterns
- Make it responsive for terminal
```

## Build & Testing Commands

```bash
# Development
npm run dev          # Watch mode with hot reload
npm run build        # Production build
npm run type-check   # TypeScript validation

# Testing
npm test             # Run all tests
npm run test:watch   # Watch mode testing
npm run test:coverage # Coverage report

# Code Quality
npm run lint         # ESLint
npm run format       # Prettier
npm run lint:fix     # Auto-fix linting issues
```

## Debugging with Cursor

### 1. Terminal Debugging
- Use Cursor's integrated terminal for CLI testing
- Set breakpoints in TypeScript files
- Use console.log with theme colors for better visibility

### 2. API Testing
- Use Cursor's HTTP client for API endpoint testing
- Create `.http` files for each platform
- Test authentication and rate limiting

### 3. Type Debugging
- Enable TypeScript errors overlay
- Use Cursor's "Go to Definition" for complex types
- Leverage auto-completion for API responses

## Performance Optimization

### 1. Bundle Size
- Use tree shaking for unused React Ink components
- Optimize TypeScript compilation target
- Minimize external dependencies

### 2. Runtime Performance
- Implement proper error handling for API calls
- Use async/await patterns consistently
- Cache API responses where appropriate

## Cursor Extensions Recommended

1. **TypeScript Importer** - Auto-import management
2. **Error Lens** - Inline error display
3. **Pretty TypeScript Errors** - Better error formatting
4. **Console Ninja** - Enhanced console.log debugging
5. **REST Client** - API testing within Cursor

## Code Style & Conventions

### TypeScript
- Use strict mode always
- Prefer interfaces over types for API responses
- Use proper generic typing for API methods

### React Ink
- Use functional components with hooks
- Implement proper cleanup in useEffect
- Use context for shared state across components

### CLI Architecture
- Keep modules independent and isolated
- Use consistent error handling patterns
- Implement proper help text for all commands

## Git Workflow with Cursor

### Branch Naming
- `feature/[module]-[functionality]`
- `fix/[module]-[issue]`
- `refactor/[module]-[improvement]`

### Commit Messages
```
feat(smartlead): add campaign analytics endpoint
fix(instantly): resolve unibox conversation parsing
refactor(salesforge): improve AI sequence generation
docs(apollo): update sequence management examples
```

## API Integration Guidelines

### Authentication
- Use Bearer token authentication for all platforms
- Store API keys in environment variables
- Implement proper error handling for auth failures

### Rate Limiting
- Respect platform-specific rate limits
- Implement exponential backoff for retries
- Use proper HTTP status code handling

### Error Handling
- Create consistent error interfaces
- Provide helpful error messages
- Log errors with appropriate detail level

## Production Deployment

### Build Configuration
- Set NODE_ENV=production
- Enable TypeScript strict mode
- Use proper source maps for debugging

### Distribution
- Build for multiple platforms (macOS, Linux, Windows)
- Create proper CLI binaries
- Include comprehensive documentation

## Cursor AI Assistant Tips

1. **Context Awareness**: Always provide module context when asking for code generation
2. **Type Safety**: Ask for TypeScript-first implementations
3. **React Ink Patterns**: Request components that follow established UI patterns
4. **API Integration**: Focus on email sequence endpoints, not enrichment features
5. **Testing**: Generate tests that mock API calls properly

Remember: This CLI is focused on email sequence automation only. Avoid data enrichment features and keep the scope limited to email campaign management, sequences, and analytics. 