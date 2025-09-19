import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ApiStatus } from "@/components/ui/api-status"
import { useToast } from "@/hooks/use-toast"
import { Server, Coffee, Phone } from "lucide-react"

interface SystemInfoProps {
  onFetchBuildInfo: () => Promise<string>
  onFetchJavaVersion: () => Promise<string>
  onFetchContactInfo: () => Promise<any>
}

export function SystemInfo({ onFetchBuildInfo, onFetchJavaVersion, onFetchContactInfo }: SystemInfoProps) {
  const [buildInfo, setBuildInfo] = useState<string>("")
  const [javaVersion, setJavaVersion] = useState<string>("")
  const [contactInfo, setContactInfo] = useState<any>(null)
  const [loadingStates, setLoadingStates] = useState({
    build: false,
    java: false,
    contact: false
  })
  const { toast } = useToast()

  const fetchBuildInfo = async () => {
    setLoadingStates(prev => ({ ...prev, build: true }))
    try {
      const info = await onFetchBuildInfo()
      setBuildInfo(info)
      toast({
        title: "Success",
        description: "Build info retrieved",
        variant: "default"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch build info",
        variant: "destructive"
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, build: false }))
    }
  }

  const fetchJavaVersion = async () => {
    setLoadingStates(prev => ({ ...prev, java: true }))
    try {
      const version = await onFetchJavaVersion()
      setJavaVersion(version)
      toast({
        title: "Success",
        description: "Java version retrieved",
        variant: "default"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch Java version",
        variant: "destructive"
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, java: false }))
    }
  }

  const fetchContactInfo = async () => {
    setLoadingStates(prev => ({ ...prev, contact: true }))
    try {
      const info = await onFetchContactInfo()
      setContactInfo(info)
      toast({
        title: "Success",
        description: "Contact info retrieved",
        variant: "default"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contact info",
        variant: "destructive"
      })
    } finally {
      setLoadingStates(prev => ({ ...prev, contact: false }))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Build Info</CardTitle>
          </div>
          <CardDescription>Current application build version</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {buildInfo && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-mono">{buildInfo}</p>
              </div>
            )}
            <Button 
              onClick={fetchBuildInfo}
              disabled={loadingStates.build}
              className="w-full"
              variant="outline"
            >
              {loadingStates.build ? "Loading..." : "Get Build Info"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Java Version</CardTitle>
          </div>
          <CardDescription>Runtime Java version details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {javaVersion && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-mono">{javaVersion}</p>
              </div>
            )}
            <Button 
              onClick={fetchJavaVersion}
              disabled={loadingStates.java}
              className="w-full"
              variant="outline"
            >
              {loadingStates.java ? "Loading..." : "Get Java Version"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Contact Info</CardTitle>
          </div>
          <CardDescription>Support contact information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contactInfo && (
              <div className="p-3 bg-muted rounded-lg space-y-2">
                {Object.entries(contactInfo).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm font-medium">{key}:</span>
                    <span className="text-sm">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
            <Button 
              onClick={fetchContactInfo}
              disabled={loadingStates.contact}
              className="w-full"
              variant="outline"
            >
              {loadingStates.contact ? "Loading..." : "Get Contact Info"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}