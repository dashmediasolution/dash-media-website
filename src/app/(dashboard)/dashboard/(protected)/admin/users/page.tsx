"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, RefreshCw, UserPlus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EditUserModal } from "@/components/dashboard/EditUserModal";
import { DeleteUserModal } from "@/components/dashboard/DeleteUserModal";

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
};

export default function TeamManagementPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    // ✅ State for Modals
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const { register, handleSubmit, reset, setValue } = useForm();

    const fetchUsers = async () => {
        setIsFetching(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success("User created successfully!");
                reset();
                fetchUsers();
            } else {
                const err = await res.json();
                toast.error(err.message || "Failed to create user");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 space-y-12">

            {/* Create User Form (Same as before) */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <UserPlus className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight">Add Team Member</h2>
                </div>
                <Card variant="neubrutalism" className="max-w-2xl">
                    <div className="p-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input {...register("name", { required: true })} placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input {...register("email", { required: true })} type="email" placeholder="john@dashmedia.com" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input {...register("password", { required: true })} type="password" placeholder="••••••••" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role</Label>
                                    <Select onValueChange={(val) => setValue("role", val)} defaultValue="EDITOR">
                                        <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EDITOR">Editor (Blogs Only)</SelectItem>
                                            <SelectItem value="ADMIN">Admin (Full Access)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button disabled={isLoading} className="w-full md:w-auto">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create Account
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>

            {/* User Table */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Existing Accounts</h2>
                    <Button variant="outline" size="sm" onClick={fetchUsers} disabled={isFetching}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} /> Refresh
                    </Button>
                </div>

                <div className="rounded-lg border bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isFetching ? (
                                <TableRow><TableCell colSpan={5} className="h-24 text-center">Loading users...</TableCell></TableRow>
                            ) : users.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="h-24 text-center">No users found.</TableCell></TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</TableCell>

                                        {/* ✅ Action Buttons */}
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="hover:bg-gray-200" onClick={() => setEditingUser(user)}>
                                                    <Pencil className="h-4 w-4 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="hover:bg-gray-200" onClick={() => setDeletingUser(user)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* ✅ Render Modals */}
            {editingUser && (
                <EditUserModal
                    isOpen={!!editingUser}
                    onClose={() => setEditingUser(null)}
                    user={editingUser}
                    onUpdate={fetchUsers}
                />
            )}
            {deletingUser && (
                <DeleteUserModal
                    isOpen={!!deletingUser}
                    onClose={() => setDeletingUser(null)}
                    user={deletingUser}
                    onDelete={fetchUsers}
                />
            )}

        </div>
    );
}