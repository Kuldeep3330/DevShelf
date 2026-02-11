import multer from "multer"
import path from 'path'
import { fileURLToPath } from "url";

// ES module me __dirname ka jugaad
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")) //Relative Path use karo
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now()+path.extname(file.originalname))//Isse file ka original naam gayab ho jata hai. Debugging ke time helpful hota hai agar thoda readable ho.
    cb(null, Date.now() + "-" + file.originalname)

  }
})

const upload = multer({ storage: storage })

export default upload