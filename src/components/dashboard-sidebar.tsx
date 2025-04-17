"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Home,
  ShoppingBag,
  ShoppingCart,
  Users,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close mobile sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        ref={buttonRef}
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden shadow-md bg-white dark:bg-gray-800"
        onClick={toggleSidebar}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Desktop sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-200 ease-in-out",
          // Mobile states
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop states
          isCollapsed ? "md:w-20" : "md:w-64",
        )}
      >
        <div className="flex items-center justify-between h-16 border-b px-4">
          <h2
            className={cn(
              "text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-200",
              isCollapsed ? "md:opacity-0" : "md:opacity-100",
            )}
          >
            StepMaster Shoes
          </h2>

          {/* Desktop collapse toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className={cn(
                  "flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                  isActive("/")
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200",
                )}
                onClick={closeSidebar}
              >
                <Home className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={cn(
                  "flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                )}
                onClick={closeSidebar}
              >
                <BarChart3 className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Sales Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={cn(
                  "flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                  isActive("/products")
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200",
                )}
                onClick={closeSidebar}
              >
                <ShoppingBag className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={cn(
                  "flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                )}
                onClick={closeSidebar}
              >
                <ShoppingCart className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Orders
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/customers"
                className={cn(
                  "flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                  isActive("/customers")
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200",
                )}
                onClick={closeSidebar}
              >
                <Users className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Customers
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/regions"
                className={cn(
                  "flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                  isActive("/regions")
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-200",
                )}
                onClick={closeSidebar}
              >
                <Globe className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Regions
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={cn(
                  "flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                  isCollapsed && "md:justify-center",
                )}
                onClick={closeSidebar}
              >
                <Settings className="w-5 h-5 mr-3 md:mr-0" />
                <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
