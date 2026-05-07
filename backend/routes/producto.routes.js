import e from "express";
import { getAll, getOne, create, update, partialUpdate, destroy } from "../controllers/producto.controller.js";
import upload from "../config/multerconfig.js";

const router = e.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", upload.single('imagen'), create);
router.put("/:id", upload.single('imagen'), update);
router.patch("/:id", upload.single('imagen'), partialUpdate);
router.delete("/:id", destroy);

export default router;
