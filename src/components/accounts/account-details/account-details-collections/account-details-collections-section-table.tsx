"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { collectionsTableSchema } from "@/zod/collections";
import {
  TypographyH4,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

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

export default function AccountDetailsCollectionsSectionTable({
  view,
}: {
  view: string;
}) {
  const [data, setData] = useState<z.infer<typeof collectionsTableSchema>[]>(
    []
  );
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
    setData(collectionsData as z.infer<typeof collectionsTableSchema>[]);
  }, [view]);

  const columns: ColumnDef<z.infer<typeof collectionsTableSchema>>[] = [
    {
      accessorKey: `collection`,
      header: "Collection",
      cell: ({ row }) => (
        <Drawer direction="right">
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground  hover:underline w-full flex justify-start  "
            >
              <Avatar>
                <AvatarImage
                  src={row.original.coverImage}
                  alt={row.original.title}
                />
                <AvatarFallback>
                  {row.original.title.charAt(0)}
                  {row.original.title.charAt(1)}
                </AvatarFallback>
              </Avatar>

              <span className="mr-auto">{row.original.title}</span>

              {row.original.createdBy.isVerified && (
                <BadgeCheck className="mr-auto" />
              )}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <div className="flex items-center gap-2">
                <DrawerTitle>{row.original.title}</DrawerTitle>
                <span className="w-fit text-xs text-muted-foreground border rounded-md px-2 py-1">
                  67a580f4ffa4f41a6008506b
                </span>
              </div>
              <DrawerDescription>
                {`Viewing collection details created by ${row.original.createdBy.username}.`}
              </DrawerDescription>
            </DrawerHeader>
            <Separator />

            <Card className=" bg-transparent border-none">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="size-12 border">
                    <AvatarImage src={row.original.createdBy.profileImage} />
                    <AvatarFallback>
                      {row.original.createdBy.firstname.charAt(0)}
                      {row.original.createdBy.lastname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col ">
                    <TypographySmall>
                      {row.original.createdBy.firstname}{" "}
                      {row.original.createdBy.lastname}
                    </TypographySmall>
                    <TypographyMuted>
                      {row.original.createdBy.username}
                    </TypographyMuted>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Modify Collection</DropdownMenuItem>
                    <DropdownMenuItem>Collections Cards</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2  space-y-2">
                  <AspectRatio
                    ratio={16 / 9}
                    className="bg-muted rounded-lg mb-10"
                  >
                    <Image
                      src={row.original.bannerImage}
                      alt={row.original.title}
                      fill
                      className="h-full w-full rounded-lg object-cover  "
                    />
                    <Avatar
                      className={`absolute -bottom-6 left-3 
                size-25
                   p-1 rounded-full bg-card`}
                    >
                      <AvatarImage
                        src={row.original.coverImage}
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {row.original.title.charAt(0)}
                        {row.original.title.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                  </AspectRatio>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <TypographyH4>{row.original.title}</TypographyH4>
                      {row.original.createdBy.isVerified && (
                        <BadgeCheck className="mr-auto" size={16} />
                      )}
                      <Badge
                        variant={row.original.isPrivate ? "default" : "outline"}
                      >
                        {row.original.isPrivate ? "Private" : "Public"}
                      </Badge>
                    </div>
                    <TypographyMuted>
                      <div
                        className="prose prose-sm space-y-2"
                        dangerouslySetInnerHTML={{
                          __html: row.original.description,
                        }}
                      />
                    </TypographyMuted>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DrawerFooter className="flex justify-end gap-2">
              <Button variant="outline">Modify Collection</Button>
              <DrawerClose asChild>
                <Button>Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "isPrivate",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant={row.original.isPrivate ? "default" : "outline"}>
          {row.original.isPrivate ? "Private" : "Public"}
        </Badge>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "cards",
      header: "Cards",
      cell: ({ row }) => (
        <Button variant="ghost" className="text-muted-foreground px-1.5">
          {row.original.cardsCount}
        </Button>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => "Created At",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            {row.original.createdAt}
          </Button>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
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
              <a
                href={`/accounts/${row.original.createdBy.username}/collections/${row.original.slug}`}
              >
                <DropdownMenuItem>View Collection</DropdownMenuItem>
              </a>
              <a
                href={`/accounts/${row.original.createdBy.username}/collections/${row.original.slug}?action=edit`}
              >
                <DropdownMenuItem>Manage Collection</DropdownMenuItem>
              </a>

              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
        className={`flex items-center  ${
          isMobile ? "flex-col space-y-4" : "items-center justify-between"
        }  `}
      >
        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setTab(value as "all" | "users" | "athletes")
          }
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2 ">
          <Input placeholder="Search Collections ...." className="w-60" />
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

const collectionsData: z.infer<typeof collectionsTableSchema>[] = [
  {
    id: "ed345678-ed34-5678-ed34-5678ed345678",
    slug: "collection-1",
    bannerImage:
      "https://i2.seadn.io/base/8cef6e396e474b7e83666bd3be3e1305/96686fbf63dc48658c843dbcdbc5f6/2396686fbf63dc48658c843dbcdbc5f6.png?w=3000",
    coverImage:
      "https://i2.seadn.io/base/8cef6e396e474b7e83666bd3be3e1305/433543db19087de2d0bd4376a1350d/95433543db19087de2d0bd4376a1350d.png?h=250&w=250",
    title: "DX Terminal",
    description: `
        <p>Welcome to Terminal City!</p>
        <p>
          This collection is where each of your AI Trader NFT's will appear.
        </p>
        <p>The simulation will begin on 5/15/2025, where your traders will compete against one another to earn the very most $WEBCOIN through well-timed trades, coordination, and manipulation. Will your name bear the coveted #1 spot on the leaderboard by the end?</p>
      `,
    isPrivate: false,
    cardsCount: 1000,
    createdBy: {
      id: "ed345678-ed34-5678-ed34-5678ed345678",
      username: "@abhishek",
      firstname: "Abhishek",
      lastname: "Yadav",
      profileImage:
        "https://i2.seadn.io/ethereum/560bfb41769046cf9127d417ef044ffd/a03e58d2993623e91d6ccfcc5e9e1b/c5a03e58d2993623e91d6ccfcc5e9e1b.gif?h=250&w=250",
      role: "Athlete",
      status: "Active",
      isVerified: true,
      isDeleted: false,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "ed345678-ed34-5678-ed34-5678ed345678",
    slug: "collection-1",
    bannerImage:
      "https://i.seadn.io/gcs/files/e429f4cbb918d0ac3c7da056ed9c404f.png?w=3000",
    coverImage:
      "https://i.seadn.io/gcs/files/adeb11bcd531b77f55ce10c217e50841.jpg?h=250&w=250",
    title: "Otherside Koda",
    description: `
        <p>Welcome to Terminal City!</p>
        <p>
          This collection is where each of your AI Trader NFT's will appear.
        </p>
        <p>The simulation will begin on 5/15/2025, where your traders will compete against one another to earn the very most $WEBCOIN through well-timed trades, coordination, and manipulation. Will your name bear the coveted #1 spot on the leaderboard by the end?</p>
      `,
    isPrivate: false,
    cardsCount: 1000,
    createdBy: {
      id: "ed345678-ed34-5678-ed34-5678ed345678",
      username: "@abhishek",
      firstname: "Abhishek",
      lastname: "Yadav",
      profileImage:
        "https://i2.seadn.io/ethereum/560bfb41769046cf9127d417ef044ffd/a03e58d2993623e91d6ccfcc5e9e1b/c5a03e58d2993623e91d6ccfcc5e9e1b.gif?h=250&w=250",
      role: "Athlete",
      status: "Active",
      isVerified: true,
      isDeleted: false,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
    {
    id: "ed345678-ed34-5678-ed34-5678ed345678",
    slug: "collection-1",
    bannerImage:
      "https://i2.seadn.io/ethereum/7f4c400e4679406d88a4a07b821c030e/397bd4615365ac3bcb5a13a3159b0b/be397bd4615365ac3bcb5a13a3159b0b.gif?w=3000",
    coverImage:
      "https://i2.seadn.io/ethereum/7f4c400e4679406d88a4a07b821c030e/a7f92df6d60e41327b69cdafea8831/82a7f92df6d60e41327b69cdafea8831.jpeg?h=250&w=250",
    title: "HV-MTL",
    description: `
        <p>Welcome to Terminal City!</p>
        <p>
          This collection is where each of your AI Trader NFT's will appear.
        </p>
        <p>The simulation will begin on 5/15/2025, where your traders will compete against one another to earn the very most $WEBCOIN through well-timed trades, coordination, and manipulation. Will your name bear the coveted #1 spot on the leaderboard by the end?</p>
      `,
    isPrivate: false,
    cardsCount: 1000,
    createdBy: {
      id: "ed345678-ed34-5678-ed34-5678ed345678",
      username: "@abhishek",
      firstname: "Abhishek",
      lastname: "Yadav",
      profileImage:
        "https://i2.seadn.io/ethereum/560bfb41769046cf9127d417ef044ffd/a03e58d2993623e91d6ccfcc5e9e1b/c5a03e58d2993623e91d6ccfcc5e9e1b.gif?h=250&w=250",
      role: "Athlete",
      status: "Active",
      isVerified: true,
      isDeleted: false,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "ed345678-ed34-5678-ed34-5678ed345678",
    slug: "collection-1",
    bannerImage:
      "https://i2.seadn.io/base/f04c4910218743b6be5926911e3b59db/ac21a7d4d2745fd9016e5f0521b508/b8ac21a7d4d2745fd9016e5f0521b508.jpeg?w=3000",
    coverImage:
      "https://i2.seadn.io/base/f04c4910218743b6be5926911e3b59db/4ed6dd289a6ab8c971941096467637/244ed6dd289a6ab8c971941096467637.gif?h=250&w=250",
    title: "FARWORLD // Creatures",
    description: `
        <p>Welcome to Terminal City!</p>
        <p>
          This collection is where each of your AI Trader NFT's will appear.
        </p>
        <p>The simulation will begin on 5/15/2025, where your traders will compete against one another to earn the very most $WEBCOIN through well-timed trades, coordination, and manipulation. Will your name bear the coveted #1 spot on the leaderboard by the end?</p>
      `,
    isPrivate: false,
    cardsCount: 1000,
    createdBy: {
      id: "ed345678-ed34-5678-ed34-5678ed345678",
      username: "@abhishek",
      firstname: "Abhishek",
      lastname: "Yadav",
      profileImage:
        "https://i2.seadn.io/ethereum/560bfb41769046cf9127d417ef044ffd/a03e58d2993623e91d6ccfcc5e9e1b/c5a03e58d2993623e91d6ccfcc5e9e1b.gif?h=250&w=250",
      role: "Athlete",
      status: "Active",
      isVerified: true,
      isDeleted: false,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "ed345678-ed34-5678-ed34-5678ed345678",
    slug: "collection-1",
    bannerImage:
      "https://i2.seadn.io/ronin/268bec42a1424e8b8992ddbb0aef688e/59ce341c520d0259ce99c750d328ed/6159ce341c520d0259ce99c750d328ed.png?w=3000",
    coverImage:
      "https://i2.seadn.io/ronin/268bec42a1424e8b8992ddbb0aef688e/81d7f0ad2462ceaaa1eff0eb41673b/3a81d7f0ad2462ceaaa1eff0eb41673b.png?h=250&w=250",
    title: "Ragnarok Landverse Genesis Item",
    description: `
        <p>Welcome to Terminal City!</p>
        <p>
          This collection is where each of your AI Trader NFT's will appear.
        </p>
        <p>The simulation will begin on 5/15/2025, where your traders will compete against one another to earn the very most $WEBCOIN through well-timed trades, coordination, and manipulation. Will your name bear the coveted #1 spot on the leaderboard by the end?</p>
      `,
    isPrivate: false,
    cardsCount: 1000,
    createdBy: {
      id: "ed345678-ed34-5678-ed34-5678ed345678",
      username: "@abhishek",
      firstname: "Abhishek",
      lastname: "Yadav",
      profileImage:
        "https://i2.seadn.io/ethereum/560bfb41769046cf9127d417ef044ffd/a03e58d2993623e91d6ccfcc5e9e1b/c5a03e58d2993623e91d6ccfcc5e9e1b.gif?h=250&w=250",
      role: "Athlete",
      status: "Active",
      isVerified: true,
      isDeleted: false,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
];
