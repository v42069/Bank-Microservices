import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Search, CreditCard } from "lucide-react"
import type { CardsDto } from "@/services/api"

interface FetchCardFormProps {
  onSubmit: (mobileNumber: string) => Promise<CardsDto>
}

export function FetchCardForm({ onSubmit }: FetchCardFormProps) {
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cardData, setCardData] = useState<CardsDto | null>(null)
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
      setCardData(result)
      toast({
        title: "Card Found",
        description: "Card details retrieved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch card details. Please try again.",
        variant: "destructive",
      })
      setCardData(null)
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
            Fetch Card Details
          </CardTitle>
          <CardDescription>
            Enter mobile number to retrieve card information
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
                'Fetch Card Details'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {cardData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Card Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Card Number</Label>
                <p className="text-lg font-mono">{cardData.cardNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Card Type</Label>
                <p className="text-lg">{cardData.cardType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Mobile Number</Label>
                <p className="text-lg">{cardData.mobileNumber}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Total Limit</Label>
                <p className="text-lg font-bold text-primary">${cardData.totalLimit?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Amount Used</Label>
                <p className="text-lg text-destructive">${cardData.amountUsed?.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Available Amount</Label>
                <p className="text-lg font-bold text-success">${cardData.availableAmount?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}