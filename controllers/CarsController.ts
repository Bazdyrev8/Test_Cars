import { Request, Response } from 'express';
import { cars, cars_station, drivers, PrismaClient, station } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async index(req: Request, res: Response) {
        console.log("      ");
        const cars: cars[] = await prisma.cars.findMany();

        for (let i = 0; i < cars.length; i++) {
            console.log("Cars:" + cars[i].title);

            const drivers = await prisma.drivers.findMany({
                where: {
                    id: cars[i].driveId,
                }
            });
            console.log("Drivers:" + drivers[0].title);

            const cars_station = await prisma.cars.findMany({
                where: {
                    id: Number(cars[i].id),
                },
                select: {
                    station: {
                        select: {
                            station: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    }
                }
            });

            // console.log(cars_station[0].station[i].station.id);

            const exisCars_station = await prisma.cars_station.findMany({
                where: {
                    carId: Number(cars[i].id),
                }
            });
            if (exisCars_station.length > 0) {
                let arr = [];
                for (let i = 0; i < cars_station[0].station.length; i++) {
                    arr.push(cars_station[0].station[i].station.id)
                };

                const station = await prisma.station.findMany({
                    where: {
                        id: {
                            in: arr,
                        }
                    }
                });

                for (let i = 0; i < station.length; i++) {
                    console.log("Station:" + String(station[i].title));
                }
            } else {
                console.log("Station: Нет");
            }
            console.log("----------");
        }

        res.render('home', {
            'cars': cars,
        });
    }

    async pageState_Cars(req: Request, res: Response) {
        const cars: cars[] = await prisma.cars.findMany();
        const station = await prisma.station.findMany();

        res.render('items/create', {
            'cars': cars,
            'station': station,
        });
    }

    async station_carsCreate(req: Request, res: Response) {
        const { carId, stateId } = req.body;

        const exisCars_station = await prisma.cars_station.findMany({
            where: {
                carId: Number(carId),
                stationId: Number(stateId),
            }
        });

        if (exisCars_station.length == 0) {
            await prisma.cars_station.create({
                data: {
                    carId: Number(carId),
                    stationId: Number(stateId),
                }
            })
        }

        // const cars_station = await prisma.cars.findMany({
        //     where: {
        //         id: Number(carId),
        //     },
        //     select: {
        //         station: {
        //             select: {
        //                 station: {
        //                     select: {
        //                         id: true
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });

        // console.log(cars_station[0].station[0].station.id);

        // let arr = [];
        // for (let i = 0; i < cars_station[0].station.length; i++) {
        //     arr.push(cars_station[0].station[i].station.id)
        // };

        // const station = await prisma.station.findMany({
        //     where: {
        //         id: {
        //             in: arr,
        //         }
        //     }
        // });

        // await prisma.cars_station.create({
        //     data: {
        //         carId: Number(carId),
        //         stationId: Number(stateId),
        //     }
        // });
        res.redirect('/');
    }
}
