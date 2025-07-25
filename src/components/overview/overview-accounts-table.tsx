"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
} from "lucide-react";
import OverviewAthletesTabTable from "./overview-tab-tables/overview-athletes-tab-table";



export default function PlatformAccountsDataTable() {
  const [view, setView] = React.useState<"athletes" | "users" | "admins">(
    "athletes"
  );

  return (
    <Tabs
      defaultValue="athletes"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>

        <TabsList defaultValue="athletes">
          <TabsTrigger value="athletes" onClick={() => setView("athletes")}>
            Athletes
          </TabsTrigger>
          <TabsTrigger value="users" onClick={() => setView("users")}>
            Users
          </TabsTrigger>
          <TabsTrigger value="admins" onClick={() => setView("admins")}>
            Admins
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <Select defaultValue="none">
            <SelectTrigger
              className="flex w-fit @4xl/main:hidden"
              size="sm"
              id="view-selector"
            >
              <SelectValue placeholder="Filter Table" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="active">Active</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline capitalize">Add {view}</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="athletes"
        className="relative flex flex-col gap-4 overflow-auto "
      >
        <OverviewAthletesTabTable view={view} />
      </TabsContent>
      <TabsContent
        value="users"
        className="relative flex flex-col gap-4 overflow-auto "
      >
       <OverviewAthletesTabTable view={view} />
      </TabsContent>
      <TabsContent
        value="admins"
        className="relative flex flex-col gap-4 overflow-auto "
      >
        <OverviewAthletesTabTable view={view} />
      </TabsContent>
    </Tabs>
  );
}
