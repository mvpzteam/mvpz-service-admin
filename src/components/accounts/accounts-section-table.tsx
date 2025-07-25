"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  EllipsisVertical,
  Filter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const athletesSchema = z.object({
  id: z.string(),
  isVerified: z.boolean(),
  firstname: z.string(),
  lastname: z.string(),
  profileImage: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(["Athlete", "User"]),
  status: z.enum(["Active", "Inactive"]),
  joinedAt: z.string(),
});

const filterSchema = z.object({
  status: z.object({
    active: z.boolean(),
    inactive: z.boolean(),
  }),
  verified: z.object({
    verified: z.boolean(),
    unverified: z.boolean(),
  }),
  special: z.object({
    platformDefault: z.boolean(),
    mascot: z.boolean(),
    testing: z.boolean(),
  }),
});

export default function AccountsSectionTable({ view }: { view: string }) {
  const [data, setData] = useState<z.infer<typeof athletesSchema>[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [tab, setTab] = useState<"all" | "users" | "athletes">("all");
  const [filter, setFilter] = useState<z.infer<typeof filterSchema>>({
    status: {
      active: false,
      inactive: false,
    },
    verified: {
      verified: false,
      unverified: false,
    },
    special: {
      platformDefault: false,
      mascot: false,
      testing: false,
    },
  });
  useEffect(() => {
    setData(athletesData as z.infer<typeof athletesSchema>[]);
  }, [view]);

  const columns: ColumnDef<z.infer<typeof athletesSchema>>[] = [
    {
      accessorKey: `name`,
      header: "Name",
      cell: ({ row }) => (
        <a href={`/accounts/${row.original.username}`}>
          <Button
            variant="ghost"
            className="text-muted-foreground  hover:underline w-full flex justify-start  "
          >
            <Avatar>
              <AvatarImage
                src={row.original.profileImage}
                alt={row.original.username}
              />
              <AvatarFallback>
                {row.original.firstname.charAt(0)}
                {row.original.lastname.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <span className="mr-auto">
              {row.original.firstname} {row.original.lastname.charAt(0)}.
            </span>

            {row.original.isVerified && <BadgeCheck className="mr-auto" />}
          </Button>
        </a>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <Button variant="ghost" className="text-muted-foreground px-1.5">
          {row.original.username}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <Button variant="ghost" className="text-muted-foreground px-1.5">
          {row.original.email}
        </Button>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.role}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => (
        <div className="w-32">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={
                  row.original.status === "Active" ? "default" : "outline"
                }
                className="cursor-default"
              >
                {row.original.status}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              {row.original.status === "Active"
                ? "Account holder has completed their profile!"
                : "Account holder has not completed their profile!"}
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    },
    {
      accessorKey: "joinedAt",
      header: () => "Joined At",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.joinedAt}
          </Button>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <a href={`/accounts/${row.original.username}`}>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </a>
            <a href={`/accounts/${row.original.username}?action=edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </a>
            <DropdownMenuItem>
              Make Verified {row?.original?.role}
            </DropdownMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <DropdownMenuItem>
                  Update Account Type
                  <ChevronsUpDown className="ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Platform Default Account </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={row?.original?.role === "Athlete"}>
                  Athlete Account{" "}
                </DropdownMenuItem>
                <DropdownMenuItem disabled={row?.original?.role === "User"}>
                  User Account{" "}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Tribe Mascot Account </DropdownMenuItem>
                <DropdownMenuItem>Platform Testing Account </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={`flex ${
          isMobile ? "flex-col" : "items-center justify-between"
        } space-y-4`}
      >
        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setTab(value as "all" | "users" | "athletes")
          }
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="athletes">Athletes</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Input placeholder="Search Accounts ...." className="w-60" />
          <div className="h-8 mx-4">
            <Separator orientation="vertical" />
          </div>
          <FilterDropdown filter={filter} setFilter={setFilter} />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup, idx) => (
              <TableRow key={idx}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={index}
                    data-state={row.getIsSelected() && "selected"}
                    className="relative z-0 "
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const FilterDropdown = ({
  filter,
  setFilter,
}: {
  filter: z.infer<typeof filterSchema>;
  setFilter: (filter: z.infer<typeof filterSchema>) => void;
}) => {
  const getFilterCount = () => {
    return Object.values(filter).reduce((acc, curr) => {
      return acc + Object.values(curr).filter(Boolean).length;
    }, 0);
  };

  const clearFilters = () => {
    setFilter({
      status: {
        active: false,
        inactive: false,
      },
      verified: {
        verified: false,
        unverified: false,
      },
      special: {
        platformDefault: false,
        mascot: false,
        testing: false,
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-fit px-4">
          Filter {getFilterCount() > 0 && `(${getFilterCount()})`} <Filter />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-sm">
            Status
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.status.active}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  status: { ...filter.status, active: checked as boolean },
                })
              }
              id="active"
            />{" "}
            <Label htmlFor="active">Active Accounts</Label>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.status.inactive}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  status: { ...filter.status, inactive: checked as boolean },
                })
              }
              id="inactive"
            />{" "}
            <Label htmlFor="inactive">Inactive Accounts</Label>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-sm">
            Verified
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.verified.verified}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  verified: {
                    ...filter.verified,
                    verified: checked as boolean,
                  },
                })
              }
              id="verified"
            />{" "}
            <Label htmlFor="verified">Verified Accounts</Label>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.verified.unverified}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  verified: {
                    ...filter.verified,
                    unverified: checked as boolean,
                  },
                })
              }
              id="unverified"
            />{" "}
            <Label htmlFor="unverified">Unverified Accounts</Label>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground text-sm">
            Special Accounts
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.special.platformDefault}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  special: {
                    ...filter.special,
                    platformDefault: checked as boolean,
                  },
                })
              }
              id="platformDefault"
            />{" "}
            <Label htmlFor="platformDefault">Platform Default Account</Label>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.special.mascot}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  special: {
                    ...filter.special,
                    mascot: checked as boolean,
                  },
                })
              }
              id="mascot"
            />{" "}
            <Label htmlFor="mascot">Mascot Account</Label>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox
              checked={filter.special.testing}
              onCheckedChange={(checked) =>
                setFilter({
                  ...filter,
                  special: {
                    ...filter.special,
                    testing: checked as boolean,
                  },
                })
              }
              id="testing"
            />{" "}
            <Label htmlFor="testing">Testing Account</Label>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Button
            variant="destructive"
            className="w-full"
            onClick={clearFilters}
            disabled={getFilterCount() === 0}
          >
            Clear Filters
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const athletesData = [
  {
    id: "6568009e7ee1565fbc47fdb6",
    isVerified: true,
    firstname: "Hunter",
    lastname: "Osborne",
    profileImage:
      "https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg",
    username: "@hunter.osborne",
    email: "hunter.osborne@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2021-01-01",
  },
  {
    id: "6568009e7ee1565fbc47fdb7",
    isVerified: true,
    firstname: "Sophie",
    lastname: "Turner",
    profileImage: "https://images.pexels.com/photos/22221/pexels-photo.jpg",
    username: "@sophie.turner",
    email: "sophie.turner@mvpz.io",
    role: "User",
    status: "Active",
    joinedAt: "2022-02-15",
  },
  {
    id: "6568009e7ee1565fbc47fdb8",
    isVerified: false,
    firstname: "Liam",
    lastname: "Carter",
    profileImage:
      "https://images.pexels.com/photos/2609925/pexels-photo-2609925.jpeg",
    username: "@liam.carter",
    email: "liam.carter@mvpz.io",
    role: "User",
    status: "Inactive",
    joinedAt: "2023-03-10",
  },
  {
    id: "6568009e7ee1565fbc47fdb9",
    isVerified: true,
    firstname: "Emily",
    lastname: "Blake",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@emily.blake/profile.png",
    username: "@emily.blake",
    email: "emily.blake@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2023-04-25",
  },
  {
    id: "6568009e7ee1565fbc47fdba",
    isVerified: false,
    firstname: "Noah",
    lastname: "Smith",
    profileImage:
      "https://images.pexels.com/photos/33094639/pexels-photo-33094639.jpeg",
    username: "@noah.smith",
    email: "noah.smith@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2023-01-09",
  },
  {
    id: "6568009e7ee1565fbc47fdbb",
    isVerified: false,
    firstname: "Olivia",
    lastname: "Johnson",
    profileImage:
      "https://images.pexels.com/photos/33075423/pexels-photo-33075423.jpeg",
    username: "@olivia.johnson",
    email: "olivia.johnson@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2022-06-18",
  },
  {
    id: "6568009e7ee1565fbc47fdbc",
    isVerified: false,
    firstname: "Ethan",
    lastname: "Lee",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@ethan.lee/profile.png",
    username: "@ethan.lee",
    email: "ethan.lee@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2021-08-11",
  },
  {
    id: "6568009e7ee1565fbc47fdbd",
    isVerified: false,
    firstname: "Isabella",
    lastname: "Davis",
    profileImage:
      "https://images.pexels.com/photos/2894944/pexels-photo-2894944.jpeg",
    username: "@isabella.davis",
    email: "isabella.davis@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2023-07-03",
  },
  {
    id: "6568009e7ee1565fbc47fdbe",
    isVerified: false,
    firstname: "Aiden",
    lastname: "Martinez",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@aiden.martinez/profile.png",
    username: "@aiden.martinez",
    email: "aiden.martinez@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2022-09-27",
  },
  {
    id: "6568009e7ee1565fbc47fdbf",
    isVerified: false,
    firstname: "Mia",
    lastname: "Clark",
    profileImage:
      "https://images.pexels.com/photos/5990737/pexels-photo-5990737.jpeg",
    username: "@mia.clark",
    email: "mia.clark@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2023-05-22",
  },
  {
    id: "6568009e7ee1565fbc47fdc0",
    isVerified: false,
    firstname: "James",
    lastname: "Taylor",
    profileImage:
      "https://images.pexels.com/photos/1454797/pexels-photo-1454797.jpeg",
    username: "@james.taylor",
    email: "james.taylor@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2021-11-11",
  },
  {
    id: "6568009e7ee1565fbc47fdc1",
    isVerified: false,
    firstname: "Ava",
    lastname: "White",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@ava.white/profile.png",
    username: "@ava.white",
    email: "ava.white@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2022-10-05",
  },
  {
    id: "6568009e7ee1565fbc47fdc2",
    isVerified: false,
    firstname: "Lucas",
    lastname: "Moore",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@lucas.moore/profile.png",
    username: "@lucas.moore",
    email: "lucas.moore@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2023-02-20",
  },
  {
    id: "6568009e7ee1565fbc47fdc3",
    isVerified: false,
    firstname: "Charlotte",
    lastname: "Hall",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@charlotte.hall/profile.png",
    username: "@charlotte.hall",
    email: "charlotte.hall@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2021-12-08",
  },
  {
    id: "6568009e7ee1565fbc47fdc4",
    isVerified: false,
    firstname: "Benjamin",
    lastname: "Allen",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@benjamin.allen/profile.png",
    username: "@benjamin.allen",
    email: "benjamin.allen@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2023-06-29",
  },
  {
    id: "6568009e7ee1565fbc47fdc5",
    isVerified: false,
    firstname: "Amelia",
    lastname: "Young",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@amelia.young/profile.png",
    username: "@amelia.young",
    email: "amelia.young@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2023-03-13",
  },
  {
    id: "6568009e7ee1565fbc47fdc6",
    isVerified: false,
    firstname: "Logan",
    lastname: "King",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@logan.king/profile.png",
    username: "@logan.king",
    email: "logan.king@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2022-01-14",
  },
  {
    id: "6568009e7ee1565fbc47fdc7",
    isVerified: false,
    firstname: "Harper",
    lastname: "Wright",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@harper.wright/profile.png",
    username: "@harper.wright",
    email: "harper.wright@mvpz.io",
    role: "Athlete",
    status: "Inactive",
    joinedAt: "2023-04-01",
  },
  {
    id: "6568009e7ee1565fbc47fdc8",
    isVerified: false,
    firstname: "Jackson",
    lastname: "Scott",
    profileImage:
      "https://s3.amazonaws.com/prod.mvpz.io/user-profiles/prod/@jackson.scott/profile.png",
    username: "@jackson.scott",
    email: "jackson.scott@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2022-08-16",
  },
  {
    id: "6568009e7ee1565fbc47fdc9",
    isVerified: false,
    firstname: "Ella",
    lastname: "Green",
    profileImage:
      "https://images.pexels.com/photos/13726717/pexels-photo-13726717.jpeg",
    username: "@ella.green",
    email: "ella.green@mvpz.io",
    role: "Athlete",
    status: "Active",
    joinedAt: "2023-07-01",
  },
];
