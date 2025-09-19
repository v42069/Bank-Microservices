import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiStatus } from "@/components/ui/api-status"
import { useToast } from "@/hooks/use-toast"

interface FetchData {
  mobileNumber: string
}

interface AccountData {
  name: string
  email: string
  mobileNumber: string
  accountNumber: string
  accountType: string
  branchAddress: string
}

interface FetchAccountFormProps {
  onSubmit: (mobileNumber: string) => Promise<AccountData>
}

export function FetchAccountForm({ onSubmit }: FetchAccountFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [accountData, setAccountData] = useState<AccountData | null>(null)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FetchData>()

  const handleFormSubmit = async (data: FetchData) => {
    setStatus("loading")
    setAccountData(null)
    try {
      const result = await onSubmit(data.mobileNumber)
      setAccountData(result)
      setStatus("success")
      toast({
        title: "Success",
        description: "Account details fetched successfully",
        variant: "default"
      })
    } catch (error) {
      setStatus("error")
      toast({
        title: "Error",
        description: "Failed to fetch account details",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-banking-navy">Fetch Account Details</CardTitle>
          <CardDescription>
            Enter mobile number to retrieve account information
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                message={status === "success" ? "Account details retrieved" : status === "error" ? "Account not found" : undefined}
              />
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary shadow-elegant hover:shadow-soft transition-all duration-300"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Searching..." : "Fetch Account"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {accountData && (
        <Card className="shadow-soft border-success">
          <CardHeader>
            <CardTitle className="text-success">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                <p className="text-sm">{accountData.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                <p className="text-sm">{accountData.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Mobile</Label>
                <p className="text-sm">{accountData.mobileNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Account Number</Label>
                <p className="text-sm font-mono">{accountData.accountNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Account Type</Label>
                <p className="text-sm">{accountData.accountType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Branch</Label>
                <p className="text-sm">{accountData.branchAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}