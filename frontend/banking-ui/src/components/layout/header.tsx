import { Building2 } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gradient-hero text-white shadow-elegant">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Banking API Gateway</h1>
            <p className="text-blue-100">Account Management System</p>
          </div>
        </div>
      </div>
    </header>
  )
}