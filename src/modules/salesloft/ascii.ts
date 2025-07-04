import { getTheme } from "../../core/utils/theme";

const theme = getTheme("salesloft");

export const salesloftAscii =
  theme.primary(`
   ███████╗ █████╗ ██╗     ███████╗███████╗██╗      ██████╗ ███████╗████████╗
   ██╔════╝██╔══██╗██║     ██╔════╝██╔════╝██║     ██╔═══██╗██╔════╝╚══██╔══╝
   ███████╗███████║██║     █████╗  ███████╗██║     ██║   ██║█████╗     ██║   
   ╚════██║██╔══██║██║     ██╔══╝  ╚════██║██║     ██║   ██║██╔══╝     ██║   
   ███████║██║  ██║███████╗███████╗███████║███████╗╚██████╔╝██║        ██║   
   ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝        ╚═╝   
`) +
  theme.secondary(`
                  🔄 Modern Sales Engagement & Cadence Platform 🔄
`);

export const salesloftBanner = theme.gradient(`
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                       🌟 SALESLOFT CADENCE HUB 🌟                         │
  └─────────────────────────────────────────────────────────────────────────────┘
`);
