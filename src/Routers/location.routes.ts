import * as locationController from '../controllers/location.controller';
import e, { Router } from 'express';

import { Express } from 'express';


const locationRouter =(app: Express) => {
    app.get('/locations', locationController.getLocations);
    app.get('/locations/:location_id', locationController.getLocationDetails);
    app.post('/locations',locationController.createLocation);
    app.patch('/locations/:location_id',locationController.updateLocation)
    app.delete('/locations/:location_id',locationController.deleteLocation)
}

export default locationRouter;