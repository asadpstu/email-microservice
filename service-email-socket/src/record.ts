import { payload, StatusData } from './type';
import { getPrismaClient } from './connection/client';

const db = getPrismaClient();

export async function save(payload: payload): Promise<number> {
    const createdRecord = await db.status.create({
        data: {
            receiver: payload.to,
            subject: payload.subject,
            body: payload.text,
            status : false
        },
    });
    return createdRecord.id;
}

export async function updateStatusById(id: number): Promise<void> {
    try {
        await db.status.update({
            where: { id },
            data: {
                status: true
            },
        });  
    } catch (error) {
        throw error; 
    }
}

export async function getAllStatus(): Promise<StatusData[]> {
    return await db.status.findMany({
        orderBy: {
            id: 'desc'
        }
    });
}