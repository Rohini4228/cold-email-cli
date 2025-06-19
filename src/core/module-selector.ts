import amplemarket from "../modules/amplemarket/index";
import apollo from "../modules/apollo/index";
import emailbison from "../modules/emailbison/index";
import instantly from "../modules/instantly/index";
import lemlist from "../modules/lemlist/index";
import outreach from "../modules/outreach/index";
import salesforge from "../modules/salesforge/index";
import salesloft from "../modules/salesloft/index";
import smartlead from "../modules/smartlead/index";
import type { CLICommand } from "../types/global";
import { getTheme } from "./utils/theme";

export const modules = {
  smartlead,
  instantly,
  apollo,
  salesforge,
  emailbison,
  amplemarket,
  lemlist,
  outreach,
  salesloft,
};

export const getModule = (name: string) => {
  return modules[name as keyof typeof modules];
};

export const getAllCommands = (): CLICommand[] => {
  const allCommands: CLICommand[] = [];
  for (const module of Object.values(modules)) {
    allCommands.push(...module.commands);
  }
  return allCommands;
};

export const getCommandByName = (commandName: string): CLICommand | null => {
  for (const module of Object.values(modules)) {
    const command = module.commands.find((cmd) => cmd.name === commandName);
    if (command) return command;
  }
  return null;
};

export const getAvailableModules = () => {
  return Object.entries(modules).map(([key, module]) => ({
    name: key,
    info: {
      name: module.name,
      description: module.description,
      version: module.version,
      totalCommands: module.totalCommands,
      categories: module.categories,
      status: "active"
    },
  }));
};

export function listModules(): void {
  const _theme = getTheme("default");
  console.log("\n❄️ Cold Email CLI - Available Platforms:\n");

  Object.entries(modules).forEach(([_key, module]) => {
    const statusIcon = "✅";
    
    console.log(`${statusIcon} ${module.name}`);
    console.log(`   Description: ${module.description}`);
    console.log(`   Commands: ${module.totalCommands}`);
    console.log(`   Status: Available\n`);
  });
}

export async function selectModule(moduleName: string) {
  const normalizedName = moduleName.toLowerCase();
  const module = modules[normalizedName as keyof typeof modules];

  if (!module) {
    const theme = getTheme("default");
    console.log(`${theme.error(`❌ Module "${moduleName}" not found`)}\n`);
    console.log("Available modules:");
    listModules();
    return null;
  }

  return module;
}

export default {
  modules,
  getModule,
  getAllCommands,
  getCommandByName,
  getAvailableModules,
  listModules,
  selectModule,
};
