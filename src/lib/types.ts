export interface CupydCard {
  id: string; // a 6 char id
  creatorId: string;
  isAccepted: boolean;
  isAnswered: boolean;
  answeredAt: string | null;
  isRejectable: boolean;
  rejectCount: number;
  viewCount: number;
}
