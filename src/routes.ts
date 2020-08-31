import express from 'express';

import FieldsController from './controllers/FieldsController';

const fieldsController = new FieldsController();

const routes = express.Router();

routes.get('/fields', fieldsController.index);
routes.get('/fields/:id', fieldsController.show);
routes.post('/fields', fieldsController.create);
routes.patch('/fields/:id', fieldsController.polygons);
routes.put('/fields/:id', fieldsController.update);
routes.delete('/fields/:id', fieldsController.delete);

export default routes;