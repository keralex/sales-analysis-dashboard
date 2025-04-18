"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
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
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const menuLinks = [{ icon: <Home />, label: "Dashboard", path: "/" }, { icon: <ShoppingCart />, label: "Orders", path: "/orders" }, { icon: <ShoppingBag />, label: "Products", path: "/products" }, { icon: <Users />, label: "Customers", path: "/customers" }, { icon: <Globe />, label: "Regions", path: "/regions" }, { icon: <Settings />, label: "Settings", path: "/settings" }]
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
        className={`fixed top-4 left-4 z-50 md:hidden shadow-md bg-white dark:bg-gray-800 ${isOpen && 'right-4 left-auto'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar overlay for mobile */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />
      )}

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
              "text-xl font-bold text-gray-800 dark:text-white transition-all duration-200",
              isCollapsed ? "md:hidden" : "md:opacity-100",
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

        <nav className="mt-6 px-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <ul className="space-y-2">
            {menuLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
                    isCollapsed && "md:justify-center",
                    isActive(link.path)
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
                      : "text-gray-700 dark:text-gray-200",
                  )}
                  onClick={closeSidebar}
                >
                  <div className={`flex items-center justify-center w-8 h-8  ${!isCollapsed && "mr-4"}`}>
                    {link.icon}
                  </div>
                  <span className={cn("transition-opacity duration-200", isCollapsed ? "md:hidden" : "md:inline")}>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}

          </ul>
        </nav>
      </aside>
    </>
  )
}
