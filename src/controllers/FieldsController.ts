import { Request, Response } from 'express';
import Field from '../models/field';

class FieldsController {

  async index(req: Request, res: Response) {
    try {
      const fields = await Field.find({})
      
      const SerializedFields = fields.map((field) => ({
        field_id: field._id,
        name: field.name,
        size: field.size,
        unity: field.unity
      }));
      
      return res.status(200).json(SerializedFields)
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {

      if (!await Field.exists({ _id: id })) {
        return res.status(404).json({ error: 'Field not found' });
      }
      
      const field = await Field.findById(id)

      const SerializedFields = {
        id_field: field?._id,
        name: field?.name,
        size: field?.size,
        unity: field?.unity,
        coordinates: {
          latitude: field?.coordinates.latitude,
          logitude: field?.coordinates.longitude
        },
        polygons: field?.polygons
      }

      return res.status(200).json(SerializedFields);
    } catch (err) {
      return res.status(500).json({ error: 'Unexpected error has occurred, please try again.' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const fields = await Field.create(req.body)
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async polygons(req: Request, res: Response) {
    const { id } = req.params;
    const { polygons } = req.body;

    try {

      if (!await Field.exists({ _id: id })) {
        return res.status(404).send();
      }

      await Field.updateOne({ _id:id } , {
        $set: {
          polygons
        }
      });

      return res.status(200).send()
    } catch (err) {
      return res.status(500).json({ error: 'Unexpected error has occurred, please try again.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {

      if (!await Field.exists({ _id: id })) {
        return res.status(404).send();
      }

      await Field.updateOne({ _id:id } , {
        $set: req.body
      });

      return res.status(200).send()
    } catch (err) {
      return res.status(500).json({ error: 'Unexpected error has occurred, please try again.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {

      if (!await Field.exists({ _id: id })) {
        return res.status(404).send();
      }

      await Field.remove({ _id: id });

      return res.status(200).send();
    } catch (err) {
      return res.status(500).json({ error: 'Unexpected error has occurred, please try again.' });
    }
  }

}

export default FieldsController;