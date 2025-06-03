declare module "daisyui" {
  import { PluginCreator } from "tailwindcss/types/config.js";

  interface DaisyUIConfig {
    themes?: string[] | Array<string | Record<string, any>> | boolean;
    darkTheme?: string;
    styled?: boolean;
    base?: boolean;
    utils?: boolean;
    logs?: boolean;
    themeRoot?: string;
    prefix?: string;
  }

  const daisyui: PluginCreator<DaisyUIConfig>;
  export = daisyui;
}
