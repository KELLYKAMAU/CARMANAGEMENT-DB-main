import { Express } from "express";

import * as carContoller from "../controllers/car.controller";

const carRoutes = (app: Express) => {
  app.get("/cars", carContoller.getAllCars);
  app.post("/createCar", carContoller.addCar);
  app.get("/cars/:id", carContoller.getCarById);
  app.delete("/cars/:id", carContoller.deleteCar);
  app.put("/cars/:id", carContoller.updateCar);
  app.patch("/cars/:id", carContoller.updateCar);

};


export default carRoutes;