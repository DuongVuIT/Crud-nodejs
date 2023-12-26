var express = require("express");
const { ObjectId } = require("mongodb");
var router = express.Router();
var User = require("./../model/user");
var UserService = require("./../services/userService");

// router.get("/", function (req, res) {
//   res.render("products.ejs");
// });

router.get("/user-list", async function (req, res) {
  const userService = new UserService();
  const userList = await userService.getUserList();
  res.json(userList);
});
router.get("/get-user", async function (req, res) {
  var userService = new UserService();
  var user = await userService.getUser(req.query.id);
  res.json(user);
});

router.post("/insert-user", async function (req, res) {
  const { Name, Position, Office, Age, Date } = req.body;
  var userService = new UserService();
  var user = new User();
  user.Name = Name;
  user.Position = Position;
  user.Age = Age;
  user.Office = Office;
  user.Date = Date;
  var result = await userService.insertUser(user);
  res.json({ status: true, message: "" });
});

router.put("/update-user/:id", async function (req, res) {
  try {
    const userService = new UserService();
    const user = new User();
    user._id = new ObjectId(req.params.id);
    user.Name = req.body.Name;
    user.Position = req.body.Position;
    user.Age = req.body.Age;
    user.Office = req.body.Office;
    user.Date = req.body.Date;

    await userService.updateUser(user);
    res.json({ status: true, message: "User updated successfully" });
  } catch (error) {
    console.error("There was an error updating the user:", error);
    res.status(500).json({ status: false, message: "Failed to update user" });
  }
});
router.delete("/delete-user/:id", async function (req, res) {
  var userService = new UserService();
  await userService.deleteUser(req.params.id);
  res.json({ status: true, message: "" });
});
// router.post(
//   "/upload-image",
//   verifyToken,
//   multer.single("image"),
//   async function (req, res) {
//     const { file } = req;
//     if (!file) return res.status(401).json({ error: "Image file is missing" });
//     const { secure_url: url } = await cloudinary.v2.uploader.upload(file.path);

//     res.status(201).json({ image: url });
//   }
// );
module.exports = router;
