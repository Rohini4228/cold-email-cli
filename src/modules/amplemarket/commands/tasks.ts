import type { CLICommand } from "../../../types/global";
import { AmpleMarketAPI } from "../api";

const api = new AmpleMarketAPI();

export const taskCommands: CLICommand[] = [
  {
    name: "tasks:list",
    description: "📋 List all tasks",
    usage: "tasks:list [--status pending] [--type follow_up] [--limit 50]",
    category: "✅ Task Management",
    handler: async (args) => {
      const params: any = {};
      if (args.status) params.status = args.status;
      if (args.type) params.type = args.type;
      if (args.limit) params.limit = parseInt(args.limit);

      const data = await api.getTasks(params);
      console.log("📋 Your Tasks:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "tasks:complete",
    description: "✅ Complete a task",
    usage: 'tasks:complete --id task_id [--notes "Completion notes"]',
    category: "✅ Task Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("❌ Required: --id");
      }

      const data = await api.completeTask(args.id, args.notes);
      console.log("✅ Task completed successfully:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "tasks:skip",
    description: "⏭️ Skip a task",
    usage: "tasks:skip --id task_id",
    category: "✅ Task Management",
    handler: async (args) => {
      if (!args.id) {
        throw new Error("❌ Required: --id");
      }

      const data = await api.skipTask(args.id);
      console.log("⏭️ Task skipped successfully:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "tasks:statuses",
    description: "📊 List all task statuses",
    usage: "tasks:statuses",
    category: "✅ Task Management",
    handler: async (_args) => {
      const data = await api.getTaskStatuses();
      console.log("📊 Available Task Statuses:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
  {
    name: "tasks:types",
    description: "📝 List all task types",
    usage: "tasks:types",
    category: "✅ Task Management",
    handler: async (_args) => {
      const data = await api.getTaskTypes();
      console.log("📝 Available Task Types:");
      console.log(JSON.stringify(data, null, 2));
    },
  },
];

export const taskAliases: CLICommand[] = [
  { ...taskCommands[0], name: "t:list" },
  { ...taskCommands[1], name: "t:complete" },
  { ...taskCommands[2], name: "t:skip" },
  { ...taskCommands[3], name: "t:statuses" },
  { ...taskCommands[4], name: "t:types" },
];
