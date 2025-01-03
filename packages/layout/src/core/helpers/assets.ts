import { config } from "@/config";

import { illustrationsSet } from "../../layouts/default-layout/config/helper";
import { useThemeStore } from "../../stores/theme";

export const getIllustrationsPath = (illustrationName: string): string => {
   const extension = illustrationName.substring(illustrationName.lastIndexOf("."), illustrationName.length);
   const illustration =
      useThemeStore().mode == "dark"
         ? `${illustrationName.substring(0, illustrationName.lastIndexOf("."))}-dark`
         : illustrationName.substring(0, illustrationName.lastIndexOf("."));
   return config.assetsUrl + `media/illustrations/${illustrationsSet.value}/${illustration}${extension}`;
};

export const getAssetPath = (path: string): string => {
   return config.assetsUrl + path;
};
