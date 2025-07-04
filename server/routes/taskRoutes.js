const router = require("express").Router();
const auth = require("../middleware/authMiddlware");
const { getTasks, createTask } = require("../controllers/taskController");

router.use(auth);
router.get("/:boardId", getTasks);
router.post("/:boardId", createTask);

module.exports = router;
