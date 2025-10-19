import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Calendar,
  ClockIcon,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react";

const AthleteHubEducationTab = () => {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto  py-5  flex flex-col lg:flex-row items-start gap-12">
      <div>
        <div className="space-y-12">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Card
              key={i}
              className="flex flex-col sm:flex-row sm:items-center shadow-none overflow-hidden rounded-md border-none py-0"
            >
              <div className="shrink-0 aspect-video grow sm:w-56 sm:aspect-square bg-muted rounded-lg">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="px-0 sm:px-6 py-0 flex flex-col">
                <div className="flex items-center gap-6">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                    Technology
                  </Badge>
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  A beginner&apos;s guide to blackchain for engineers
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3 text-ellipsis">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
                  consequatur minus dicta accusantium quos, ratione suscipit id
                  adipisci voluptatibus. Nulla sint repudiandae fugiat tenetur
                  dolores.
                </p>
                <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" /> 5 min read
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Nov 20, 2024
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AthleteHubEducationTab;
