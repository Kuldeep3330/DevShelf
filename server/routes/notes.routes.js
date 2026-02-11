import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import Note from "../models/Note.js";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        /**
     * const note = new Note({
        title: "My first note",
        content: "Hello",
        user: req.userId   // 👈 logged-in user ka ID
});
     */
        const { title, content } = req.body
        const note = new Note({ title, content, file: req.file ? req.file.filename : null, user: req.userId })
        await note.save();
        res.status(201).json(note);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating note" });
    }
})

//get notes with pagination
//GET /api/notes?page=2&limit=5
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit // 0 5 10

        const notes = await Note.find({ user: req.userId }).skip(skip).limit(limit)
        res.json(notes)
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes" });
    }

})
export default router;