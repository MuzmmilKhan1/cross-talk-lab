"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanceDBConfig = void 0;
const vectordb_1 = require("vectordb");
class LanceDBConfig {
    dbDirectory;
    db;
    constructor() {
        this.dbDirectory = "luancedb";
    }
    async connectDB() {
        if (!this.db) {
            this.db = await (0, vectordb_1.connect)(this.dbDirectory);
        }
    }
    async getTable(tableName) {
        await this.connectDB();
        if (!this.db) {
            throw new Error("db connection failed");
        }
        let table;
        try {
            table = await this.db.openTable(tableName);
        }
        catch (error) {
            console.log(`Table ${tableName} not found, creating...`);
            table = await this.db.createTable(tableName, [
                { vector: Array(1536), text: "sample" },
            ]);
        }
        return table;
    }
}
exports.LanceDBConfig = LanceDBConfig;
