import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CreditCard } from "lucide-react"

interface CreateCardFormProps {
  onSubmit: (mobileNumber: string) => Promise<void>
}

export function CreateCardForm({ onSubmit }: CreateCardFormProps) {
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      await onSubmit(mobileNumber)
      toast({
        title: "Card Created Successfully",
        description: "New card has been created for the mobile number.",
      })
      setMobileNumber("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create card. Please try again.",
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
          <CreditCard className="h-5 w-5" />
          Create New Card
        </CardTitle>
        <CardDescription>
          Create a new card by providing a mobile number
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
                Creating Card...
              </>
            ) : (
              'Create Card'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}