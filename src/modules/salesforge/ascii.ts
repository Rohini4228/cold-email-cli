import { getTheme } from "../../core/utils/theme";

const theme = getTheme("salesforge");

export const salesforgeAscii =
  theme.primary(`
   ███████╗ █████╗ ██╗     ███████╗███████╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
   ██╔════╝██╔══██╗██║     ██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
   ███████╗███████║██║     █████╗  ███████╗█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
   ╚════██║██╔══██║██║     ██╔══╝  ╚════██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
   ███████║██║  ██║███████╗███████╗███████║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
   ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`) +
  theme.secondary(`
                    🤖 AI-Powered Multi-Channel Sequence Automation 🤖
`);

export const salesforgeBanner = theme.gradient(`
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       🔥 SALESFORGE AI STUDIO 🔥                           │
  └─────────────────────────────────────────────────────────────────────────────┘
`);
