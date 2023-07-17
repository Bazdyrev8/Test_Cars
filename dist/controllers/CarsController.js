"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("      ");
            const cars = yield prisma.cars.findMany();
            for (let i = 0; i < cars.length; i++) {
                console.log("Cars:" + cars[i].title);
                const drivers = yield prisma.drivers.findMany({
                    where: {
                        id: cars[i].driveId,
                    }
                });
                console.log("Drivers:" + drivers[0].title);
                const cars_station = yield prisma.cars.findMany({
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
                const exisCars_station = yield prisma.cars_station.findMany({
                    where: {
                        carId: Number(cars[i].id),
                    }
                });
                if (exisCars_station.length > 0) {
                    let arr = [];
                    for (let i = 0; i < cars_station[0].station.length; i++) {
                        arr.push(cars_station[0].station[i].station.id);
                    }
                    ;
                    const station = yield prisma.station.findMany({
                        where: {
                            id: {
                                in: arr,
                            }
                        }
                    });
                    for (let i = 0; i < station.length; i++) {
                        console.log("Station:" + String(station[i].title));
                    }
                }
                else {
                    console.log("Station: Нет");
                }
                console.log("----------");
            }
            res.render('home', {
                'cars': cars,
            });
        });
    }
    pageState_Cars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield prisma.cars.findMany();
            const station = yield prisma.station.findMany();
            res.render('items/create', {
                'cars': cars,
                'station': station,
            });
        });
    }
    station_carsCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carId, stateId } = req.body;
            const exisCars_station = yield prisma.cars_station.findMany({
                where: {
                    carId: Number(carId),
                    stationId: Number(stateId),
                }
            });
            if (exisCars_station.length == 0) {
                yield prisma.cars_station.create({
                    data: {
                        carId: Number(carId),
                        stationId: Number(stateId),
                    }
                });
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
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=CarsController.js.map