const router = require("express").Router();
const auth = require("../middleware/authMiddlware");
const {
  getBoards,
  createBoard,
  renameBoard,
  deleteBoard,
} = require("../controllers/boardController");

router.use(auth);
router.get("/", getBoards);
router.post("/", createBoard);
router.put("/:id", renameBoard);
router.delete("/:id", deleteBoard);

module.exports = router;
    