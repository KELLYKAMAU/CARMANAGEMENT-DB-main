import { Express } from "express";
import * as customercontroller from '../controllers/customer.controller'

const customerRoutes = (app: Express) => {
    app.get('/customers', customercontroller.getcustomers);
    app.get('/customers/:id', customercontroller.getcustomerById);
    app.post('/customers', customercontroller.createcustomer);
    app.put('/customers/:id', customercontroller.updatecustomer);
    app.delete('/customers/:id', customercontroller.deletecustomer);

    //api to all practice
    app.get('/allcustomers', customercontroller.getAllcustomersController);
    app.post('/addcustomers', customercontroller.AddcustomerController);
}

export default customerRoutes; 