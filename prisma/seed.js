const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function station() {
    const createMany = await prisma.station.createMany({
        data: [
            { title: "Station1" },
            { title: "Station2" },
            { title: "Station3" },
        ],
        skipDuplicates: true
        }
    );
}

async function drivers() {
    const createMany = await prisma.drivers.createMany({
        data: [
            { 
                title: "Иван",
            },
            { 
                title: "Денис",
            },
        ],
        skipDuplicates: true
        }
    );
}

async function cars() {
    const createMany = await prisma.cars.createMany({
        data: [
            {
                title: "Mercedes",
                driveId: Number(1),
            },
            {
                title: "BMV",
                driveId: Number(2),
            },
            {
                title: "TOYOTA",
                driveId: Number(1),
            },
        ],
        skipDuplicates: true
        }
    );
}

drivers()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })

station()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })

cars()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1); 
    })