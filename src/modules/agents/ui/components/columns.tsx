"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentGetOne } from "../../types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CornerDownRightIcon, ViewIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentGetOne>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar seed={row.original.name} variant="bottts" className="size-6" />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-muted-foreground text-sm max-w-[200px] truncate capitalize">
            {row.original.instruction}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: () => (
      <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
        <ViewIcon className="text-blue-700" />5 meetings
      </Badge>
    ),
  },
];
