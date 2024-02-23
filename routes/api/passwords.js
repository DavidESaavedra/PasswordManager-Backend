import express from "express";
const router = express.Router();
import passwords from "../../controllers/passwordsController.js";

router.route("/entries").post(passwords.handleEntries);
router.route("/add").post(passwords.handleAdd);
router.route("/edit").put(passwords.handleEdit);
router.route("/delete/:key").delete(passwords.handleDelete);

export default router;
