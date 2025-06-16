import calcPlugin from "./CalcPlugin.js";
import weatherPlugin from "./WeatherPlugin.js";
import definePlugin from "./DefinePlugin.js";
import portfolioPlugin from "./PortfolioPlugin.js";
import addPlugin from "./AddPlugin.js";

const plugins = [
  calcPlugin,
  weatherPlugin,
  definePlugin,
  portfolioPlugin,
  addPlugin,
];

export const isPluginCommand = (input) => input.startsWith("/");

export const handlePluginCommand = async (input) => {
  const [commandRaw, ...args] = input.trim().split(" ");
  const command = commandRaw.toLowerCase();
  const plugin = plugins.find((p) => p.command === command);
  plugin.execute(args.join(" "));

  if (!plugin) {
    return {
      type: "plugin",
      pluginName: "unknown",
      pluginData: {
        error: `Invalid command: ${command}`,
      },
    };
  }

  try {
    const pluginData = await plugin.execute(args.join(" "));
    return {
      type: "plugin",
      pluginName: plugin.name,
      pluginData,
    };
  } catch (error) {
    return {
      type: "plugin",
      pluginName: plugin.name,
      pluginData: {
        error: "Something Went Wrong, Plugin Execution Failed.",
        details: error.message,
      },
    };
  }
};
