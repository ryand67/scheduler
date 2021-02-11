import connect from '../../util/db';

export default async (req, res) => {
    // const { db } = await connect();

    console.log(req.body);
    res.status(200);
}