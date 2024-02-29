import { PrismaClient } from '@prisma/client'
import { payload, StatusData } from './type';

const prisma = new PrismaClient()

export async function save(payload : payload) : Promise<void> {
    await prisma.status.create({
        data: { 
            receiver : payload.to,
            subject : payload.subject,
            body : payload.text
         },
    })
}

export async function getAllStatus(): Promise<StatusData[]> {
    return await prisma.status.findMany({
        orderBy: {
            id: 'desc'
        }
    });
}