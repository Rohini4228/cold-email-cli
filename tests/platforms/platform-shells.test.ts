import { describe, test, expect, beforeAll } from '@jest/globals';
import { initializePlatforms, getAvailableModules } from '../../src/core/module-selector';
import { platformRegistry } from '../../src/core/registry';

describe('Platform Shells', () => {
  beforeAll(async () => {
    await initializePlatforms();
  });

  const expectedPlatforms = [
    'smartlead', 'instantly', 'apollo', 'salesforge', 'emailbison',
    'amplemarket', 'lemlist', 'outreach', 'quickmail', 'salesloft'
  ];

  test('all platforms should be registered', () => {
    const availableModules = getAvailableModules();
    const registeredPlatforms = availableModules.map(m => m.name);
    
    expectedPlatforms.forEach(platform => {
      expect(registeredPlatforms).toContain(platform);
    });
  });

  test('all platforms should be active', () => {
    expectedPlatforms.forEach(platform => {
      expect(platformRegistry.isActive(platform)).toBe(true);
    });
  });

  expectedPlatforms.forEach(platform => {
    describe(`${platform} platform`, () => {
      test('should have valid module structure', () => {
        const module = platformRegistry.get(platform);
        expect(module).toBeDefined();
        expect(module?.platform).toBeDefined();
        expect(module?.platform.name).toBeDefined();
        expect(module?.platform.description).toBeDefined();
        expect(module?.platform.version).toBeDefined();
        expect(Array.isArray(module?.platform.commands)).toBe(true);
        expect(Array.isArray(module?.platform.categories)).toBe(true);
      });

      test('should have commands matching totalCommands', () => {
        const module = platformRegistry.get(platform);
        expect(module?.platform.totalCommands).toBe(module?.platform.commands.length);
      });

      test('should have valid command structure', () => {
        const module = platformRegistry.get(platform);
        module?.platform.commands.forEach(cmd => {
          expect(cmd.name).toBeDefined();
          expect(cmd.description).toBeDefined();
          expect(cmd.category).toBeDefined();
          expect(typeof cmd.handler).toBe('function');
        });
      });

      test('should have categories with correct command counts', () => {
        const module = platformRegistry.get(platform);
        module?.platform.categories.forEach(category => {
          const categoryCommands = module.platform.commands.filter(
            cmd => cmd.category === category.name
          );
          expect(categoryCommands.length).toBe(category.commands);
        });
      });

      test('all commands should belong to existing categories', () => {
        const module = platformRegistry.get(platform);
        const categoryNames = module?.platform.categories.map(c => c.name) || [];
        
        module?.platform.commands.forEach(cmd => {
          expect(categoryNames).toContain(cmd.category);
        });
      });
    });
  });

  test('SmartLead should have 114 commands', () => {
    const module = platformRegistry.get('smartlead');
    expect(module?.platform.totalCommands).toBe(114);
  });

  test('command categories should be properly distributed', () => {
    const module = platformRegistry.get('smartlead');
    const expectedCounts = {
      '🎯 Campaign Management': 22,
      '📧 Email Accounts': 24,
      '👥 Lead Management': 24,
      '📊 Analytics & Reporting': 18,
      '📝 Email Sequences': 10,
      '📄 Email Templates': 16,
    };

    module?.platform.categories.forEach(category => {
      const expectedCount = expectedCounts[category.name as keyof typeof expectedCounts];
      if (expectedCount) {
        expect(category.commands).toBe(expectedCount);
      }
    });
  });
}); 