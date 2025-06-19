import type { CLICommand } from "../../../types/global";
import { EmailBisonAPI } from "../api";

const api = new EmailBisonAPI();

export const automationCommands: CLICommand[] = [
  {
    name: "automation:list",
    description: "List automation rules for campaign",
    usage: "automation:list --campaign-id campaign_id",
    category: "Power Automation",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }

      const data = await api.getAutomationRules(args["campaign-id"]);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "automation:create",
    description: "Create new automation rule",
    usage:
      'automation:create --campaign-id campaign_id --trigger "reply_received" --action "move_to_nurture" --conditions \'{"sentiment":"positive"}\'',
    category: "Power Automation",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args.trigger) {
        throw new Error("Required: --trigger");
      }
      if (!args.action) {
        throw new Error("Required: --action");
      }
      if (!args.conditions) {
        throw new Error("Required: --conditions (JSON object)");
      }

      let conditions: Record<string, any>;
      try {
        conditions = JSON.parse(args.conditions);
      } catch {
        throw new Error("Invalid JSON for --conditions");
      }

      const ruleData = {
        trigger: args.trigger,
        action: args.action,
        conditions,
      };

      const data = await api.createAutomationRule(args["campaign-id"], ruleData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "automation:update",
    description: "Update automation rule",
    usage: 'automation:update --campaign-id campaign_id --rule-id rule_id [--trigger "new_trigger"]',
    category: "Power Automation",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args["rule-id"]) {
        throw new Error("Required: --rule-id");
      }

      const updateData: any = {};
      if (args.trigger) updateData.trigger = args.trigger;
      if (args.action) updateData.action = args.action;
      if (args.conditions) {
        try {
          updateData.conditions = JSON.parse(args.conditions);
        } catch {
          throw new Error("Invalid JSON for --conditions");
        }
      }

      const data = await api.updateAutomationRule(args["campaign-id"], args["rule-id"], updateData);
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "automation:delete",
    description: "Delete automation rule",
    usage: "automation:delete --campaign-id campaign_id --rule-id rule_id",
    category: "Power Automation",
    handler: async (args) => {
      if (!args["campaign-id"]) {
        throw new Error("Required: --campaign-id");
      }
      if (!args["rule-id"]) {
        throw new Error("Required: --rule-id");
      }

      await api.deleteAutomationRule(args["campaign-id"], args["rule-id"]);
      console.log("Automation rule deleted successfully");
    },
  },
];

export const automationAliases: CLICommand[] = [
  { ...automationCommands[0], name: "auto:list" },
  { ...automationCommands[1], name: "auto:create" },
  { ...automationCommands[2], name: "auto:update" },
  { ...automationCommands[3], name: "auto:delete" },
];
