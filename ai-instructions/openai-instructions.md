# OpenAI/ChatGPT Instructions - Cold Email CLI

## Project Overview
Cold Email CLI is a TypeScript/React Ink application for email sequence automation across SmartLead, Instantly, Salesforge, and Apollo platforms. 187 total commands focused exclusively on email sequences (no data enrichment).

## Effective OpenAI Prompts

### Basic Structure
```
Context: Cold Email CLI - TypeScript/React Ink with 4 email platforms
Task: [specific task]
Platform: [smartlead/instantly/salesforge/apollo] 
Focus: Email sequences only
Requirements: TypeScript strict mode, React Ink UI
```

### Code Generation
```
Generate [functionality] for [platform]:
- API: [endpoint details]
- TypeScript interfaces required
- React Ink components needed
- Error handling for [scenarios]
- Rate limiting: [platform limits]
```

## Platform-Specific Development

### SmartLead (68 commands)
- Focus: Campaign analytics, email warmup
- API: https://server.smartlead.ai/api/v1
- Rate Limit: 100 req/min

### Instantly (35 commands) 
- Focus: High-volume automation, deliverability
- API: https://api.instantly.ai/api/v1
- Rate Limit: 200 req/min

### Salesforge (42 commands)
- Focus: AI-powered sequence generation
- API: https://api.salesforge.ai/public/v2
- Rate Limit: 150 req/min

### Apollo (42 commands)
- Focus: Contact management, sequences
- API: https://api.apollo.io/v1
- Rate Limit: 120 req/min

## TypeScript Patterns

### Interface Generation
```
Generate TypeScript interfaces for [platform] API:
- Response types with proper optionals
- Error handling interfaces
- Pagination support
- Union types for status fields
```

### Error Handling
```
Create error handling system:
- Platform-specific error types
- Rate limiting errors
- Network failures
- Authentication issues
```

## React Ink Components

### Component Pattern
```
Create React Ink component for [functionality]:
- Props with proper TypeScript typing
- Loading states and error handling
- Keyboard navigation support
- Theme integration
- Terminal responsive design
```

## Testing Strategy

```
Generate tests for [module]:
- Mock API responses
- Error scenario testing
- CLI workflow testing
- React Ink component testing
```

## Common Requests

### Implementation
```
Implement [platform]:[command]:
- Command description
- Parameters and validation
- API integration
- UI components
- Error scenarios
```

### Debugging
```
Debug [issue] in [module]:
- Error details: [paste error]
- Code context: [paste code]
- Expected behavior
- Environment details
```

### Optimization
```
Optimize [component/module]:
- Performance improvements
- Bundle size reduction
- TypeScript enhancements
- Code maintainability
```

## Best Practices

1. Always specify platform and focus area
2. Request TypeScript-first implementations
3. Include error handling requirements
4. Ask for React Ink UI patterns
5. Emphasize email sequence focus only
6. Request comprehensive examples

## Remember

- Email sequences only (no data enrichment)
- Keep platforms completely separate
- TypeScript strict mode always
- React Ink for all UI components
- Consistent error handling patterns 