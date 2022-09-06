const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addOne(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newEntry = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        date: date,
        location: location,
        notes: notes,
      });
      return res.json(newEntry);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editOne(req, res) {
    const id = req.params.sightingId;
    const { date, location, notes } = req.body;

    try {
      const updateSighting = await this.model.findByPk(id);
      updateSighting.set({
        updated_at: new Date(),
        date: date,
        location: location,
        notes: notes,
      });
      await updateSighting.save();
      return res.json(updateSighting);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
