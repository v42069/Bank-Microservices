const ACCOUNTS_API_URL = "http://localhost:8080/api"
const CARDS_API_URL = "http://localhost:8090/api"
const LOANS_API_URL = "http://localhost:8100/api"

// Response structure interface
interface ApiResponse<T> {
  data: T
  message: string
  statusCode: number
  timeStamp: string
}

// Customer data interfaces
interface CustomerDto {
  name: string
  email: string
  mobileNumber: string
}

interface AccountData extends CustomerDto {
  accountNumber: string
  accountType: string
  branchAddress: string
}

interface CardsDto {
  cardNumber: string
  cardType: string
  mobileNumber: string
  totalLimit: number
  amountUsed: number
  availableAmount: number
}

interface LoansDto {
  loanNumber: string
  loanType: string
  mobileNumber: string
  totalLoan: number
  amountPaid: number
  outstandingAmount: number
}

class ApiService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit, baseUrl: string = ACCOUNTS_API_URL): Promise<T> {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.data || data
  }

  // Account operations
  async createAccount(customerData: CustomerDto): Promise<void> {
    await this.fetchApi('/create', {
      method: 'POST',
      body: JSON.stringify(customerData),
    })
  }

  async fetchAccount(mobileNumber: string): Promise<AccountData> {
    return this.fetchApi<AccountData>(`/fetch?mobileNumber=${mobileNumber}`)
  }

  async updateAccount(customerData: CustomerDto): Promise<void> {
    await this.fetchApi('/update', {
      method: 'PATCH',
      body: JSON.stringify(customerData),
    })
  }

  async deleteAccount(mobileNumber: string): Promise<void> {
    await this.fetchApi(`/delete?mobileNumber=${mobileNumber}`, {
      method: 'DELETE',
    })
  }

  // Customer operations
  async fetchCustomerDetails(mobileNumber: string): Promise<AccountData> {
    return this.fetchApi<AccountData>(`/fetchCustomerDetails?mobileNumber=${mobileNumber}`)
  }

  // Cards operations
  async createCard(mobileNumber: string): Promise<void> {
    await this.fetchApi('/create', {
      method: 'POST',
    }, `${CARDS_API_URL}?mobileNumber=${mobileNumber}`)
  }

  async fetchCard(mobileNumber: string): Promise<CardsDto> {
    return this.fetchApi<CardsDto>(`/fetch?mobileNumber=${mobileNumber}`, {}, CARDS_API_URL)
  }

  async updateCard(cardData: CardsDto): Promise<void> {
    await this.fetchApi('/update', {
      method: 'PUT',
      body: JSON.stringify(cardData),
    }, CARDS_API_URL)
  }

  async deleteCard(mobileNumber: string): Promise<void> {
    await this.fetchApi(`/delete?mobileNumber=${mobileNumber}`, {
      method: 'DELETE',
    }, CARDS_API_URL)
  }

  // Loans operations
  async createLoan(mobileNumber: string): Promise<void> {
    await this.fetchApi(`/create?mobileNumber=${mobileNumber}`, {
      method: 'POST',
    }, LOANS_API_URL)
  }

  async fetchLoan(mobileNumber: string): Promise<LoansDto> {
    return this.fetchApi<LoansDto>(`/fetch?mobileNumber=${mobileNumber}`, {}, LOANS_API_URL)
  }

  async updateLoan(loanData: LoansDto): Promise<void> {
    await this.fetchApi('/update', {
      method: 'PUT',
      body: JSON.stringify(loanData),
    }, LOANS_API_URL)
  }

  async deleteLoan(mobileNumber: string): Promise<void> {
    await this.fetchApi(`/delete?mobileNumber=${mobileNumber}`, {
      method: 'DELETE',
    }, LOANS_API_URL)
  }

  // System info operations
  async getBuildInfo(): Promise<string> {
    const response = await fetch(`${ACCOUNTS_API_URL}/build-info`)
    return response.text()
  }

  async getJavaVersion(): Promise<string> {
    const response = await fetch(`${ACCOUNTS_API_URL}/java-version`)
    return response.text()
  }

  async getContactInfo(): Promise<any> {
    return this.fetchApi<any>('/contact-info')
  }

  async getCardsJavaVersion(): Promise<string> {
    const response = await fetch(`${CARDS_API_URL}/java-version`)
    return response.text()
  }

  async getCardsContactInfo(): Promise<any> {
    return this.fetchApi<any>('/contact-info', {}, CARDS_API_URL)
  }

  async getLoansJavaVersion(): Promise<string> {
    const response = await fetch(`${LOANS_API_URL}/java-version`)
    return response.text()
  }

  async getLoansContactInfo(): Promise<any> {
    return this.fetchApi<any>('/contact-info', {}, LOANS_API_URL)
  }

  async getProfile(): Promise<string> {
    const response = await fetch(`${ACCOUNTS_API_URL}/profile`)
    return response.text()
  }

  async getHome(): Promise<string> {
    const response = await fetch(`${ACCOUNTS_API_URL}/home`)
    return response.text()
  }
}

export const apiService = new ApiService()
export type { CustomerDto, AccountData, CardsDto, LoansDto }