import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Edit, CreditCard } from "lucide-react"
import type { CardsDto } from "@/services/api"

interface UpdateCardFormProps {
  onSubmit: (cardData: CardsDto) => Promise<void>
}

export function UpdateCardForm({ onSubmit }: UpdateCardFormProps) {
  const [formData, setFormData] = useState<CardsDto>({
    cardNumber: "",
    cardType: "",
    mobileNumber: "",
    totalLimit: 0,
    amountUsed: 0,
    availableAmount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof CardsDto, value: string | number) => {
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
        title: "Card Updated Successfully",
        description: "Card details have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update card details. Please try again.",
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
          Update Card Details
        </CardTitle>
        <CardDescription>
          Update existing card information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                type="text"
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardType">Card Type</Label>
              <Input
                id="cardType"
                type="text"
                placeholder="e.g., Credit, Debit"
                value={formData.cardType}
                onChange={(e) => handleInputChange('cardType', e.target.value)}
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
              <Label htmlFor="totalLimit">Total Limit</Label>
              <Input
                id="totalLimit"
                type="number"
                placeholder="Enter total limit"
                value={formData.totalLimit || ""}
                onChange={(e) => handleInputChange('totalLimit', Number(e.target.value))}
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amountUsed">Amount Used</Label>
              <Input
                id="amountUsed"
                type="number"
                placeholder="Enter amount used"
                value={formData.amountUsed || ""}
                onChange={(e) => handleInputChange('amountUsed', Number(e.target.value))}
                min="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="availableAmount">Available Amount</Label>
              <Input
                id="availableAmount"
                type="number"
                placeholder="Enter available amount"
                value={formData.availableAmount || ""}
                onChange={(e) => handleInputChange('availableAmount', Number(e.target.value))}
                min="0"
                required
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Card...
              </>
            ) : (
              'Update Card'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}