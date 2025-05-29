"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Working.....");
});
app.use("/api/auth", authRoute_1.default);
app.listen(PORT, () => {
    console.log("Server is Running on port " + PORT);
});
