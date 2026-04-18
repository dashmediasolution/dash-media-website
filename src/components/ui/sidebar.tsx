"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  Home,
  LayoutList,
  LogOut,
  MessageSquare,
  PenSquare,
  UserCircle,
  Users,
  Briefcase,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";

const sidebarVariants = {
  open: { width: "16rem" },
  closed: { width: "3.5rem" },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: { x: 0, opacity: 1, transition: { x: { stiffness: 1000, velocity: -100 } } },
  closed: { x: -20, opacity: 0, transition: { x: { stiffness: 100 } } },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
} as const;

const staggerVariants = {
  open: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
};

export function SessionNavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
 //  1. Destructure 'status' to check if we are loading
  const { data: session, status } = useSession();

  //  2. If loading, show a skeleton or nothing (prevents the "Editor" default)
  if (status === "loading") {
    return (
      <div className="h-full border-r bg-background p-4 w-[3.5rem]">
        <div className="space-y-4">
           {/* Simple skeleton circles to show something is happening */}
           <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
           <div className="h-8 w-8 rounded-md bg-muted animate-pulse" />
           <div className="h-8 w-8 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  //  3. NOW it is safe to read the role. 
  // If session is still null after loading, default to EDITOR (or handle as error)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (session?.user as any)?.role || "EDITOR";
  
  // Debug log to verify it works now
  console.log("Session Loaded. Role:", userRole);

  const userEmail = session?.user?.email || "user@dash.com";
  const userName = session?.user?.name || "User";


  // 2. Initials Logic
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isAdmin = userRole === "ADMIN";

  return (
    <motion.div
      className={cn("sidebar z-40 h-full shrink-0 border-r relative bg-background")}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <motion.div
        className="relative z-40 flex text-muted-foreground h-full shrink-0 flex-col transition-all"
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            
            {/* --- TOP SECTION: User Dropdown --- */}
            <div className="flex h-[68px] w-full shrink-0 border-b p-2 items-center">
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger className="w-full outline-none" asChild>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="flex w-full hover:bg-gray-100 items-center justify-start gap-2 px-2 h-auto py-2" 
                    >
                      <Avatar className='rounded-full size-8 border bg-secondary text-secondary-foreground'>
                        <AvatarFallback className="font-semibold">{userInitials}</AvatarFallback>
                      </Avatar>
                      
                      <motion.li
                        variants={variants}
                        className="flex items-center gap-2 overflow-hidden w-full"
                      >
                        {!isCollapsed && (
                          <div className="flex flex-col items-start text-left max-w-[140px]">
                            <p className="text-sm font-semibold text-foreground truncate w-full">
                              {userName}
                            </p>
                            {/* Show Role instead of Email for better context */}
                            <span className="text-xs text-muted-foreground truncate w-full capitalize">
                              {userRole.toLowerCase()} Dashboard
                            </span>
                          </div>
                        )}
                        {!isCollapsed && <ChevronsUpDown className="ml-auto h-3 w-3 opacity-50 shrink-0" />}
                      </motion.li>
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent align="start" className="w-60" sideOffset={10}>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                        {userEmail}
                    </div>
                    <Separator className="mb-1" />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings/profile" className="cursor-pointer flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" /> Profile Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* --- MIDDLE SECTION: Navigation --- */}
            <div className="flex h-full w-full flex-col pt-4">
              <ScrollArea className="h-full w-full p-2">
                <div className="flex w-full flex-col gap-1">
                  
                  {/* --- COMMON LINKS (Available to Everyone) --- */}
                  <div className="px-2 pb-1 pt-2">
                    {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">Content</p>}
                    
                    <Link
                      href="/dashboard"
                      className={cn(
                        "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                        pathname === "/dashboard" && "bg-muted text-primary font-medium",
                      )}
                    >
                      <LayoutList className="h-4 w-4 shrink-0" />
                      <motion.li variants={variants}>
                        {!isCollapsed && <p className="ml-2 text-sm">All Blog Posts</p>}
                      </motion.li>
                    </Link>

                    <Link
                      href="/dashboard/create"
                      className={cn(
                        "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                        pathname === "/dashboard/create" && "bg-muted text-primary font-medium",
                      )}
                    >
                      <PenSquare className="h-4 w-4 shrink-0" />
                      <motion.li variants={variants}>
                        {!isCollapsed && <p className="ml-2 text-sm">Create New Post</p>}
                      </motion.li>
                    </Link>
                  </div>

                  {/* --- ADMIN ONLY LINKS --- */}
                  {isAdmin && (
                    <>
                      <Separator className="my-2 mx-2 w-auto" />
                      <div className="px-2 pb-1">
                         {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">Admin</p>}
                        
                        <Link
                          href="/dashboard/consultations"
                          className={cn(
                            "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                            pathname === "/dashboard/consultations" && "bg-muted text-primary font-medium",
                          )}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <motion.li variants={variants}>
                            {!isCollapsed && <p className="ml-2 text-sm">Consultations</p>}
                          </motion.li>
                        </Link>

                        <Link
                          href="/dashboard/admin/users"
                          className={cn(
                            "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                            pathname === "/dashboard/admin/users" && "bg-muted text-primary font-medium",
                          )}
                        >
                          <Users className="h-4 w-4 shrink-0" />
                          <motion.li variants={variants}>
                            {!isCollapsed && <p className="ml-2 text-sm">Manage Team</p>}
                          </motion.li>
                        </Link>

                        {/*  ADDED: Careers Page Link */}
                        <Link
                          href="/dashboard/careers"
                          className={cn(
                            "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                            pathname === "/dashboard/careers" && "bg-muted text-primary font-medium",
                          )}
                        >
                          <Briefcase className="h-4 w-4 shrink-0" />
                          <motion.li variants={variants}>
                            {!isCollapsed && <p className="ml-2 text-sm">Manage Careers</p>}
                          </motion.li>
                        </Link>

                        <Link
                          href="/dashboard/area-serve-location"
                          className={cn(
                            "flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground",
                            pathname === "/dashboard/area-serve-location" && "bg-muted text-primary font-medium",
                          )}
                        >
                          <MapPin className="h-4 w-4 shrink-0" />
                          <motion.li variants={variants}>
                            {!isCollapsed && <p className="ml-2 text-sm">Manage Locations</p>}
                          </motion.li>
                        </Link>

                      </div>
                    </>
                  )}

                  <Separator className="my-2 mx-2 w-auto" />
                  
                  {/* --- External Link --- */}
                  <div className="px-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex h-9 w-full flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-muted hover:text-foreground group"
                    >
                        <Home className="h-4 w-4 shrink-0 group-hover:text-blue-500" />
                        <motion.li variants={variants}>
                        {!isCollapsed && <p className="ml-2 text-sm group-hover:text-blue-500">View Live Site</p>}
                        </motion.li>
                    </Link>
                  </div>

                </div>
              </ScrollArea>
            </div>

            {/* --- BOTTOM SECTION: Logout --- */}
            <div className="flex flex-col p-2 w-full mt-auto border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/dashboard/auth" })}
                className="flex w-full items-center justify-start gap-2 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <motion.li variants={variants}>
                  {!isCollapsed && <p className="text-sm font-medium">Log out</p>}
                </motion.li>
              </Button>
            </div>

          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}