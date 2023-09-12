import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import multer from 'multer';
import helmet from 'helmet';
import path from 'path';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import peepRoutes from './routes/peeps.js';
import { fileURLToPath } from 'url';
import {register} from './controllers/auth.js';
import { createPeep } from './controllers/peeps.js';
import { verifyToken } from './middleware/auth.js';

import User from "./models/User.js";
import Peep from "./models/Peep.js";
import {users, peeps} from "./data/fakeData.js"


const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

/* Routes with files*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/peeps",verifyToken,upload.single("picture"),createPeep);

/* Routes*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/peeps", peepRoutes);

/* Mongoose SetUp*/

const PORT = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    // Only start the server if we are not in a test environment
    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }

    // Uncomment these lines if you want to insert data
    // User.insertMany(users);
    // Peep.insertMany(peeps);
}).catch((err) => {
    console.log(err);
});

// Export the app for testing
export default app;