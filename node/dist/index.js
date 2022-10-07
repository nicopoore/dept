"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const app_data_source_1 = require("./database/app-data-source");
dotenv_1.default.config();
// establish database connection
app_data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("common"));
app.use(express_1.default.json());
// Application routes
app.use("/api", (0, index_1.default)());
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));
