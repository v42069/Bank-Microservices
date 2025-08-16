import { Badge } from "@/components/ui/badge"

interface ApiStatusProps {
  status: "success" | "error" | "loading"
  message?: string
}

export function ApiStatus({ status, message }: ApiStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-success text-success-foreground"
      case "error":
        return "bg-destructive text-destructive-foreground"
      case "loading":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Badge className={getStatusColor()}>
      {status === "loading" ? "Processing..." : message || status}
    </Badge>
  )
}