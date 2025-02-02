import { LucideIcon } from "lucide-react";

export interface ISidebarSchema {
  collapsed: boolean;
}

export interface ISidebarItem {
  icon: LucideIcon;
  path: string;
  text: string;
  check?: boolean;
}
