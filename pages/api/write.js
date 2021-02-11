import connect from '../../util/db';

export default async (req, res) => {
    const { db } = await connect();
    try {
        const result = await db.collection('dates').insertOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}