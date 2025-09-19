import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiStatus } from "@/components/ui/api-status"
import { useToast } from "@/hooks/use-toast"

interface CustomerData {
  name: string
  email: string
  mobileNumber: string
}

interface UpdateAccountFormProps {
  onSubmit: (data: CustomerData) => Promise<void>
}

export function UpdateAccountForm({ onSubmit }: UpdateAccountFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CustomerData>()

  const handleFormSubmit = async (data: CustomerData) => {
    setStatus("loading")
    try {
      await onSubmit(data)
      setStatus("success")
      toast({
        title: "Success",
        description: "Account updated successfully",
        variant: "default"
      })
    } catch (error) {
      setStatus("error")
      toast({
        title: "Error",
        description: "Failed to update account",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-banking-navy">Update Account Details</CardTitle>
        <CardDescription>
          Modify existing customer account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

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
              message={status === "success" ? "Account updated successfully" : status === "error" ? "Failed to update account" : undefined}
            />
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary shadow-elegant hover:shadow-soft transition-all duration-300"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Updating Account..." : "Update Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}