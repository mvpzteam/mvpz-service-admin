import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  TypographyLarge,
} from "./ui/typography";
import { Separator } from "./ui/separator";

export default function HeaderNotification() {
  const notifications = [
    {
      id: 1,
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Your order is placed",
      description: "Amet minim mollit non deserunt ullamco...",
      timestamp: "2 days ago",
      isUnread: false,
      type: "order",
    },
    {
      id: 2,
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Congratulations Darlene 🎉",
      description: "Won the monthly best seller badge",
      timestamp: "11 am",
      isUnread: true,
      type: "achievement",
    },
    {
      id: 3,
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Joaquina Weisenborn",
      description: "Requesting access permission",
      timestamp: "12 pm",
      isUnread: true,
      type: "request",
      hasActions: true,
    },
    {
      id: 4,
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Brooklyn Simmons",
      description: "Added you to Top Secret Project...",
      timestamp: "1 day ago",
      isUnread: true,
      type: "invitation",
    },
  ];

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-transparent"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <TypographyLarge>Notifications</TypographyLarge>
          <a
            href="/notifications"
            className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          >
            View all
          </a>
        </div>
        <Separator />
        <Card className="border-0 shadow-none p-0">
          <CardContent className="p-0">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`relative p-4  hover:bg-muted/50 cursor-pointer ${
                  index !== notifications.length - 1 ? "border-b" : ""
                }`}
              >
                {notification.isUnread && (
                  <div className="absolute right-4 top-4 h-2 w-2 bg-red-500 rounded-full"></div>
                )}

                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={notification.avatar || "/placeholder.svg"}
                      alt={notification.title}
                    />
                    <AvatarFallback>
                      {notification.title
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-sm leading-tight">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-tight">
                      {notification.description}
                    </p>

                    {notification.hasActions && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 bg-transparent"
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-8 px-3"
                        >
                          Decline
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      <span>{notification.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
