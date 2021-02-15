import connect from '../../util/db';
import { ObjectId } from 'mongodb';

export default async (req, res) => {

    const { db } = await connect();
    const id = req.query.id;

    try {
        const result = await db.collection('dates').deleteOne({ _id: ObjectId(id)})
        res.json(result);
    } catch (error) {
        res.status(600).json(error);
    }
}