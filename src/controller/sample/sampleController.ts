import SampleTable from "../../database/postgres/models/sampleTable";
import { redisClient } from "../../database/redis";
import { SUCCESS, successResponse } from "../../utils/express/helpers";
import { getAsync, setExAsync } from "../../utils/redis";
import { uuidGenerator } from "../../utils/uuidGenerator";

const sampleController = async (req, res, next) => {
  const { name } = req.body;
  try {
    const x = await SampleTable.create({
      name,
      email: "a@a.com",
      password: "123",
    });

    const req = await SampleTable.findAll({ where: { name } });

    const dataSet = await setExAsync({
      client: redisClient,
      key: `sampleKey:${x.id}`,
      seconds: 60,
      value: {
        name: x.name,
        value: uuidGenerator(),
      },
    });

    const rDaata = await getAsync({
      client: redisClient,
      key: `sampleKey:${x.id}`,
    });

    return successResponse(SUCCESS.fetchSuccess, { req, rDaata }, res);
  } catch (error) {
    next(error);
  }
};

export default {
  sampleController,
};
