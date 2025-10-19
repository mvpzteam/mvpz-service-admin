"use client";

import * as React from "react";
import { Frame, Map, PieChart, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { SidebarApplicationMenu } from "./sidebar-application-menu";
import { SidebarFeaturesMenu } from "./sidebar-features-menu";
import { SidebarProductsMenu } from "./sidebar-products-menu";
import { SidebarReviewBlockMenu } from "./sidebar-reviewBlock-menu";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "MVPz.io",
      minName: "MZ",
      img: "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742452615/logo-transparent_jhv8f1.png",
      appInfo: "NCCA Application",
    },
    {
      name: "Crickit.Zone",
      minName: "CZ",
      img: "https://res.cloudinary.com/dg0ahswkh/image/upload/v1750892628/1_i5qrib.png",
      appInfo: "Crickit Application",
    },
    {
      name: "Kido.Zone",
      minName: "KD",
      img: "https://res.cloudinary.com/dg0ahswkh/image/upload/v1750892628/2_fvbl5p.png",
      appInfo: "Kido Application",
    },
  ],
  navMain: [
    {
      title: "Applications",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Platform",
          url: "/platforms",
        },
        {
          title: "Admin",
          url: "/admins",
        },
        {
          title: "Accounts",
          url: "/accounts",
        },
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "Settings",
          url: "/app-configurations",
        },
      ],
    },
  ],
  navFeatures: [
    {
      title: "Features",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Athlete Hub",
          url: "/athlete-hub",
        },
        {
          title: "Organistations",
          url: "#",
        },
        {
          title: "Tribes",
          url: "#",
        },
        {
          title: "Posts",
          url: "#",
        },
        {
          title: "Cards",
          url: "#",
        },
        {
          title: "Collections",
          url: "#",
        },
      ],
    },
  ],
  navProducts: [
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Physical Cards",
          url: "#",
        },
        {
          title: "Apparel",
          url: "#",
        },
        {
          title: "Surge",
          url: "#",
        },
      ],
    },
  ],
  navReview_Block: [
    {
      title: "Review Reports",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Review Accounts",
          url: "#",
        },
        {
          title: "Review Cards",
          url: "#",
        },
        {
          title: "Review Collections",
          url: "#",
        },
        {
          title: "Review Posts",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarApplicationMenu items={data.navMain} />
        <SidebarFeaturesMenu items={data.navFeatures} />
        <SidebarProductsMenu items={data.navProducts} />
        <SidebarReviewBlockMenu items={data.navReview_Block} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
