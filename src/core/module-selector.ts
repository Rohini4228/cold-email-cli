import type { CLICommand, PlatformModule, Platform, PlatformName } from "../types/global";
import { platformRegistry, registerPlatform } from "./registry";
import { getTheme } from "./utils/theme";

// Import platform modules
import smartleadModule from "../modules/smartlead/index";
import instantlyModule from "../modules/instantly/index";
import apolloModule from "../modules/apollo/index";
import salesforgeModule from "../modules/salesforge/index";
import emailbisonModule from "../modules/emailbison/index";
import amplemarketModule from "../modules/amplemarket/index";
import lemlistModule from "../modules/lemlist/index";
import outreachModule from "../modules/outreach/index";
import quickmailModule from "../modules/quickmail/index";
import salesloftModule from "../modules/salesloft/index";

// Shell imports with lazy loading for better performance
const shellLoaders = {
  smartlead: () => import("../modules/smartlead/shell").then(m => m.SmartLeadShell),
  instantly: () => import("../modules/instantly/shell").then(m => m.InstantlyShell),
  apollo: () => import("../modules/apollo/shell").then(m => m.ApolloShell),
  salesforge: () => import("../modules/salesforge/shell").then(m => m.SalesforgeShell),
  emailbison: () => import("../modules/emailbison/shell").then(m => m.EmailBisonShell),
  amplemarket: () => import("../modules/amplemarket/shell").then(m => m.AmplemarketShell),
  lemlist: () => import("../modules/lemlist/shell").then(m => m.lemlistShell),
  outreach: () => import("../modules/outreach/shell").then(m => m.OutreachShell),
  quickmail: () => import("../modules/quickmail/shell").then(m => m.QuickMailShell),
  salesloft: () => import("../modules/salesloft/shell").then(m => m.SalesloftShell),
};

// ASCII imports with lazy loading
const asciiLoaders = {
  smartlead: () => import("../modules/smartlead/ascii"),
  instantly: () => import("../modules/instantly/ascii"),
  apollo: () => import("../modules/apollo/ascii"),
  salesforge: () => import("../modules/salesforge/ascii"),
  emailbison: () => import("../modules/emailbison/ascii"),
  amplemarket: () => import("../modules/amplemarket/ascii"),
  lemlist: () => import("../modules/lemlist/ascii"),
  outreach: () => import("../modules/outreach/ascii"),
  quickmail: () => import("../modules/quickmail/ascii"),
  salesloft: () => import("../modules/salesloft/ascii"),
};

/**
 * Initialize and register all platform modules
 * Uses the new plugin registry for better module management
 */
export async function initializePlatforms(): Promise<void> {
  const platforms: Array<{ name: PlatformName; module: Platform }> = [
    { name: 'smartlead', module: smartleadModule },
    { name: 'instantly', module: instantlyModule },
    { name: 'apollo', module: apolloModule },
    { name: 'salesforge', module: salesforgeModule },
    { name: 'emailbison', module: emailbisonModule },
    { name: 'amplemarket', module: amplemarketModule },
    { name: 'lemlist', module: lemlistModule },
    { name: 'outreach', module: outreachModule },
    { name: 'quickmail', module: quickmailModule },
    { name: 'salesloft', module: salesloftModule },
  ];

  // Register each platform with lazy-loaded shells and ASCII
  for (const { name, module } of platforms) {
    await registerPlatform(name, async () => {
      const platformModule: PlatformModule = {
        platform: module,
        shell: undefined, // Will be loaded lazily
        ascii: undefined, // Will be loaded lazily
      };
      return platformModule;
    });
  }

  // Initialize all modules
  await platformRegistry.initializeAll();
}

/**
 * Get a platform module safely with type checking
 */
export function getModule(name: string): Platform | undefined {
  const platformModule = platformRegistry.get(name);
  return platformModule?.platform;
}

/**
 * Get all registered platform modules
 */
export const modules = new Proxy({} as Record<PlatformName, Platform>, {
  get(_, prop: string | symbol) {
    if (typeof prop === 'string') {
      return getModule(prop);
    }
    return undefined;
  },
  ownKeys() {
    return platformRegistry.list();
  },
  has(_, prop: string | symbol) {
    return typeof prop === 'string' && platformRegistry.get(prop) !== undefined;
  }
});

/**
 * Get all commands from all platforms
 */
export function getAllCommands(): CLICommand[] {
  const allCommands: CLICommand[] = [];
  for (const module of platformRegistry.getAll().values()) {
    allCommands.push(...module.platform.commands);
  }
  return allCommands;
}

/**
 * Find a command by name across all platforms
 */
export function getCommandByName(commandName: string): CLICommand | null {
  for (const module of platformRegistry.getAll().values()) {
    const command = module.platform.commands.find((cmd) => cmd.name === commandName);
    if (command) return command;
  }
  return null;
}

