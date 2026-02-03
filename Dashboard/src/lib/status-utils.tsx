import { CheckCircle, Clock, AlertCircle, Play, Pause } from "lucide-react";
import type { SessionStatus } from "../types";

/**
 * Get the status icon component for a session status
 */
export function getStatusIcon(status: SessionStatus): JSX.Element {
  switch (status) {
    case "running":
      return (
        <Play className="h-4 w-4 text-[var(--status-running-foreground)]" />
      );
    case "completed":
      return (
        <CheckCircle className="h-4 w-4 text-[var(--status-completed-foreground)]" />
      );
    case "failed":
      return (
        <AlertCircle className="h-4 w-4 text-[var(--status-failed-foreground)]" />
      );
    case "paused":
      return (
        <Pause className="h-4 w-4 text-[var(--status-paused-foreground)]" />
      );
    default:
      return (
        <Clock className="h-4 w-4 text-[var(--status-pending-foreground)]" />
      );
  }
}

/**
 * Get the CSS class for a session status badge
 */
export function getStatusColor(status: SessionStatus): string {
  switch (status) {
    case "running":
      return "status-running";
    case "completed":
      return "status-completed";
    case "failed":
      return "status-failed";
    case "paused":
      return "status-paused";
    default:
      return "status-pending";
  }
}

/**
 * Get initials from a full name
 * @example getInitials("John Doe") // "JD"
 */
export function getInitials(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
