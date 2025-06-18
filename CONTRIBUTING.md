# Contributing to SmartLead CLI

Thank you for your interest in contributing to SmartLead CLI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm 7.0.0 or higher
- A SmartLead API key for testing

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/smartlead-cli.git
   cd smartlead-cli
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure your test API key:
   ```bash
   node src/index.js config
   ```

## 📋 How to Contribute

### Reporting Bugs
1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, CLI version)
   - SmartLead API response (if applicable, remove sensitive data)

### Suggesting Features
1. Check existing issues and discussions
2. Create a feature request with:
   - Clear description of the feature
   - Use case and benefits
   - Proposed implementation (if applicable)
   - SmartLead API endpoint reference (if applicable)

### Code Contributions

#### Types of Contributions Welcome
- 🐛 **Bug fixes** - Fix issues with existing commands
- ✨ **New features** - Add new SmartLead API endpoints
- 📚 **Documentation** - Improve README, add examples, fix typos
- 🎨 **UI/UX improvements** - Better terminal output, colors, formatting
- 🧪 **Testing** - Add tests for existing functionality
- 🔧 **Code quality** - Refactoring, performance improvements

#### Pull Request Process
1. Create a feature branch from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our coding standards
3. Test your changes thoroughly:
   ```bash
   npm test
   node src/index.js your-new-command
   ```
4. Update documentation if needed
5. Commit with descriptive messages:
   ```bash
   git commit -m "feat: add campaign analytics export command"
   ```
6. Push to your fork and create a pull request

## 🔧 Development Guidelines

### Code Style
- Use ES6+ JavaScript features
- Follow existing patterns in `src/index.js`
- Use descriptive variable and function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

### Adding New Commands
When adding new SmartLead API endpoints:

1. **Research the API endpoint:**
   - Check [SmartLead API Documentation](https://server.smartlead.ai/api/docs)
   - Understand request/response format
   - Note required vs optional parameters

2. **Follow the pattern:**
   ```javascript
   program
     .command('new-command <required-param>')
     .description('Clear description of what this does')
     .option('-o, --optional <param>', 'Optional parameter description')
     .action(async (requiredParam, options) => {
       try {
         const api = new SmartLeadAPI();
         console.log(chalk.hex(colors.warning)('⏳ Loading...'));
         
         const result = await api.request('GET', `/endpoint/${requiredParam}`);
         
         // Format and display results
         console.log(chalk.hex(colors.primary)('\n📊 Results:\n'));
         // Use formatTable() for tabular data
         
       } catch (error) {
         console.error(chalk.hex(colors.error)('❌ Error:'), error.message);
       }
     });
   ```

3. **Add to help documentation:**
   - Update the `help-all` command
   - Add to appropriate category in README.md
   - Include usage examples

### Error Handling
- Always wrap API calls in try-catch blocks
- Use consistent error message formatting
- Provide helpful error messages
- Log API responses for debugging (remove sensitive data)

### UI/UX Standards
- Use consistent color scheme (SmartLead brand colors)
- Provide loading indicators for API calls
- Format output clearly with tables for list data
- Include helpful success/error messages
- Use emojis consistently for visual clarity

## 📚 SmartLead API Reference

### Key Endpoints
- **Campaigns:** `/campaigns` - List, create, update, delete campaigns
- **Leads:** `/campaigns/{id}/leads` - Manage leads within campaigns  
- **Email Accounts:** `/email-accounts` - Manage sending email accounts
- **Analytics:** `/campaigns/{id}/stats` - Get campaign statistics
- **Webhooks:** `/campaigns/{id}/webhooks` - Webhook management

### Authentication
All API requests require an API key parameter:
```javascript
const response = await api.request('GET', '/endpoint', { api_key: apiKey });
```

### Rate Limits
Be mindful of API rate limits when testing. The CLI handles this automatically.

## 🧪 Testing

### Manual Testing
1. Test with real SmartLead account (use test data)
2. Verify all command options work correctly
3. Test error scenarios (invalid IDs, network issues)
4. Check output formatting and colors
5. Test on different platforms (Mac, Linux, Windows)

### Before Submitting
- [ ] Code follows existing patterns
- [ ] New commands added to help documentation  
- [ ] README updated with examples
- [ ] Changes tested with real API
- [ ] No sensitive data in code or commits
- [ ] Error handling implemented
- [ ] Consistent UI/UX with existing commands

## 🚀 Release Process

Releases follow semantic versioning:
- **Patch (1.0.1):** Bug fixes, documentation updates
- **Minor (1.1.0):** New features, new API endpoints
- **Major (2.0.0):** Breaking changes, major refactoring

## 📞 Getting Help

- 📚 Check the [README](README.md) for comprehensive documentation
- 🔍 Search existing [issues](https://github.com/username/smartlead-cli/issues)
- 💬 Create a new issue for questions
- 📧 Reference [SmartLead API docs](https://server.smartlead.ai/api/docs)

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Given recognition for significant contributions

Thank you for helping make SmartLead CLI better! 🎉 