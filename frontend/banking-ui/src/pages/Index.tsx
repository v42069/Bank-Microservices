import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { CreateAccountForm } from "@/components/forms/create-account-form"
import { FetchAccountForm } from "@/components/forms/fetch-account-form"
import { UpdateAccountForm } from "@/components/forms/update-account-form"
import { DeleteAccountForm } from "@/components/forms/delete-account-form"
import { CreateCardForm } from "@/components/forms/create-card-form"
import { FetchCardForm } from "@/components/forms/fetch-card-form"
import { UpdateCardForm } from "@/components/forms/update-card-form"
import { DeleteCardForm } from "@/components/forms/delete-card-form"
import { CreateLoanForm } from "@/components/forms/create-loan-form"
import { FetchLoanForm } from "@/components/forms/fetch-loan-form"
import { UpdateLoanForm } from "@/components/forms/update-loan-form"
import { DeleteLoanForm } from "@/components/forms/delete-loan-form"
import { SystemInfo } from "@/components/dashboard/system-info"
import { apiService, type CustomerDto, type AccountData, type CardsDto, type LoansDto } from "@/services/api"
import { UserPlus, Search, Edit, Trash2, Settings, CreditCard, PiggyBank } from "lucide-react"

const Index = () => {
  const [activeTab, setActiveTab] = useState("accounts")
  const [activeSubTab, setActiveSubTab] = useState("create")

  const handleCreateAccount = async (data: CustomerDto): Promise<void> => {
    await apiService.createAccount(data)
  }

  const handleFetchAccount = async (mobileNumber: string): Promise<AccountData> => {
    return await apiService.fetchAccount(mobileNumber)
  }

  const handleUpdateAccount = async (data: CustomerDto): Promise<void> => {
    await apiService.updateAccount(data)
  }

  const handleDeleteAccount = async (mobileNumber: string): Promise<void> => {
    await apiService.deleteAccount(mobileNumber)
  }

  const handleFetchBuildInfo = async (): Promise<string> => {
    return await apiService.getBuildInfo()
  }

  const handleFetchJavaVersion = async (): Promise<string> => {
    return await apiService.getJavaVersion()
  }

  const handleFetchContactInfo = async (): Promise<any> => {
    return await apiService.getContactInfo()
  }

  // Cards handlers
  const handleCreateCard = async (mobileNumber: string): Promise<void> => {
    await apiService.createCard(mobileNumber)
  }

  const handleFetchCard = async (mobileNumber: string): Promise<CardsDto> => {
    return await apiService.fetchCard(mobileNumber)
  }

  const handleUpdateCard = async (cardData: CardsDto): Promise<void> => {
    await apiService.updateCard(cardData)
  }

  const handleDeleteCard = async (mobileNumber: string): Promise<void> => {
    await apiService.deleteCard(mobileNumber)
  }

  // Loans handlers
  const handleCreateLoan = async (mobileNumber: string): Promise<void> => {
    await apiService.createLoan(mobileNumber)
  }

  const handleFetchLoan = async (mobileNumber: string): Promise<LoansDto> => {
    return await apiService.fetchLoan(mobileNumber)
  }

  const handleUpdateLoan = async (loanData: LoansDto): Promise<void> => {
    await apiService.updateLoan(loanData)
  }

  const handleDeleteLoan = async (mobileNumber: string): Promise<void> => {
    await apiService.deleteLoan(mobileNumber)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-banking-navy mb-2">Banking Management System</h2>
            <p className="text-muted-foreground">Manage accounts, cards, loans and view system information</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="accounts" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Accounts
              </TabsTrigger>
              <TabsTrigger value="cards" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Cards
              </TabsTrigger>
              <TabsTrigger value="loans" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                Loans
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-6">
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="create" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create
                  </TabsTrigger>
                  <TabsTrigger value="fetch" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Fetch
                  </TabsTrigger>
                  <TabsTrigger value="update" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Update
                  </TabsTrigger>
                  <TabsTrigger value="delete" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <CreateAccountForm onSubmit={handleCreateAccount} />
                </TabsContent>
                <TabsContent value="fetch">
                  <FetchAccountForm onSubmit={handleFetchAccount} />
                </TabsContent>
                <TabsContent value="update">
                  <UpdateAccountForm onSubmit={handleUpdateAccount} />
                </TabsContent>
                <TabsContent value="delete">
                  <DeleteAccountForm onSubmit={handleDeleteAccount} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="cards" className="space-y-6">
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="create" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create
                  </TabsTrigger>
                  <TabsTrigger value="fetch" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Fetch
                  </TabsTrigger>
                  <TabsTrigger value="update" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Update
                  </TabsTrigger>
                  <TabsTrigger value="delete" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <CreateCardForm onSubmit={handleCreateCard} />
                </TabsContent>
                <TabsContent value="fetch">
                  <FetchCardForm onSubmit={handleFetchCard} />
                </TabsContent>
                <TabsContent value="update">
                  <UpdateCardForm onSubmit={handleUpdateCard} />
                </TabsContent>
                <TabsContent value="delete">
                  <DeleteCardForm onSubmit={handleDeleteCard} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="loans" className="space-y-6">
              <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="create" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Create
                  </TabsTrigger>
                  <TabsTrigger value="fetch" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Fetch
                  </TabsTrigger>
                  <TabsTrigger value="update" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Update
                  </TabsTrigger>
                  <TabsTrigger value="delete" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                  <CreateLoanForm onSubmit={handleCreateLoan} />
                </TabsContent>
                <TabsContent value="fetch">
                  <FetchLoanForm onSubmit={handleFetchLoan} />
                </TabsContent>
                <TabsContent value="update">
                  <UpdateLoanForm onSubmit={handleUpdateLoan} />
                </TabsContent>
                <TabsContent value="delete">
                  <DeleteLoanForm onSubmit={handleDeleteLoan} />
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <SystemInfo 
                onFetchBuildInfo={handleFetchBuildInfo}
                onFetchJavaVersion={handleFetchJavaVersion}
                onFetchContactInfo={handleFetchContactInfo}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
};

export default Index;
