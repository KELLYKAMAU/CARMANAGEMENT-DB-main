import { Express } from "express";
import * as customercontroller from '../controllers.ts/customer.controller'

const customerRoutes = (app: Express) => {
    app.get('/customer', customercontroller.getcustomers);
    app.get('/customer/:id', customercontroller.getcustomerById);
    app.post('/customer', customercontroller.createcustomer);
    app.put('/customer/:id', customercontroller.updatecustomer);
    app.delete('/customer/:id', customercontroller.deletecustomer);

    //api to all practice
    app.get('/allcustomers', customercontroller.getAllcustomersController);
    app.post('/addcustomers', customercontroller.AddcustomerController);
}

export default customerRoutes; 