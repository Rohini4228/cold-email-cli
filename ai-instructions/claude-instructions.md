# Claude AI Instructions - Cold Email CLI

## Project Overview & Context
The Cold Email CLI is a professional TypeScript/React Ink application for email sequence automation across four platforms: SmartLead, Instantly, Salesforge, and Apollo. The project contains 187 commands focused exclusively on email sequences and outreach automation (no data enrichment capabilities).

## Key Project Characteristics for Claude

### Architecture Understanding
```
Cold Email CLI
├── 4 Platform Modules (Completely Separate)
├── TypeScript with Strict Mode
├── React Ink for Terminal UI
├── 187 Total Commands
└── Email Sequence Focus Only
```

### Core Principles
1. **Platform Separation**: Each module (SmartLead, Instantly, Salesforge, Apollo) is completely independent
2. **Email Focus**: Only email sequences, campaigns, and outreach automation - no data enrichment
3. **TypeScript First**: Strict typing throughout with comprehensive interfaces
4. **React Ink UI**: Interactive terminal interfaces with consistent theming

## Effective Claude Interaction Patterns

### 1. Context-Rich Prompts
When working with Claude, always provide rich context:

```
I'm working on the Cold Email CLI project. This is a TypeScript/React Ink CLI tool with 4 platform modules:
- SmartLead (68 commands) - Advanced analytics & campaign management
- Instantly (35 commands) - High-volume automation & deliverability  
- Salesforge (42 commands) - AI-powered sequence generation
- Apollo (42 commands) - Email sequences & contact management

I need help with [specific task] for the [platform] module. The focus is email sequences only, not data enrichment.
```

### 2. Code Analysis Requests
Claude excels at analyzing existing patterns:

```
Analyze the existing command structure in src/modules/smartlead/index.ts and help me add a new command for [functionality]. Maintain consistency with existing patterns, TypeScript interfaces, and React Ink theming.
```

### 3. Multi-File Coordination
```
I need to update TypeScript interfaces across multiple files to support [new feature]. Files involved:
- src/types/global.ts (shared types)
- src/modules/[platform]/types.ts (platform-specific)
- src/modules/[platform]/index.ts (implementation)

Ensure type consistency and proper error handling.
```

## Platform-Specific Development Guidance

### SmartLead Module Development
**Focus**: Advanced campaign management and comprehensive analytics

```typescript
// SmartLead command pattern:
interface SmartLeadCommand {
  name: string;
  description: string;
  category: 'campaigns' | 'sequences' | 'leads' | 'analytics' | 'accounts';
  apiEndpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  rateLimit: { perMinute: 100, perHour: 1000 };
}
```

**Claude Prompts for SmartLead**:
```
Help me implement SmartLead [functionality]. Requirements:
- API endpoint: https://server.smartlead.ai/api/v1/[endpoint]
- Focus on email sequence analytics
- Include proper TypeScript interfaces
- Add React Ink components for data display
- Implement rate limiting (100 req/min)
```

### Instantly Module Development  
**Focus**: High-volume email automation and deliverability optimization

```typescript
// Instantly command pattern:
interface InstantlyCommand {
  name: string;
  description: string;
  category: 'campaigns' | 'leads' | 'accounts' | 'unibox' | 'analytics';
  bulkSupport: boolean;
  deliverabilityFocus: boolean;
  rateLimit: { perMinute: 200, perHour: 2000 };
}
```

**Claude Prompts for Instantly**:
```
Help me implement Instantly [functionality]. Requirements:
- API endpoint: https://api.instantly.ai/api/v1/[endpoint]
- Focus on bulk operations and deliverability
- Include Unibox conversation management
- Add proper error handling for high-volume operations
- Implement rate limiting (200 req/min)
```

### Salesforge Module Development
**Focus**: AI-powered email sequence generation and optimization

```typescript
// Salesforge command pattern:
interface SalesforgeCommand {
  name: string;
  description: string;
  category: 'campaigns' | 'sequences' | 'templates' | 'leads' | 'analytics';
  aiPowered: boolean;
  personalizationLevel: 'basic' | 'advanced' | 'deep';
  rateLimit: { perMinute: 150, perHour: 1500 };
}
```

**Claude Prompts for Salesforge**:
```
Help me implement Salesforge [functionality]. Requirements:
- API endpoint: https://api.salesforge.ai/public/v2/[endpoint]
- Focus on AI-powered sequence generation
- Include persona-based customization
- Add AI optimization suggestions
- Implement rate limiting (150 req/min)
```

### Apollo Module Development
**Focus**: Email sequences and comprehensive contact management

```typescript
// Apollo command pattern:
interface ApolloCommand {
  name: string;
  description: string;
  category: 'sequences' | 'contacts' | 'templates' | 'accounts' | 'analytics' | 'inbox';
  contactManagement: boolean;
  sequenceAutomation: boolean;
  rateLimit: { perMinute: 120, perHour: 1200 };
}
```

**Claude Prompts for Apollo**:
```
Help me implement Apollo [functionality]. Requirements:
- API endpoint: https://api.apollo.io/v1/[endpoint]
- Focus on contact-to-sequence workflows
- Include reply management features
- Add template performance tracking
- Implement rate limiting (120 req/min)
```

## TypeScript Development with Claude

### 1. Interface Generation
```
Generate comprehensive TypeScript interfaces for [platform] API responses. Include:
- Proper generic typing for paginated results
- Union types for status fields
- Optional properties with clear documentation
- Error response interfaces with detailed error codes
```

