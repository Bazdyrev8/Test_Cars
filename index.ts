import express, { Express, Request, Response } from 'express';
import path from 'path';
import { ItemsController } from './controllers/CarsController';

const app: Express = express();
const carsController = new ItemsController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/", (req: Request, res: Response) => {
  carsController.index(req, res);
});

app.get("/link", (req: Request, res: Response) => {
  carsController.pageState_Cars(req, res);
});

app.post("/station_carsCreate", (req: Request, res: Response) => {
  carsController.station_carsCreate(req, res);
});
