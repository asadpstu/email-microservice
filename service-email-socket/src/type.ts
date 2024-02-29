export interface payload {
    to: string
    subject: string
    text: string
}
export interface StatusData {
    id: number;
    receiver: string;
    subject: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}