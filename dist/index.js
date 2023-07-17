"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const CarsController_1 = require("./controllers/CarsController");
const app = (0, express_1.default)();
const carsController = new CarsController_1.ItemsController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get("/", (req, res) => {
    carsController.index(req, res);
});
app.get("/link", (req, res) => {
    carsController.pageState_Cars(req, res);
});
app.post("/station_carsCreate", (req, res) => {
    carsController.station_carsCreate(req, res);
});
//# sourceMappingURL=index.js.map