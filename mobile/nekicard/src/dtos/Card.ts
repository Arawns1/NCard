export interface Card {
  id: string
  status: boolean
  nfcId: string
  type: string
  qrCodeURL: string
  userId?: string
}
