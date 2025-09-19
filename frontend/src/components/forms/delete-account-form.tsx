import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiStatus } from "@/components/ui/api-status"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

interface DeleteData {
  mobileNumber: string
}

interface DeleteAccountFormProps {
  onSubmit: (mobileNumber: string) => Promise<void>
}

export function DeleteAccountForm({ onSubmit }: DeleteAccountFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DeleteData>()

  const handleFormSubmit = async (data: DeleteData) => {
    setStatus("loading")
    try {
      await onSubmit(data.mobileNumber)
      setStatus("success")
      reset()
      toast({
        title: "Success",
        description: "Account deleted successfully",
        variant: "default"
      })
    } catch (error) {
      setStatus("error")
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="shadow-soft border-destructive">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <CardTitle className="text-destructive">Delete Account</CardTitle>
        </div>
        <CardDescription>
          Permanently remove customer account and all associated data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-destructive/10 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            ⚠️ Warning: This action cannot be undone. All account data will be permanently deleted.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              {...register("mobileNumber", { 
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be exactly 10 digits"
                }
              })}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobileNumber && (
              <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
            )}
          </div>

          {status !== "idle" && (
            <ApiStatus 
              status={status === "loading" ? "loading" : status === "success" ? "success" : "error"}
              message={status === "success" ? "Account deleted successfully" : status === "error" ? "Failed to delete account" : undefined}
            />
          )}

          <Button 
            type="submit" 
            variant="destructive"
            className="w-full shadow-elegant hover:shadow-soft transition-all duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Deleting Account..." : "Delete Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}