import type { CLICommand } from "../../types/global";
import { configManager } from "../utils/config";
import { getTheme } from "../utils/theme";

export const configCommands: CLICommand[] = [
  {
    name: "config:list",
    description: "📋 List all platform configurations",
    usage: "config:list",
    category: "⚙️ Configuration",
    handler: async () => {
      const theme = getTheme("default");
      const configured = configManager.getConfiguredPlatforms();

      console.log(theme.primary("\n📋 Platform Configuration Status:\n"));

      const allPlatforms = [
        "smartlead",
        "instantly",
        "apollo",
        "salesforge",
        "emailbison",
        "amplemarket",
        "lemlist",
        "outreach",
        "quickmail",
        "salesloft",
      ];

      allPlatforms.forEach((platform) => {
        const config = configManager.getPlatformConfig(platform);
        const status = config.isConfigured ? "✅ Configured" : "❌ Not configured";

        console.log(`${platform.padEnd(12)} ${status}`);
        if (config.isConfigured && config.baseUrl) {
          console.log(`${"".padEnd(12)} 🌐 ${config.baseUrl}`);
        }
      });

      console.log(`\n💡 Configured platforms: ${configured.length}/${allPlatforms.length}`);
      console.log("Use 'config:set <platform> <key> <value>' to configure platforms");
    },
  },
  {
    name: "config:set",
    description: "⚙️ Set platform configuration",
    usage: "config:set <platform> <key> <value>",
    category: "⚙️ Configuration",
    handler: async (args) => {
      const { platform, key, value } = args;

      if (!platform || !key || !value) {
        throw new Error("Usage: config:set <platform> <key> <value>");
      }

      const theme = getTheme(platform);

      switch (key) {
        case "apiKey":
        case "api_key":
          configManager.setApiKey(platform, value);
          console.log(theme.success(`✅ API key set for ${platform}`));
          break;

        case "baseUrl":
        case "base_url":
          configManager.setBaseUrl(platform, value);
          console.log(theme.success(`✅ Base URL set for ${platform}: ${value}`));
          break;

        default: {
          // Generic config setting
          const moduleConfig = configManager.getModuleConfig(platform);
          moduleConfig[key] = value;
          configManager.saveModuleConfig(platform, moduleConfig);
          console.log(theme.success(`✅ ${key} set for ${platform}: ${value}`));
          break;
        }
      }

      // Validate configuration
      const validation = configManager.validatePlatformConfig(platform);
      if (!validation.isValid) {
        console.log(theme.warning("\n⚠️ Configuration warnings:"));
        validation.errors.forEach((error) => {
          console.log(theme.warning(`  • ${error}`));
        });
      }
    },
  },
  {
    name: "config:get",
    description: "🔍 Get platform configuration",
    usage: "config:get <platform> [key]",
    category: "⚙️ Configuration",
    handler: async (args) => {
      const { platform, key } = args;

      if (!platform) {
        throw new Error("Usage: config:get <platform> [key]");
      }

      const theme = getTheme(platform);
      const config = configManager.getPlatformConfig(platform);

      if (key) {
        const value = config[key as keyof typeof config];
        if (value !== undefined) {
          // Mask API keys for security
          const displayValue = key.toLowerCase().includes("key") ? `${String(value).substring(0, 8)}...` : value;
          console.log(`${key}: ${displayValue}`);
        } else {
          console.log(theme.warning(`❌ ${key} not found for ${platform}`));
        }
      } else {
        console.log(theme.primary(`\n📋 ${platform} Configuration:\n`));

        Object.entries(config).forEach(([k, v]) => {
          if (v !== undefined && k !== "isConfigured") {
            // Mask sensitive values
            const displayValue = k.toLowerCase().includes("key") ? `${String(v).substring(0, 8)}...` : v;
            console.log(`${k.padEnd(15)} ${displayValue}`);
          }
        });

        const validation = configManager.validatePlatformConfig(platform);
        console.log(`\nStatus: ${config.isConfigured ? "✅ Configured" : "❌ Not configured"}`);

        if (!validation.isValid) {
          console.log(theme.warning("\n⚠️ Issues:"));
          validation.errors.forEach((error) => {
            console.log(theme.warning(`  • ${error}`));
          });
        }
      }
    },
  },
  {
    name: "config:clear",
    description: "🗑️ Clear platform configuration",
    usage: "config:clear <platform>",
    category: "⚙️ Configuration",
    handler: async (args) => {
      const { platform } = args;

      if (!platform) {
        throw new Error("Usage: config:clear <platform>");
      }

      const theme = getTheme(platform);
      configManager.clearPlatformConfig(platform);
      console.log(theme.success(`✅ Configuration cleared for ${platform}`));
    },
  },
  {
    name: "config:validate",
    description: "✅ Validate platform configuration",
    usage: "config:validate [platform]",
    category: "⚙️ Configuration",
    handler: async (args) => {
      const { platform } = args;
      const theme = getTheme("default");

      if (platform) {
        // Validate single platform
        const validation = configManager.validatePlatformConfig(platform);
        const platformTheme = getTheme(platform);

        console.log(platformTheme.primary(`\n🔍 Validating ${platform} configuration:\n`));

        if (validation.isValid) {
          console.log(platformTheme.success("✅ Configuration is valid"));
        } else {
          console.log(platformTheme.error("❌ Configuration has issues:"));
          validation.errors.forEach((error) => {
            console.log(platformTheme.error(`  • ${error}`));
          });
        }
      } else {
        // Validate all platforms
        const allPlatforms = [
          "smartlead",
          "instantly",
          "apollo",
          "salesforge",
          "emailbison",
          "amplemarket",
          "lemlist",
          "outreach",
          "quickmail",
          "salesloft",
        ];

        console.log(theme.primary("\n🔍 Validating all platform configurations:\n"));

        let validCount = 0;

        allPlatforms.forEach((p) => {
          const validation = configManager.validatePlatformConfig(p);
          const status = validation.isValid ? "✅" : "❌";
          console.log(`${p.padEnd(12)} ${status}`);

          if (validation.isValid) {
            validCount++;
          } else {
            validation.errors.forEach((error) => {
              console.log(theme.error(`${"".padEnd(12)}   • ${error}`));
            });
          }
        });

        console.log(`\n📊 Summary: ${validCount}/${allPlatforms.length} platforms configured`);
      }
    },
  },
  {
    name: "config:env-example",
    description: "📄 Generate environment file example",
    usage: "config:env-example",
    category: "⚙️ Configuration",
    handler: async () => {
      const theme = getTheme("default");

      console.log(theme.primary("\n📄 Environment File Example (.env):\n"));

      const envExample = `# Cold Email CLI Environment Configuration
# Place this file in your project root as .env or in ~/.cold-email-cli/.env

# SmartLead Configuration
SMARTLEAD_API_KEY=your_smartlead_api_key_here
SMARTLEAD_BASE_URL=https://server.smartlead.ai

# Instantly Configuration  
INSTANTLY_API_KEY=your_instantly_api_key_here
INSTANTLY_BASE_URL=https://api.instantly.ai

# Apollo Configuration
APOLLO_API_KEY=your_apollo_api_key_here
APOLLO_BASE_URL=https://api.apollo.io

# Salesforge Configuration
SALESFORGE_API_KEY=your_salesforge_api_key_here
SALESFORGE_BASE_URL=https://api.salesforge.ai

# EmailBison Configuration
EMAILBISON_API_KEY=your_emailbison_api_key_here
EMAILBISON_BASE_URL=https://api.emailbison.com

# Amplemarket Configuration
AMPLEMARKET_API_KEY=your_amplemarket_api_key_here
AMPLEMARKET_BASE_URL=https://api.amplemarket.com

# lemlist Configuration
LEMLIST_API_KEY=your_lemlist_api_key_here
LEMLIST_BASE_URL=https://api.lemlist.com

# Outreach Configuration
OUTREACH_API_KEY=your_outreach_api_key_here
OUTREACH_BASE_URL=https://api.outreach.io

# QuickMail Configuration
QUICKMAIL_API_KEY=your_quickmail_api_key_here
QUICKMAIL_BASE_URL=https://api.quickmail.io

# Salesloft Configuration
SALESLOFT_API_KEY=your_salesloft_api_key_here
SALESLOFT_BASE_URL=https://api.salesloft.com
`;

      console.log(envExample);
      console.log(theme.secondary("💡 Tip: Environment variables take precedence over config file settings"));
      console.log(theme.secondary("💡 Use 'config:set' command for interactive configuration"));
    },
  },
];

// Config command aliases
export const configAliases: CLICommand[] = [
  { ...configCommands[0], name: "cfg:list", description: "📋 List configs (alias)" },
  { ...configCommands[1], name: "cfg:set", description: "⚙️ Set config (alias)" },
  { ...configCommands[2], name: "cfg:get", description: "🔍 Get config (alias)" },
  { ...configCommands[3], name: "cfg:clear", description: "🗑️ Clear config (alias)" },
  { ...configCommands[4], name: "cfg:validate", description: "✅ Validate config (alias)" },
];
