const BaseController = require("./baseController");
const sequelize = require("sequelize");

class SightingsController extends BaseController {
  constructor(model, commentModel, likeModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.likeModel = likeModel;
    this.categoryModel = categoryModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [{ model: this.categoryModel, through: { attributes: [] } }],
        order: sequelize.col("id"),
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: [{ model: this.categoryModel, through: { attributes: [] } }],
      });
      console.log(sighting.categories);
      console.log(sighting);
      const likes = await this.likeModel.findAndCountAll({
        where: {
          sightingId: sightingId,
        },
      });
      sighting.dataValues["likes"] = likes.count;

      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addOne(req, res) {
    console.log(req.body);
    const { date, location, notes, city, country, categoryIds } = req.body;

    try {
      const newSighting = await this.model.create({
        date: date,
        locationdescription: location,
        notes: notes,
        city: city,
        country: country,
      });

      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: categoryIds,
        },
      });

      await newSighting.setCategories(selectedCategories);
      console.log("new entry:", newSighting);
      return res.json(newSighting);
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

  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
        // attributes: ["id", "content", "sighting_id", "createdAt", "updatedAt"],
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    console.log("params:", req.params);
    console.log("content:", req.body);
    try {
      const newComment = await this.commentModel.create(
        {
          content: content,
          sightingId: sightingId,
        }
        // {
        //   returning: ["id", "content", "sighting_id", "createdAt", "updatedAt"],
        // }
      );
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editComment(req, res) {
    const { content, id } = req.body;

    try {
      const updateComment = await this.commentModel.findByPk(id);
      updateComment.set({
        content: content,
      });
      await updateComment.save();
      return res.json(updateComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteComment(req, res) {
    const { id } = req.body;

    try {
      const comment = await this.commentModel.findByPk(id);
      comment.destroy();
      return res.json(comment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addLike(req, res) {
    const { sightingId } = req.params;
    console.log("didt his run?");
    try {
      const newLike = await this.likeModel.create({
        sightingId: sightingId,
      });
      const likes = await this.likeModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });

      return res.json({ likes: likes.length });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
