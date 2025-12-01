import { Link } from "react-router";
import { SidebarLink } from "./SidebarLink";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shadow-sm z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FlightApp
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink to="/locations">Locations</SidebarLink>
          <SidebarLink to="/transportations">Transportations</SidebarLink>
          <SidebarLink to="/transportation-schedules">Transportation Schedules</SidebarLink>
          <SidebarLink to="/routes">Routes</SidebarLink>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400">
            User Settings
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
            Hoş geldiniz, Murat Can
          </h1>
          <div className="flex items-center space-x-4">
            {/* Placeholder for header actions */}
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50 dark:bg-gray-900 scroll-smooth">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
