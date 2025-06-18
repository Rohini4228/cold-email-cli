# Windsurf IDE Instructions - Cold Email CLI

## Project Context
Cold Email CLI is a TypeScript/React Ink based command-line tool for professional email sequence automation. Supports SmartLead, Instantly, Salesforge, and Apollo platforms with 187 total commands focused exclusively on email sequences (no data enrichment).

## Windsurf-Specific Development Approach

### 1. AI-Powered Code Generation
Windsurf excels at understanding context across the entire codebase. Use its AI capabilities for:

#### Module Expansion
```prompt
Analyze the existing module pattern in src/modules/[platform]/ and generate new commands for [specific functionality]. Follow the existing TypeScript interfaces and React Ink patterns. Focus on email sequence automation only.
```

#### Cross-File Refactoring
```prompt
Refactor all modules to ensure consistent error handling patterns. Update TypeScript interfaces to match API documentation. Maintain separation between platforms while ensuring type safety.
```

### 2. Intelligent Code Completion
Windsurf's AI understands the project structure. Leverage this for:
- Auto-completing API endpoint implementations
- Generating TypeScript interfaces from API documentation
- Creating React Ink components with proper typing

### 3. Context-Aware Debugging
Use Windsurf's debugging capabilities for:
- Setting intelligent breakpoints in async API calls
- Understanding data flow between CLI core and modules
- Tracking React Ink component lifecycle

## Platform-Specific Development Workflows

### SmartLead Integration (`src/modules/smartlead/`)
**Core Focus**: Advanced campaign management and analytics

```typescript
// Key patterns to follow:
interface SmartLeadCommand {
  category: 'campaigns' | 'sequences' | 'leads' | 'analytics' | 'accounts';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  auth: 'Bearer token';
  rateLimit: '100 req/min';
}
```

**Windsurf Prompts**:
```
Generate SmartLead campaign analytics commands:
- Focus on email sequence performance
- Include TypeScript interfaces for API responses
- Add proper error handling for rate limits
- Use existing theme system for output formatting
```

### Instantly Integration (`src/modules/instantly/`)
**Core Focus**: High-volume email automation and deliverability

```typescript
// Key patterns for Instantly module:
interface InstantlyCommand {
  category: 'campaigns' | 'leads' | 'accounts' | 'unibox' | 'analytics';
  bulkOperations: boolean;
  deliverabilityFocus: boolean;
  rateLimit: '200 req/min';
}
```

**Windsurf Prompts**:
```
Create Instantly bulk lead management commands:
- Implement bulk CSV import functionality
- Add deliverability monitoring features
- Include Unibox conversation management
- Focus on high-volume email sending
```

### Salesforge Integration (`src/modules/salesforge/`)
**Core Focus**: AI-powered email sequence generation

```typescript
// AI-specific patterns for Salesforge:
interface SalesforgeCommand {
  category: 'campaigns' | 'sequences' | 'templates' | 'leads' | 'analytics';
  aiPowered: boolean;
  personalization: 'basic' | 'advanced' | 'deep';
  rateLimit: '150 req/min';
}
```

**Windsurf Prompts**:
```
Implement Salesforge AI sequence generation:
- Create AI-powered template generation commands
- Add persona-based email customization
- Include AI optimization suggestions
- Focus on sequence personalization
```

### Apollo Integration (`src/modules/apollo/`)
**Core Focus**: Email sequences and contact management

```typescript
// Contact-centric patterns for Apollo:
interface ApolloCommand {
  category: 'sequences' | 'contacts' | 'templates' | 'accounts' | 'analytics' | 'inbox';
  contactManagement: boolean;
  sequenceAutomation: boolean;
  rateLimit: '120 req/min';
}
```

**Windsurf Prompts**:
```
Develop Apollo sequence management system:
- Create comprehensive contact-to-sequence workflows
- Add sequence reply management
- Include template performance tracking
- Focus on outreach automation
```

## Windsurf Development Best Practices

### 1. Intelligent File Organization
Use Windsurf's understanding of project structure:

```
src/
├── core/
│   ├── index.ts              # Main CLI entry
│   ├── module-selector.ts    # Platform selection
│   └── utils/
│       ├── config.ts         # Configuration management
│       └── theme.ts          # UI theming system
├── modules/
│   ├── [platform]/
│   │   ├── index.ts          # Module exports
│   │   └── types.ts          # Platform-specific types
├── types/
│   └── global.ts             # Shared TypeScript definitions
└── components/               # React Ink UI components
```

### 2. AI-Assisted Type Generation
Let Windsurf generate comprehensive TypeScript interfaces:

```prompt
Generate complete TypeScript interfaces for all email sequence API responses across SmartLead, Instantly, Salesforge, and Apollo. Ensure type safety and proper generic handling for paginated results.
```

### 3. Intelligent Error Handling
Use Windsurf to create consistent error patterns:

