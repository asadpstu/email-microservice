import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
type payload = {
    to: string
    subject: string
    text: string
}

export async function save(payload : payload) : Promise<void> {
    await prisma.status.create({
        data: { 
            receiver : payload.to,
            subject : payload.subject,
            body : payload.text
         },
    })
}
