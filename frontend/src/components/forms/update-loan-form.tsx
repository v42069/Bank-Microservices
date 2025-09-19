import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Edit, PiggyBank } from "lucide-react"
import type { LoansDto } from "@/services/api"

interface UpdateLoanFormProps {
  onSubmit: (loanData: LoansDto) => Promise<void>
}

export function UpdateLoanForm({ onSubmit }: UpdateLoanFormProps) {
  const [formData, setFormData] = useState<LoansDto>({
    loanNumber: "",
    loanType: "",
    mobileNumber: "",
    totalLoan: 0,
    amountPaid: 0,
    outstandingAmount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof LoansDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.mobileNumber.match(/^[0-9]{10}$/)) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await onSubmit(formData)
      toast({
        title: "Loan Updated Successfully",
        description: "Loan details have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update loan details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Update Loan Details
        </CardTitle>
        <CardDescription>
          Update existing loan information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loanNumber">Loan Number</Label>
              <Input
                id="loanNumber"
                type="text"
                placeholder="Enter loan number"
                value={formData.loanNumber}
                onChange={(e) => handleInputChange('loanNumber', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              <Input
                id="loanType"
                type="text"
                placeholder="e.g., Personal, Home, Auto"
                value={formData.loanType}
                onChange={(e) => handleInputChange('loanType', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                maxLength={10}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="totalLoan">Total Loan</Label>
              <Input
                id="totalLoan"
                type="number"
                placeholder="Enter total loan amount"
                value={formData.totalLoan || ""}
                onChange={(e) => handleInputChange('totalLoan', Number(e.target.value))}
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <Input
                id="amountPaid"
                type="number"
                placeholder="Enter amount paid"
                value={formData.amountPaid || ""}
                onChange={(e) => handleInputChange('amountPaid', Number(e.target.value))}
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="outstandingAmount">Outstanding Amount</Label>
              <Input
                id="outstandingAmount"
                type="number"
                placeholder="Enter outstanding amount"
                value={formData.outstandingAmount || ""}
                onChange={(e) => handleInputChange('outstandingAmount', Number(e.target.value))}
                min="0"
                required
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Loan...
              </>
            ) : (
              'Update Loan'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}