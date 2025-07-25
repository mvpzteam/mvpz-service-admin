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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  TypographyLead,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { useIsMobile } from "@/hooks/use-mobile";
import { getEventImage } from "@/utils/global";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
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
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  EllipsisVertical,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

export const athleteSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string(),
  bannerImage: z.string(),
  bio: z.string(),
  email: z.string(),
});

export const athletesSchema = z.object({
  id: z.string(),
  athlete: athleteSchema,
  tribesAthlete: z.number(),
  tribesMembers: z.number(),
  cards: z.number(),
  collections: z.number(),
  posts: z.number(),
});

export const organizationSchema = z.object({
  id: z.string(),
  orgName: z.string(),
  orgShortName: z.string(),
  orgLogo: z.string(),
});

export const tribesSchema = z.object({
  id: z.string(),
  tribeId: z.string(),
  tribeName: z.string(),
  tribeLogo: z.string(),
  tribeOrganization: organizationSchema,
});

export default function OverviewAthletesTabTable({ view }: { view: string }) {
  const [data, setData] = useState<z.infer<typeof athletesSchema>[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setData(athletesData as z.infer<typeof athletesSchema>[]);
  }, [view]);

  const columns: ColumnDef<z.infer<typeof athletesSchema>>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: `athlete`,
      header: "Athlete",
      cell: ({ row }) => <TableAthletePopver item={row.original} />,
      enableHiding: false,
    },
    {
      accessorKey: "tribesAthlete",
      header: "Tribe Athletes",
      cell: ({ row }) => <TableTribeAthleteDrawer item={row.original} />,
      enableHiding: false,
    },
    {
      accessorKey: "tribesMembers",
      header: "Tribe Members",
      cell: ({ row }) => <TableTribeMembersDrawer item={row.original} />,
    },
    {
      accessorKey: "cards",
      header: "Cards",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.cards} Cards
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "collections",
      header: () => "Collections",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.collections} Collections
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "posts",
      header: () => "Shouts",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.posts} Posts
          </Button>
        </div>
      ),
    },
    {
      id: "actions",
      cell: () => (
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
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
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

  return (
    <>
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
              <ChevronLeft />
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

function TableAthletePopver({
  item,
}: {
  item: z.infer<typeof athletesSchema>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="text-muted-foreground px-1.5 capitalize"
        >
          <Avatar className="size-8 flex justify-center items-center rounded-md overflow-hidden bg-background border">
            {item?.athlete?.profileImage && (
              <AvatarImage
                src={getEventImage({ imageUrl: item.athlete.profileImage })}
                alt={item?.athlete?.username}
                className="sobject-cover "
              />
            )}
            <AvatarFallback>{item.athlete.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          {item?.athlete?.firstName} {item?.athlete?.lastName?.charAt(0)}.
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-10 flex justify-center items-center rounded-md overflow-hidden bg-background border">
              {item?.athlete?.profileImage && (
                <AvatarImage
                  src={getEventImage({ imageUrl: item.athlete.profileImage })}
                  alt={item?.athlete?.username}
                  className="sobject-cover "
                />
              )}
              <AvatarFallback>
                {item.athlete.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <TypographySmall>
                {item?.athlete?.firstName} {item?.athlete?.lastName}
              </TypographySmall>
              <TypographyMuted>{item?.athlete?.username}</TypographyMuted>
            </div>
          </div>

          <p className="text-sm">{item?.athlete?.bio}</p>
          <div className="text-muted-foreground text-xs">
            {item?.athlete?.email}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TableTribeAthleteDrawer({
  item,
}: {
  item: z.infer<typeof athletesSchema>;
}) {
  const [tribes, setTribes] = useState<z.infer<typeof tribesSchema>[]>([]);

  useEffect(() => {
    setTribes(tribesData);
  }, [item?.id]);

  const columns: ColumnDef<z.infer<typeof tribesSchema>>[] = [
    {
      accessorKey: `srno.`,
      header: "",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          {row.index + 1}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: `tribe`,
      header: "Tribe",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="text-muted-foreground px-1.5 capitalize"
        >
          <Avatar className="size-8 flex justify-center items-center rounded-md overflow-hidden bg-background border">
            {row?.original?.tribeLogo && (
              <AvatarImage
                src={getEventImage({ imageUrl: row.original.tribeLogo })}
                alt={row.original.tribeName}
                className="sobject-cover "
              />
            )}
            <AvatarFallback>{row.original.tribeName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <TypographyMuted>{row.original.tribeId}</TypographyMuted>
            <TypographySmall>{row.original.tribeName}</TypographySmall>
          </div>
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "tribeOrganization",
      header: "Organization",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <TypographyMuted>
            {row.original.tribeOrganization.orgShortName}
          </TypographyMuted>
          <TypographySmall>
            {row.original.tribeOrganization.orgName}
          </TypographySmall>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "actions",
      cell: () => (
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
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>View tribe</DropdownMenuItem>
            <DropdownMenuItem>View Organization</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="default">Manage Tribe</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: tribes,
    columns,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground px-1.5">
          {item.tribesAthlete} Tribe
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {item.athlete.firstName} {item.athlete.lastName}
          </DrawerTitle>
          <DrawerDescription>
            All tribes that {item.athlete.firstName} {item.athlete.lastName} is
            a athlete of.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className=" border rounded-lg overflow-hidden">
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TableTribeMembersDrawer({
  item,
}: {
  item: z.infer<typeof athletesSchema>;
}) {
  const [tribes, setTribes] = useState<z.infer<typeof tribesSchema>[]>([]);

  useEffect(() => {
    setTribes(tribesData);
  }, [item?.id]);

  const columns: ColumnDef<z.infer<typeof tribesSchema>>[] = [
    {
      accessorKey: `srno.`,
      header: "",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          {row.index + 1}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: `tribe`,
      header: "Tribe",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="text-muted-foreground px-1.5 capitalize"
        >
          <Avatar className="size-8 flex justify-center items-center rounded-md overflow-hidden bg-background border ">
            {row?.original?.tribeLogo && (
              <AvatarImage
                src={getEventImage({ imageUrl: row.original.tribeLogo })}
                alt={row.original.tribeName}
                className="object-cover w-full h-full"
              />
            )}
            <AvatarFallback>{row.original.tribeName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <TypographyMuted>{row.original.tribeId}</TypographyMuted>
            <TypographySmall>{row.original.tribeName}</TypographySmall>
          </div>
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "tribeOrganization",
      header: "Organization",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <TypographyMuted>
            {row.original.tribeOrganization.orgShortName}
          </TypographyMuted>
          <TypographySmall>
            {row.original.tribeOrganization.orgName}
          </TypographySmall>
        </div>
      ),
      enableHiding: false,
    },
    {
      id: "actions",
      cell: () => (
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
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem>View tribe</DropdownMenuItem>
            <DropdownMenuItem>View Organization</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="default">Manage Tribe</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: tribes,
    columns,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="ghost" className="text-muted-foreground px-1.5">
          {item.tribesAthlete} Tribe
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {item.athlete.firstName} {item.athlete.lastName}
          </DrawerTitle>
          <DrawerDescription>
            All tribes that {item.athlete.firstName} {item.athlete.lastName} is
            a athlete of.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className=" border rounded-lg overflow-hidden">
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const athletesData = [
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
  {
    id: "6568009e7ee1565fbc47fdb6",
    athlete: {
      username: "@hunter.osborne",
      firstName: "Hunter",
      lastName: "Osborne",
      profileImage: "/user-profiles/prod/@hunter.osborne/profile.png",
      bannerImage: "/user-profiles/prod/@hunter.osborne/banner.png",
      bio: "Hunter Osborne was on the The University of Alabama Men’s Football team but transferred to TCU and now one of the first 500 MVPz athletes!",
      email: "hunter.osborne@mvpz.io",
    },
    tribesAthlete: 10,
    tribesMembers: 10,
    cards: 10,
    collections: 10,
    posts: 10,
  },
];

const tribesData = [
  {
    id: "1",
    tribeId: "@mi.ny",
    tribeName: "MI Newyork",
    tribeLogo:
      "https://f005.backblazeb2.com/file/mvpz-crickit/tribes/prod/@MI.NY/logo.png",
    tribeOrganization: {
      id: "1",
      orgName: "Reliance Industries",
      orgShortName: "MI Family",
      orgLogo:
        "https://f005.backblazeb2.com/file/mvpz-src-public/crickit/org/Mumbai-Indians-Logo.png",
    },
  },
  {
    id: "2",
    tribeId: "@csk.mlc",
    tribeName: "Texas Super Kings",
    tribeLogo:
      "https://f005.backblazeb2.com/file/mvpz-crickit/tribes/prod/@CSK.MLC/logo.png",
    tribeOrganization: {
      id: "1",
      orgName: "Chennai Super Kings Ltd.",
      orgShortName: "CSK Family",
      orgLogo:
        "https://f005.backblazeb2.com/file/mvpz-src-public/crickit/org/csk_logo_withOutGradient.png",
    },
  },
  {
    id: "3",
    tribeId: "@washington",
    tribeName: "Washington Freedom",
    tribeLogo:
      "https://f005.backblazeb2.com/file/mvpz-crickit/tribes/prod/@Washington/logo.png",
    tribeOrganization: {
      id: "1",
      orgName: "Sanjay Govil",
      orgShortName: "Sanjay Govil",
      orgLogo:
        "https://f005.backblazeb2.com/file/mvpz-src-public/crickit/org/site-logo.svg",
    },
  },
  {
    id: "4",
    tribeId: "@la.riders",
    tribeName: "LA Knight Riders",
    tribeLogo:
      "https://f005.backblazeb2.com/file/mvpz-crickit/tribes/prod/@LA.Riders/logo.png",
    tribeOrganization: {
      id: "1",
      orgName: "Knight Riders Group",
      orgShortName: "KKR Family",
      orgLogo:
        "https://f005.backblazeb2.com/file/mvpz-src-public/crickit/org/kkr_logo.jpg`",
    },
  },
  {
    id: "5",
    tribeId: "@csk.sa20",
    tribeName: "Joburg Super Kings",
    tribeLogo:
      "https://f005.backblazeb2.com/file/mvpz-crickit/tribes/prod/@CSK.SA20/logo.png",
    tribeOrganization: {
      id: "1",
      orgName: "Chennai Super Kings Ltd.",
      orgShortName: "CSK Family",
      orgLogo:
        "https://f005.backblazeb2.com/file/mvpz-src-public/crickit/org/csk_logo_withOutGradient.png",
    },
  },
];
