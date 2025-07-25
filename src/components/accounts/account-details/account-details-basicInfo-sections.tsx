import React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { FormSechma } from "@/app/(auth-pages)/accounts/[username]/page";
import z from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import Image from "next/image";
import { EllipsisVerticalIcon, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

const AccountBasicDetailsSections = ({
  isEditable,
  setIsEditable,
  form,
  setForm,
}: {
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
  form: z.infer<typeof FormSechma>;
  setForm: (form: z.infer<typeof FormSechma>) => void;
}) => {
  const isMobile = useIsMobile();

  const handleMakeEditable = (status: boolean) => {
    setIsEditable(status);
    if (status) {
      toast("Account is now editable!", {
        description: "You can now edit the account details.",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }else{
      toast("Account is now read only!", {
        description: "You can no longer edit the account details.",
        action: {
          label: "Undo",
          onClick: () => setIsEditable(!status),
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Card className="w-full lg:max-w-2xl lg:flex-auto lg:basis-10/12">
        <CardHeader>
          <div className="flex flex-col ">
            <div className="flex justify-between items-center">
              <TypographyLarge>Overview</TypographyLarge>{" "}
              <Badge className="w-fit">Status : Active</Badge>
            </div>
            <TypographyMuted>
              Profile details, including name, contact, role, and status.
            </TypographyMuted>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AspectRatio
            ratio={isMobile ? 16 / 9 : 16 / 5}
            className="bg-muted rounded-lg mb-10"
          >
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
            <Avatar
              className={`absolute -bottom-6 left-3 ${
                isMobile ? "size-20" : "size-30"
              } p-1 rounded-full bg-card`}
            >
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isEditable && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVerticalIcon className="absolute top-4 right-4 size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Banner Image
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Upload /> Upload Banner Image
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive hover:text-destructive">
                      <Trash2 className="text-destructive" /> Remove Banner
                      Image
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Cover Image{" "}
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Upload /> Upload Cover Image
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive hover:text-destructive">
                      <Trash2 className="text-destructive" /> Remove Cover Image
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </AspectRatio>
          <form
            id="user-edit-form"
            className="grid grid-cols-2 gap-x-4 gap-y-6"
          >
            <div className="space-y-2 col-span-2">
              <Label>Username</Label>
              <Input placeholder="Username" value="@abhishek.yadav" />
            </div>
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input placeholder="First Name" value="Abhishek" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input placeholder="Last Name" value="Yadav" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Email</Label>
              <Input placeholder="Email" value="abhishek@gmail.com" />
            </div>

            <div className="space-y-2 col-span-2">
              <RadioGroup
                onValueChange={(value) =>
                  setForm({ ...form, role: value as "athlete" | "user" })
                }
                defaultValue={form.role}
              >
                <div className="space-y-2">
                  <TypographySmall>Role</TypographySmall>
                  <TypographyMuted>
                    Defines the user's position and access level on the
                    platform.
                  </TypographyMuted>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />{" "}
                  <Label htmlFor="user" className="flex flex-col items-start">
                    User (Default) :{" "}
                    <span className="text-xs text-muted-foreground">
                      Standard user account on the platform.
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="athlete" id="athlete" />{" "}
                  <Label
                    htmlFor="athlete"
                    className="flex flex-col items-start"
                  >
                    Athlete :{" "}
                    <span className="text-xs text-muted-foreground">
                      Represents an athlete profile. Must be linked to a tribe
                      when selected.
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2 col-span-2">
              <RadioGroup
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    accountType: value as
                      | "default"
                      | "platformDefault"
                      | "mascot"
                      | "testing",
                  })
                }
                defaultValue={form.accountType}
                disabled={form.accountType == "default" && !isEditable}
              >
                <div
                  className={`space-y-2 ${
                    isEditable ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <TypographySmall>Account Type</TypographySmall>
                  <TypographyMuted>
                    Specifies the type of user profile within the system. Can
                    apply to both User and Athlete roles.
                  </TypographyMuted>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="platformDefault"
                    id="platformDefault"
                  />{" "}
                  <Label
                    htmlFor="athlete"
                    className={`flex flex-col items-start ${
                      isEditable ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    Platform Account :
                    <span className="text-xs text-muted-foreground">
                      Official account managed by the platform for posting and
                      engagement.
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mascot" id="mascot" />{" "}
                  <Label
                    htmlFor="athlete"
                    className={`flex flex-col items-start ${
                      isEditable ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    Mascot Account :{" "}
                    <span className="text-xs text-muted-foreground">
                      Designated account representing a tribe’s mascot.
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="testing" id="testing" />{" "}
                  <Label
                    htmlFor="athlete"
                    className={`flex flex-col items-start ${
                      isEditable ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    Testing Account :{" "}
                    <span className="text-xs text-muted-foreground">
                      Developer/tester account hidden from public views and
                      feed.
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        {isEditable && (
          <CardFooter>
            <div className="flex justify-end gap-2 w-full">
              <Button variant="outline" onClick={() => setIsEditable(false)}>
                Cancel
              </Button>
              <Button type="submit" form="user-edit-form">
                Edit Profile
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
      <Card className="w-full lg:w-auto lg:max-w-md lg:flex-initial lg:basis-5/12">
        <CardHeader>
          <TypographyLarge>Actions</TypographyLarge>
          <TypographyMuted>
            Manage necessary user actions including edit, resend email, and
            account deactivation.
          </TypographyMuted>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center space-x-2">
            <div className="flex flex-col space-y-2">
              <TypographySmall>Update Account Info</TypographySmall>
              <TypographyMuted>
                Update the user info by turning the switch on.
              </TypographyMuted>
            </div>
            <Switch checked={isEditable} onCheckedChange={handleMakeEditable} />
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center space-x-2">
            <div className="flex flex-col space-y-2">
              <TypographySmall>Send Email</TypographySmall>
              <TypographyMuted>
                Send a custom email to the user. Email will be sent to the
                user's email address.
              </TypographyMuted>
            </div>
            <Button variant="outline">Send Email</Button>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col space-y-2">
            <TypographySmall>Delete Account</TypographySmall>
            <TypographyMuted>
              Permanently deletes the account, all associated data will assigned
              platform default account.
            </TypographyMuted>
            <Button variant="destructive" className="mt-2">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountBasicDetailsSections;
