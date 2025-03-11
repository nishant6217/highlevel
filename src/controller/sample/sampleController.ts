import SampleTable from "../../database/postgres/models/sampleTable";
import { SUCCESS, successResponse } from "../../utils/express/helpers";

const sampleController = async (req, res, next) => {
  const { name } = req.body;
  try {
    const x = await SampleTable.create({
      name,
      email: "a@a.com",
      password: "123",
    });

    const req = await SampleTable.findAll({ where: { name } });
    return successResponse(SUCCESS.fetchSuccess, { req }, res);
  } catch (error) {
    next(error);
  }
};

export default {
  sampleController,
};
