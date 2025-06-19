import type { CLICommand } from "../../../types/global";
import { api } from "../api";

export const settingsCommands: CLICommand[] = [
  {
    name: "settings:get",
    description: "⚙️ Get user settings",
    usage: "outreach settings:get",
    category: "⚙️ Settings & Configuration",
    handler: async () => {
      const settings = await api.getUserSettings();
      console.log("⚙️ User Settings:");
      console.log(JSON.stringify(settings, null, 2));
    },
  },
  {
    name: "settings:update",
    description: "⚙️ Update user settings",
    usage: "outreach settings:update [options]",
    category: "⚙️ Settings & Configuration",
    handler: async (args) => {
      const settings = await api.updateUserSettings(args);
      console.log("✅ Updated user settings");
      console.log(JSON.stringify(settings, null, 2));
    },
  },
];

export const settingsAliases: CLICommand[] = [
  {
    name: "config:get",
    description: "⚙️ Get settings (alias)",
    usage: "outreach config:get",
    category: "⚙️ Settings & Configuration",
    handler: settingsCommands[0].handler,
  },
]; 