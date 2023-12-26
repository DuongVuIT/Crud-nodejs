var express = require("express");
const { render } = require("express/lib/response");
var router = express.Router();

// router.use("/services", require(__dirname + "/servicescontroller"));
// router.use("/products", require(__dirname + "/productcontroller"));
// router.use("/authenticate", require(__dirname + "/api/authenticatecontroller"));

router.use("/users", require(__dirname + "/usercontroller"));
router.get("/", function (req, res) {
  res.render("index.ejs");
});
module.exports = router;