/**
 * Get available modules with enhanced information
 */
export function getAvailableModules() {
  return Array.from(platformRegistry.getAll().entries()).map(([key, module]) => ({
    name: key,
    info: {
      name: module.platform.name,
      description: module.platform.description,
      version: module.platform.version,
      totalCommands: module.platform.totalCommands,
      categories: module.platform.categories,
      status: platformRegistry.isActive(key) ? 'active' : 'inactive'
    },
  }));
}

/**
 * List all available platforms with status information
 */
export function listModules(): void {
  const theme = getTheme("default");
  console.log("\n❄️ Cold Email CLI - Available Platforms:\n");

  const statuses = platformRegistry.getAllStatuses();
  
  for (const [name, module] of platformRegistry.getAll()) {
    const status = statuses.get(name);
    const statusIcon = status?.status === 'active' ? "✅" : 
                      status?.status === 'error' ? "❌" : "⚠️";
    
    console.log(`${statusIcon} ${module.platform.name}`);
    console.log(`   Description: ${module.platform.description}`);
    console.log(`   Commands: ${module.platform.totalCommands}`);
    console.log(`   Status: ${status?.status || 'Unknown'}`);
    if (status?.error) {
      console.log(`   Error: ${theme.error(status.error)}`);
    }
    console.log("");
  }
}

/**
 * Select and validate a module
 */
export async function selectModule(moduleName: string): Promise<Platform | null> {
  const normalizedName = moduleName.toLowerCase();
  const platformModule = platformRegistry.get(normalizedName);

  if (!platformModule) {
    const theme = getTheme("default");
    console.log(`${theme.error(`❌ Module "${moduleName}" not found`)}\n`);
    console.log("Available modules:");
    listModules();
    return null;
  }

  // Check if module is active
  if (!platformRegistry.isActive(normalizedName)) {
    const theme = getTheme("default");
    const status = platformRegistry.getStatus(normalizedName);
    console.log(`${theme.error(`❌ Module "${moduleName}" is not active`)}`);
    if (status?.error) {
      console.log(`${theme.error(`Error: ${status.error}`)}`);
    }
    return null;
  }

  return platformModule.platform;
}

/**
 * Get shell component with lazy loading
 */
export async function getShellComponent(platformName: string) {
  // Try to get from registry first
  let shell = platformRegistry.getShell(platformName);
  
  // If not loaded, load it lazily
  if (!shell && shellLoaders[platformName as PlatformName]) {
    try {
      shell = await shellLoaders[platformName as PlatformName]();
      
      // Update registry with loaded shell
      const module = platformRegistry.get(platformName);
      if (module) {
        module.shell = shell;
      }
    } catch (error) {
      throw new Error(`Failed to load shell for ${platformName}: ${error}`);
    }
  }
  
  return shell;
}

/**
 * Get ASCII art with lazy loading
 */
export async function getAsciiArt(platformName: string) {
  const module = platformRegistry.get(platformName);
  
  // If ASCII not loaded, load it lazily
  if (!module?.ascii && asciiLoaders[platformName as PlatformName]) {
    try {
      const ascii = await asciiLoaders[platformName as PlatformName]();
      
      // Update registry with loaded ASCII
      if (module) {
        // Handle different ASCII export patterns based on platform
        const logo = ascii[`${platformName}Ascii` as keyof typeof ascii] as string || '';
        const banner = ascii[`${platformName}Banner` as keyof typeof ascii] as string || '';
        
        module.ascii = {
          logo,
          banner
        };
      }
      
      return module?.ascii;
    } catch (error) {
      console.warn(`Failed to load ASCII for ${platformName}: ${error}`);
      return undefined;
    }
  }
  
  return module?.ascii;
}

/**
 * Perform health check on all platforms
 */
export async function performHealthCheck() {
  console.log("🔍 Performing platform health check...\n");
  
  const results = await platformRegistry.healthCheck();
  const theme = getTheme("default");
  
  for (const [name, status] of results) {
    const icon = status.status === 'active' ? '✅' : 
                 status.status === 'error' ? '❌' : '⚠️';
    
    console.log(`${icon} ${name}: ${status.status}`);
    
    if (status.error) {
      console.log(`   ${theme.error(`Error: ${status.error}`)}`);
    }
    
    console.log(`   Commands: ${status.commands}, Categories: ${status.categories}`);
    console.log(`   Last checked: ${status.lastCheck.toISOString()}\n`);
  }
}

// Export for backwards compatibility and new functionality
export default {
  modules,
  getModule,
  getAllCommands,
  getCommandByName,
  getAvailableModules,
  listModules,
  selectModule,
  getShellComponent,
  getAsciiArt,
  performHealthCheck,
  initializePlatforms,
};
