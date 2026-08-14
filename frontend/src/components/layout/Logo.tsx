import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed = false }: LogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
        <Landmark className="h-5 w-5" />
      </div>

      {!collapsed && (
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            FinPilot
          </h1>

          <p className="text-xs text-muted-foreground">
            Personal Finance OS
          </p>
        </div>
      )}
    </Link>
  );
}