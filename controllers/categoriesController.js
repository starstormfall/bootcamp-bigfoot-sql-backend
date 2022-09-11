const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async insertOne(req, res) {
    try {
      const data = { ...req.body };
      console.log(data);
      let categories = Object.values(data);
      const output = await this.model.bulkCreate(categories);
      console.log(output);
      let newIds = [];
      for (let cat of output) {
        newIds.push(cat.dataValues.id);
      }

      return res.json(newIds);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
module.exports = CategoriesController;
