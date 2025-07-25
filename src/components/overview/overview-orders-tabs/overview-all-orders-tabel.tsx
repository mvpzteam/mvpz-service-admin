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
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography";
import { getEventImage } from "@/utils/global";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Clock,
  EllipsisVertical,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

export const customerSchema = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  profileImage: z.string(),
  email: z.string(),
});

export const ordersSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customer: customerSchema,
  orderDate: z.string(),
  orderQuantity: z.number(),
  orderTotal: z.number(),
  orderType: z.enum(["card", "apparel", "surge"]),
  orderStatus: z.enum(["pending", "processing", "completed"]),
});

export default function OverviewAllOrdersTable({ view }: { view: string }) {
  const [data, setData] = useState<z.infer<typeof ordersSchema>[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setData(ordersData[view as keyof typeof ordersData] as z.infer<
      typeof ordersSchema
    >[] || []);
  }, [view]);

  const columns: ColumnDef<z.infer<typeof ordersSchema>>[] = [
    {
      accessorKey: `id`,
      header: "Order ID",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          {row.original.orderId}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: `customer`,
      header: "Customer",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          <Avatar className="size-8 flex justify-center items-center rounded-md overflow-hidden bg-background border">
            {row.original.customer.profileImage && (
              <AvatarImage
                src={getEventImage({
                  imageUrl: row.original.customer.profileImage,
                })}
                alt={row.original.customer.username}
                className="object-cover w-full h-full"
              />
            )}
            <AvatarFallback>
              {row.original.customer.firstname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <TypographySmall>
              {row.original.customer.firstname} {row.original.customer.lastname}
            </TypographySmall>
          </div>
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "orderDate",
      header: "Order Date",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          {row.original.orderDate}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "orderQuantity",
      header: "Order Quantity",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-muted-foreground px-1.5 capitalize"
        >
          x{row.original.orderQuantity}
        </Button>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "orderTotal",
      header: "Order Total",
      cell: ({ row }) => (
        <div className="w-32">
          <Button variant="ghost" className="text-muted-foreground px-1.5">
            ${row.original.orderTotal}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "orderType",
      header: () => "Order Type",
      cell: ({ row }) => {
        const GetBadge = (orderType: "card" | "apparel" | "surge") => {
          const getBadge = {
            card: "Card",
            apparel: "Apparel",
            surge: "Surge",
          };
          return (
            <Badge variant="default">
              {getBadge[orderType as keyof typeof getBadge]}
            </Badge>
          );
        };
        return <div className="w-32">{GetBadge(row.original.orderType)}</div>;
      },
    },
    {
      accessorKey: "orderStatus",
      header: () => "Order Status",
      cell: ({ row }) => {
        const GetBadge = (
          orderStatus: "pending" | "processing" | "completed"
        ) => {
          const getBadge = {
            pending: (
              <Badge variant="destructive">
                <Clock /> Pending
              </Badge>
            ),
            processing: (
              <Badge variant="outline">
                <Loader2 /> Processing
              </Badge>
            ),
            completed: (
              <Badge variant="default">
                <Check /> Completed
              </Badge>
            ),
          };
          return getBadge[orderStatus as keyof typeof getBadge];
        };
        return (
          <div className="w-32">
            <Button variant="ghost" className="text-muted-foreground px-1.5">
              {GetBadge(row.original.orderStatus)}
            </Button>
          </div>
        );
      },
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
            <DropdownMenuItem>Copy Order ID</DropdownMenuItem>
            <DropdownMenuItem>View Customer</DropdownMenuItem>
            <DropdownMenuItem>View Payment Details</DropdownMenuItem>
            
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
    <div className="space-y-4">
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
      
      <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
   
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
          
          </div>
      </div>
    </div>
  );
}

const ordersData = {
  all: [
    {
      id: "1",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "card",
      orderStatus: "pending",
    },
    {
      id: "2",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "card",
      orderStatus: "pending",
    },
    {
      id: "3",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "apparel",
      orderStatus: "processing",
    },
    {
      id: "4",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "surge",
      orderStatus: "completed",
    },
  ],
  card: [
    {
      id: "1",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "card",
      orderStatus: "pending",
    },
    {
      id: "2",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "card",
      orderStatus: "pending",
    },
    {
      id: "2",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "card",
      orderStatus: "pending",
    },
  ],
  apparel: [
    {
      id: "1",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "apparel",
      orderStatus: "pending",
    },
    {
      id: "2",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "apparel",
      orderStatus: "pending",
    },
    {
      id: "2",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "apparel",
      orderStatus: "pending",
    },
  ],
  surge: [
    {
      id: "1",
      orderId: "#1234567890",
      customer: {
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        profileImage: "https://github.com/shadcn.png",
        email: "john_doe@gmail.com",
      },
      orderDate: "2021-01-01",
      orderQuantity: 1,
      orderTotal: 100,
      orderType: "surge",
      orderStatus: "pending",
    },
  ],
};
