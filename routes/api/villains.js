const express = require("express");
const router = express.Router();
const Villain = require("../../models/Villain");

// ROUTES:

// GETS BACK ALL THE VILLAINS
router.get("/", async (req, res) => {
  try {
    const villains = await Villain.find();
    res.json(villains);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMITS A VILLAIN
router.post("/", async (req, res) => {
  const villain = new Villain({
    name: req.body.name,
    description: req.body.description,
    power: req.body.power,
    identity: req.body.identity,
    enemy: req.body.enemy,
    picture: req.body.picture,
    secondpicture: req.body.secondpicture,
    enemypicture: req.body.enemypicture,
  });
  try {
    const savedVillain = await villain.save();
    res.json(savedVillain);
  } catch (err) {
    res.json({ message: err });
  }
});

// GETS BACK A SPECIFIC VILLAIN
router.get("/:villainId", async (req, res) => {
  try {
    const villain = await Villain.findById(req.params.villainId);
    res.json(villain);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC VILLAIN
router.delete("/:villainId", async (req, res) => {
  try {
    const removedVillain = await Villain.remove({ _id: req.params.villainId });
    res.json(removedVillain);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE VILLAIN'S INFORMATION
router.patch("/:villainId", async (req, res) => {
  try {
    const updatedVillain = await Villain.updateOne(
      { _id: req.params.villainId },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          power: req.body.power,
          universe: req.body.universe,
          enemy: req.body.enemy,
          picture: req.body.picture,
        },
      }
    );
    res.json(updatedVillain);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