### 2. Type Safety Verification
```
Review this TypeScript code for type safety issues:
[paste code]

Check for:
- Proper null/undefined handling
- Correct generic usage
- API response type matching
- Error handling completeness
```

### 3. Refactoring Guidance
```
Help me refactor this module to improve type safety while maintaining backward compatibility:
[describe current structure]

Goals:
- Stronger typing
- Better error handling
- Consistent patterns across commands
- Maintained API compatibility
```

## React Ink Component Development

### 1. Component Architecture
```typescript
// Standard React Ink component pattern:
interface ComponentProps {
  theme: ThemeConfig;
  data: any;
  isLoading: boolean;
  error?: string;
  onAction: (action: string, data?: any) => void;
}

const Component: React.FC<ComponentProps> = ({ theme, data, isLoading, error, onAction }) => {
  // React Ink implementation with proper error handling
};
```

### 2. Claude UI Development Prompts
```
Create a React Ink component for [functionality]:
- Use the existing theme system (colors, formatting)
- Handle loading states with spinners
- Display errors with retry options
- Include keyboard navigation
- Make it responsive for different terminal sizes
```

### 3. Interactive Elements
```
Help me add interactive features to this React Ink component:
- Arrow key navigation
- Enter/Space for selection
- Escape for cancellation
- Tab for field switching
- Proper focus management
```

## API Integration Patterns with Claude

### 1. HTTP Client Implementation
```
Create a consistent HTTP client for [platform] that includes:
- Bearer token authentication
- Rate limiting with exponential backoff
- Request/response logging
- Error handling with proper status codes
- TypeScript interfaces for all responses
```

### 2. Error Handling Standardization
```
Design a comprehensive error handling system that:
- Provides consistent error messages across platforms
- Includes retry logic for recoverable errors
- Logs errors with appropriate detail levels
- Displays user-friendly error messages in React Ink
- Handles rate limiting gracefully
```

### 3. Testing Strategy
```
Create a testing strategy for API integrations that:
- Mocks all external API calls
- Tests error scenarios and edge cases
- Validates TypeScript interface compliance
- Includes integration tests for CLI workflows
- Tests React Ink component rendering
```

## Advanced Claude Assistance Patterns

### 1. Code Review and Optimization
```
Review this implementation for [module/feature]:
[paste code]

Focus on:
- Code quality and maintainability
- TypeScript best practices
- React Ink patterns
- Error handling completeness
- Performance considerations
```

### 2. Architecture Decisions
```
Help me decide between these architectural approaches for [feature]:
Option A: [describe approach]
Option B: [describe approach]

Consider:
- Maintainability
- TypeScript compatibility
- React Ink constraints
- CLI user experience
- Platform API limitations
```

### 3. Documentation Generation
```
Generate comprehensive documentation for [module/feature]:
- Usage examples with actual CLI commands
- TypeScript interface documentation
- Error handling scenarios
- Configuration options
- Troubleshooting guide
```

## Performance Optimization with Claude

### 1. Bundle Size Analysis
```
Analyze the project for bundle size optimization:
- Identify unnecessary dependencies
- Suggest lazy loading opportunities
- Recommend tree shaking improvements
- Optimize TypeScript compilation settings
```

### 2. Runtime Performance
```
Optimize this code for better CLI performance:
[paste code]

Focus on:
- Async/await optimization
- Memory usage reduction
- API call efficiency
- React Ink rendering performance
```

## Debugging Assistance from Claude

### 1. Error Diagnosis
```
Help me debug this error in [module]:
Error: [paste error message]
Code: [paste relevant code]

The error occurs when [describe scenario].
```

### 2. Type Error Resolution
```
Resolve this TypeScript error:
[paste error]

Code context:
[paste code]

The error seems related to [describe what you think might be wrong].
```

### 3. API Integration Issues
```
Debug this API integration issue:
Platform: [platform]
Endpoint: [endpoint]
Error: [describe error]
Expected behavior: [describe what should happen]
```

## Claude Productivity Techniques

### 1. Iterative Development
- Start with basic implementation
- Ask Claude to review and improve
- Add error handling and edge cases
- Optimize for performance and maintainability

### 2. Pattern Recognition
- Show Claude existing patterns in the codebase
- Ask for consistency improvements
- Request pattern validation across modules

### 3. Multi-Step Problem Solving
- Break complex features into smaller tasks
- Ask Claude to help plan implementation steps
- Request validation at each step

## Quality Assurance with Claude

### 1. Code Standards Compliance
```
Verify this code meets our project standards:
- TypeScript strict mode compliance
- React Ink best practices
- Consistent error handling
- Proper documentation
- Test coverage requirements
```

### 2. Security Review
```
Review this code for security considerations:
- API key handling
- Input validation
- Error message disclosure
- Rate limiting effectiveness
```

### 3. Accessibility
```
Ensure this React Ink component is accessible:
- Keyboard navigation
- Screen reader compatibility
- Color contrast for terminal themes
- Clear focus indicators
```

## Remember When Working with Claude

1. **Provide Context**: Always explain the project structure and current state
2. **Be Specific**: Clearly describe the platform, module, and functionality
3. **Share Code**: Include relevant code snippets for better analysis
4. **Iterate**: Build solutions incrementally with Claude's feedback
5. **Focus Scope**: Emphasize email sequences only, not data enrichment
6. **Maintain Consistency**: Ask Claude to verify patterns across modules

Claude excels at understanding complex codebases and providing thoughtful, context-aware solutions. Use its analytical capabilities to maintain code quality and consistency across all platform modules. 