```typescript
// Pattern for all modules:
interface APIError {
  platform: 'smartlead' | 'instantly' | 'salesforge' | 'apollo';
  code: string;
  message: string;
  details?: Record<string, any>;
  rateLimitInfo?: RateLimitInfo;
}
```

## Testing Strategy with Windsurf

### 1. AI-Generated Test Suites
```prompt
Generate comprehensive test suites for all platform modules:
- Mock API responses for email sequence endpoints
- Test error handling and rate limiting
- Include React Ink component testing
- Focus on CLI argument parsing and validation
```

### 2. Integration Testing
```prompt
Create integration tests that verify:
- Platform authentication flows
- Command execution pipelines
- React Ink UI rendering
- Configuration management
```

## React Ink Development with Windsurf

### 1. Component Architecture
```typescript
// Standard pattern for all React Ink components:
interface ComponentProps {
  theme: ThemeConfig;
  onAction: (action: string, data?: any) => void;
  isLoading?: boolean;
  error?: string;
}
```

### 2. Windsurf UI Generation Prompts
```prompt
Create React Ink components for email sequence management:
- Campaign list view with status indicators
- Sequence builder with step-by-step flow
- Analytics dashboard with charts (using ink-chart)
- Error display with retry functionality
```

## API Integration Patterns

### 1. Consistent HTTP Client
```typescript
// Use this pattern across all modules:
class APIClient {
  constructor(
    private baseURL: string,
    private apiKey: string,
    private rateLimit: RateLimit
  ) {}
  
  async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    // Consistent error handling, rate limiting, retry logic
  }
}
```

### 2. Windsurf API Integration Prompts
```prompt
Implement consistent API client pattern for all platforms:
- Add exponential backoff for rate limiting
- Include proper authentication handling
- Add request/response logging
- Focus on email sequence endpoints only
```

## Build & Deployment with Windsurf

### 1. TypeScript Compilation
```prompt
Optimize TypeScript build configuration:
- Enable strict mode for better type safety
- Configure proper source maps for debugging
- Set up watch mode for development
- Optimize bundle size for CLI distribution
```

### 2. Cross-Platform Building
```prompt
Create build scripts for multiple platforms:
- macOS (arm64, x64)
- Linux (x64)
- Windows (x64)
- Include proper binary naming and permissions
```

## Windsurf Debugging Workflows

### 1. API Request Debugging
- Use Windsurf's network debugging for API calls
- Set breakpoints in async/await chains
- Monitor rate limiting and retry logic

### 2. React Ink Component Debugging
- Debug component rendering in terminal environment
- Test keyboard input handling
- Verify theme application across components

### 3. CLI Argument Parsing
- Test command line argument parsing
- Verify help text generation
- Debug module selection logic

## Code Quality with Windsurf

### 1. Linting and Formatting
```prompt
Set up comprehensive linting rules:
- TypeScript strict mode
- React Hooks linting
- Import organization
- Code formatting with Prettier
```

### 2. Performance Optimization
```prompt
Optimize CLI performance:
- Lazy load platform modules
- Cache API responses where appropriate
- Minimize bundle size
- Optimize React Ink rendering
```

## Advanced Windsurf Features

### 1. Multi-File Refactoring
Use Windsurf's ability to refactor across multiple files:
```prompt
Refactor all platform modules to use consistent command naming patterns. Update TypeScript interfaces, React Ink components, and CLI help text simultaneously.
```

### 2. Intelligent Code Search
```prompt
Find all instances of email sequence management across the codebase and ensure they follow consistent patterns for error handling, rate limiting, and user feedback.
```

### 3. Context-Aware Documentation
```prompt
Generate comprehensive JSDoc comments for all public methods and interfaces. Include usage examples, parameter descriptions, and return value specifications.
```

## Windsurf Productivity Tips

1. **Use Natural Language**: Describe what you want in plain English
2. **Provide Context**: Reference existing files and patterns
3. **Request Examples**: Ask for implementation examples with real code
4. **Iterate Incrementally**: Build features step by step
5. **Verify Consistency**: Ask Windsurf to check patterns across modules

## Common Windsurf Prompts for This Project

### Feature Development
```
Add [functionality] to [platform] module following existing patterns. Include TypeScript interfaces, error handling, and React Ink UI components. Focus on email sequences only.
```

### Bug Fixing
```
Debug [issue] in [platform] module. Check API integration, TypeScript types, and React Ink component rendering. Provide comprehensive fix with tests.
```

### Code Optimization
```
Optimize [module/component] for better performance and maintainability. Follow TypeScript best practices and React Ink patterns.
```

### Documentation
```
Generate comprehensive documentation for [feature/module]. Include usage examples, API reference, and troubleshooting guide.
```

Remember: Windsurf's strength is understanding the entire codebase context. Always provide enough context about the specific platform and functionality you're working on, and emphasize the email sequence focus (no data enrichment features). 