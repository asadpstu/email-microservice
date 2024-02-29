import { getPrismaClient } from './connection/client';
import { getAllStatus, save, updateStatusById} from './record';

const prisma = getPrismaClient();

describe('Asynchronous hook API microservice to trigger Email Notifications Test. ', () => {

    /**
     * Delete all data after each test
     */
    afterAll(async () => {
        await prisma.status.deleteMany()
        await prisma.$disconnect()
    })

    it('should create record and update the record', async () => {
        const id = await save({
            "subject" : "Hello",
            "to" : "hmasad09@gmail.com",
            "text" : "hm.ashad.zaman@gmail.com"
        })
        await updateStatusById(id);
        expect(id).not.toBeNull();
    })

    it('should get list of records', async () => {
        const data = await getAllStatus()
        expect(data.length).not.toEqual(0);
    })
})