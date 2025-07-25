"use client";
import {
  Check,
  Clock,
  Frame,
  Layers,
  List,
  Loader2,
  MoreHorizontal,
  Rocket,
  Shirt,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  TypographyH3,
  TypographyH4,
  TypographyLead,
  TypographySmall,
} from "../ui/typography";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import OverviewAllOrdersTable from "./overview-orders-tabs/overview-all-orders-tabel";

export default function OverviewOrderTable() {
  const [status, setStatus] = useState<
    "all" | "pending" | "processing" | "completed"
  >("all");

  const getBtnLabel = (status: string) => {
    const labels = {
      all: "All Orders",
      pending: "Pending Orders",
      processing: "Processing Orders",
      completed: "Completed Orders",
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="relative block border rounded-lg space-y-4 p-4">
      <div className="flex items-center justify-between ">
        <TypographyH4>Recent Orders</TypographyH4>
        <a href="Orders">
          <Button variant="outline" size="sm">
            <Layers />
            View All
          </Button>
        </a>
      </div>
    
        <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="apparel">Apparel</TabsTrigger>
            <TabsTrigger value="surge">Surge</TabsTrigger>
          </TabsList>
          <div className="flex items-center">
          <Input placeholder="Filter Orders..." className="w-82" />
          <div className="h-5 mx-4">
            <Separator orientation="vertical" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {getBtnLabel(status)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
              <DropdownMenuItem onClick={() => setStatus("all")}>
                <List /> All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("pending")}>
                <Clock /> Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("processing")}>
                <Loader2 /> Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus("completed")}>
                <Check /> Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>
          <TabsContent value="all">
            <OverviewAllOrdersTable view="all" />
          </TabsContent>
          <TabsContent value="card">
            <OverviewAllOrdersTable view="card" />
          </TabsContent>
          <TabsContent value="apparel">
            <OverviewAllOrdersTable view="apparel" />
          </TabsContent>
          <TabsContent value="surge">
            <OverviewAllOrdersTable view="surge" />
          </TabsContent>
        </Tabs>

       

    </div>
  );
}
