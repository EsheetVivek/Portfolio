"use client";

import { createContext, useContext } from "react";
import type { AppId } from "@/components/os/registry";

export interface OS { open: (id: AppId) => void; close: (id: AppId) => void }
export const OSContext = createContext<OS>({ open: () => {}, close: () => {} });
export const useOS = () => useContext(OSContext);
