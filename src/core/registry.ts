import type {
  CLIError,
  ModuleStatus,
  PlatformModule,
  PlatformName,
  PluginRegistry,
  ShellComponent,
  ValidationResult,
} from "../types/global";

/**
 * Enhanced Plugin Registry with type safety and better error handling
 * Follows the plugin architecture pattern for scalable module management
 */
export class PlatformRegistry implements PluginRegistry {
  private modules = new Map<string, PlatformModule>();
  private shells = new Map<string, ShellComponent>();
  private statuses = new Map<string, ModuleStatus>();

  /**
   * Register a platform module with validation
   */
  register(name: string, module: PlatformModule): void {
    try {
      // Validate module structure
      this.validateModule(name, module);

      // Register the module
      this.modules.set(name, module);

      // Register shell if provided
      if (module.shell) {
        this.shells.set(name, module.shell);
      }

      // Update status
      this.statuses.set(name, {
        name,
        status: "active",
        version: module.platform.version,
        lastCheck: new Date(),
        commands: module.platform.totalCommands,
        categories: module.platform.categories.length,
      });
    } catch (error) {
      const cliError =
        error instanceof CLIError
          ? error
          : new CLIError(`Failed to register module ${name}: ${error}`, "REGISTRATION_ERROR", name);

      this.statuses.set(name, {
        name,
        status: "error",
        version: module.platform.version || "unknown",
        lastCheck: new Date(),
        error: cliError.message,
        commands: 0,
        categories: 0,
      });

      throw cliError;
    }
  }

  /**
   * Unregister a platform module
   */
  unregister(name: string): void {
    this.modules.delete(name);
    this.shells.delete(name);
    this.statuses.delete(name);
  }

  /**
   * Get a specific platform module
   */
  get(name: string): PlatformModule | undefined {
    return this.modules.get(name);
  }

  /**
   * Get all registered modules
   */
  getAll(): Map<string, PlatformModule> {
    return new Map(this.modules);
  }

  /**
   * List all registered module names
   */
  list(): string[] {
    return Array.from(this.modules.keys());
  }

  /**
   * Get shell component for a platform
   */
  getShell(name: string): ShellComponent | undefined {
    return this.shells.get(name);
  }

  /**
   * Get module status
   */
  getStatus(name: string): ModuleStatus | undefined {
    return this.statuses.get(name);
  }

  /**
   * Get all module statuses
   */
  getAllStatuses(): Map<string, ModuleStatus> {
    return new Map(this.statuses);
  }

  /**
   * Check if a module exists and is active
   */
  isActive(name: string): boolean {
    const status = this.statuses.get(name);
    return status?.status === "active";
  }

  /**
   * Validate module structure and configuration
   */
  private validateModule(name: string, module: PlatformModule): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required fields
    if (!module.platform) {
      errors.push("Platform object is required");
    } else {
      if (!module.platform.name) errors.push("Platform name is required");
      if (!module.platform.description) errors.push("Platform description is required");
      if (!module.platform.version) errors.push("Platform version is required");
      if (!Array.isArray(module.platform.commands)) errors.push("Platform commands must be an array");
      if (!Array.isArray(module.platform.categories)) errors.push("Platform categories must be an array");
    }

    // Validate commands structure
    if (module.platform?.commands) {
      module.platform.commands.forEach((cmd, index) => {
        if (!cmd.name) errors.push(`Command at index ${index} missing name`);
        if (!cmd.handler) errors.push(`Command ${cmd.name || index} missing handler`);
        if (!cmd.category) warnings.push(`Command ${cmd.name || index} missing category`);
      });
    }

    // Check for duplicate command names
    const commandNames = module.platform?.commands?.map((cmd) => cmd.name) || [];
    const duplicates = commandNames.filter((name, index) => commandNames.indexOf(name) !== index);
    if (duplicates.length > 0) {
      errors.push(`Duplicate command names found: ${duplicates.join(", ")}`);
    }

    const result: ValidationResult = {
      isValid: errors.length === 0,
      errors,
      warnings,
    };

    if (!result.isValid) {
      throw new CLIError(`Module validation failed: ${errors.join(", ")}`, "VALIDATION_ERROR", name, undefined, {
        errors,
        warnings,
      });
    }

    return result;
  }

  /**
   * Perform health check on all modules
   */
  async healthCheck(): Promise<Map<string, ModuleStatus>> {
    const results = new Map<string, ModuleStatus>();

    for (const [name, module] of this.modules) {
      try {
        // Run module validation if available
        if (module.platform.validate) {
          const validation = await module.platform.validate();
          if (!validation.isValid) {
            throw new CLIError(`Validation failed: ${validation.errors.join(", ")}`, "HEALTH_CHECK_FAILED", name);
          }
        }

        // Update status as healthy
        const status: ModuleStatus = {
          name,
          status: "active",
          version: module.platform.version,
          lastCheck: new Date(),
          commands: module.platform.totalCommands,
          categories: module.platform.categories.length,
        };

        this.statuses.set(name, status);
        results.set(name, status);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const status: ModuleStatus = {
          name,
          status: "error",
          version: module.platform.version,
          lastCheck: new Date(),
          error: errorMessage,
          commands: 0,
          categories: 0,
        };

        this.statuses.set(name, status);
        results.set(name, status);
      }
    }

    return results;
  }

  /**
   * Initialize all registered modules
   */
  async initializeAll(): Promise<void> {
    const initPromises = Array.from(this.modules.entries()).map(async ([name, module]) => {
      try {
        if (module.platform.initialize) {
          await module.platform.initialize();
        }

        // Update status
        const currentStatus = this.statuses.get(name);
        if (currentStatus) {
          this.statuses.set(name, {
            ...currentStatus,
            status: "active",
            lastCheck: new Date(),
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const currentStatus = this.statuses.get(name);
        if (currentStatus) {
          this.statuses.set(name, {
            ...currentStatus,
            status: "error",
            error: errorMessage,
            lastCheck: new Date(),
          });
        }
        throw new CLIError(`Failed to initialize ${name}: ${errorMessage}`, "INIT_ERROR", name);
      }
    });

    await Promise.all(initPromises);
  }

  /**
   * Get platform names as strongly typed array
   */
  getPlatformNames(): PlatformName[] {
    return this.list() as PlatformName[];
  }
}

// Create and export singleton registry instance
export const platformRegistry = new PlatformRegistry();

// Helper function for registering modules with error handling
export async function registerPlatform(name: string, moduleLoader: () => Promise<PlatformModule>): Promise<void> {
  try {
    const module = await moduleLoader();
    platformRegistry.register(name, module);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new CLIError(`Failed to load platform ${name}: ${errorMessage}`, "MODULE_LOAD_ERROR", name);
  }
}

// Helper function for safe module access
export function getPlatformSafe(name: string): PlatformModule {
  const module = platformRegistry.get(name);
  if (!module) {
    throw new CLIError(`Platform '${name}' not found`, "PLATFORM_NOT_FOUND", name);
  }
  return module;
}

// Helper function for safe shell access
export function getShellSafe(name: string): ShellComponent {
  const shell = platformRegistry.getShell(name);
  if (!shell) {
    throw new CLIError(`Shell for platform '${name}' not found`, "SHELL_NOT_FOUND", name);
  }
  return shell;
}

export default platformRegistry;
