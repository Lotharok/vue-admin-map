import { setupWorker } from "msw/browser";

import { service } from "./handlers/service";

export const worker = setupWorker(...service);
