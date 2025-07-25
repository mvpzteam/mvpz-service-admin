import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Image, Info, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function AccountsGridCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Athletes</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          5,000
        </CardTitle>
        <CardAction>
        <Tooltip>
        <TooltipTrigger>
        <Info size={18}/>
        </TooltipTrigger>
        <TooltipContent>
            <p>This is the total number of athletes in the system</p>
        </TooltipContent>
        </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          2,000 New athletes this month.
        </div>
      </CardFooter>
    </Card>
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Users</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          21,890
        </CardTitle>
        <CardAction>
        <Tooltip>
        <TooltipTrigger>
        <Info size={18}/>
        </TooltipTrigger>
        <TooltipContent>
            <p>This is the total number of users in the system</p>
        </TooltipContent>
        </Tooltip>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          10,000 New users this month.
        </div>
      </CardFooter>
    </Card>

    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Active Accounts</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          45,678
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUpIcon />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Strong user retention <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">Engagement exceed targets</div>
      </CardFooter>
    </Card>
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Growth Rate</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          4.5%
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUpIcon />
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Steady performance increase <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">Meets growth projections</div>
      </CardFooter>
    </Card>
  </div>
  );
}