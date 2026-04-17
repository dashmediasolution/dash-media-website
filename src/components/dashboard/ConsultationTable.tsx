'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type ConsultationRequest } from "@prisma/client";
import { Mail, Phone, Check, Trash2 } from "lucide-react";

// ✅ Define Props Interface
interface ConsultationTableProps {
  requests: ConsultationRequest[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ConsultationTable({ requests, loading, onMarkAsRead, onDelete }: ConsultationTableProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Client Details</TableHead>
            <TableHead>Service Interest</TableHead>
            <TableHead className="max-w-[300px]">Requirements</TableHead>
            <TableHead>Submitted On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
               <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Loading requests...
               </TableCell>
            </TableRow>
          ) : requests.length > 0 ? (
            requests.map((req, index) => (
              <TableRow key={req.id} className={req.isRead ? "opacity-60" : ""}>
                <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                
                {/* Client Details */}
                <TableCell>
                  <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{req.name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                           <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {req.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                           <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {req.mobileNumber}</span>
                      </div>
                  </div>
                </TableCell>

                {/* Service */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm">
                          {req.service || "General Inquiry"}
                      </span>
                      {req.websiteUrl && (
                          <a href={req.websiteUrl} target="_blank" className="text-xs text-blue-600 hover:underline truncate max-w-[150px]">
                              {req.websiteUrl}
                          </a>
                      )}
                  </div>
                </TableCell>
                
                {/* Requirements */}
                <TableCell className="max-w-[300px]">
                  <p className="text-sm text-muted-foreground line-clamp-3" title={req.requirements}>
                      {req.requirements}
                  </p>
                </TableCell>
                
                {/* Date */}
                <TableCell className="text-muted-foreground text-sm">
                  {new Date(req.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onMarkAsRead(req.id)}
                      disabled={req.isRead}
                      title="Mark as Read"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(req.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}