import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search, PiggyBank } from "lucide-react"
import type { LoansDto } from "@/services/api"

interface FetchLoanFormProps {
  onSubmit: (mobileNumber: string) => Promise<LoansDto>
}

export function FetchLoanForm({ onSubmit }: FetchLoanFormProps) {
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loanData, setLoanData] = useState<LoansDto | null>(null)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!mobileNumber.match(/^[0-9]{10}$/)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await onSubmit(mobileNumber)
      setLoanData(result)
      toast({
        title: "Loan Found",
        description: "Loan details retrieved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch loan details. Please try again.",
        variant: "destructive",
      })
      setLoanData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Fetch Loan Details
          </CardTitle>
          <CardDescription>
            Enter mobile number to retrieve loan information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
                required
              />
            </div>
            
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Fetch Loan Details'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loanData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Loan Number</Label>
                <p className="text-lg font-mono">{loanData.loanNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Loan Type</Label>
                <p className="text-lg">{loanData.loanType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Mobile Number</Label>
                <p className="text-lg">{loanData.mobileNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Total Loan</Label>
                <p className="text-lg font-bold text-primary">${loanData.totalLoan?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Amount Paid</Label>
                <p className="text-lg text-success">${loanData.amountPaid?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Outstanding Amount</Label>
                <p className="text-lg font-bold text-destructive">${loanData.outstandingAmount?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}