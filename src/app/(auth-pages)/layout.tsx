"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useEffect, useState } from "react";
import { BreadcrumbItem as BreadcrumbItemType } from "@/types/breadcrumb-type";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import  HeaderNotification  from "@/components/header-notification";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => ({
      title: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: `/${pathSegments.slice(0, index + 1).join("/")}`,
    }));
    setBreadcrumbs(
      breadcrumbs?.length > 0
        ? [{title: "Dashboard", url: "/"}, ...breadcrumbs]
        : [
            {
              title: "Dashboard",
              url: "/",
            },
            {
              title: "Home",
              url: "/",
            },
          ]
    );
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-6">
          <div className="flex items-center gap-2  w-full">
            <SidebarTrigger className="" />
            <Separator orientation="vertical" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={breadcrumb.url}>
                        {breadcrumb.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index !== breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <HeaderNotification />
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
