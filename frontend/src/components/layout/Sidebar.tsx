import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { navigation } from "@/config/navigation";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-background">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          FinPilot v0.1.0
        </p>
      </div>
    </aside>
  );
}