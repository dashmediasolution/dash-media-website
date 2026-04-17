'use client';

import { useState, useEffect } from "react";
import { ConsultationTable } from "@/components/dashboard/ConsultationTable";
import { Button } from "@/components/ui/button"; // Import Button
import { RefreshCw } from "lucide-react"; // Import Icon
import { type ConsultationRequest } from "@prisma/client";

export default function ConsultationsPage() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/consultations');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial load
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      // Optimistic update for a snappy UI
      setRequests((prev) => prev.map((req) => req.id === id ? { ...req, isRead: true } : req));
      
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) throw new Error("Failed to mark as read");
      
    } catch (error) {
      console.error("Failed to mark as read:", error);
      fetchRequests(); // Revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      setRequests((prev) => prev.filter((req) => req.id !== id)); // Optimistic update
      
      const response = await fetch(`/api/consultations/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete");
    } catch (error) {
      console.error("Failed to delete request:", error);
      fetchRequests(); // Revert on failure
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header with Parallel Refresh Button */}
      <div className="flex flex-row items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Consultation Requests</h2>
            <p className="text-muted-foreground">
            View leads submitted via the contact form.
            </p>
        </div>
        
        <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchRequests} 
            disabled={loading}
        >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
        </Button>
      </div>

      {/* Table receiving state as props */}
      <ConsultationTable 
        requests={requests} 
        loading={loading} 
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}