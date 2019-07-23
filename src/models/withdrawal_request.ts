export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  referenceNo: string;
  remarks: string;
  approvedById: string;
  approvedAt: string;
  status: number;
}
