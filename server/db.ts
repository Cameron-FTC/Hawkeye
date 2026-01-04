import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!uri) {
  throw new Error(
    "MONGO_URI or DATABASE_URL must be set. Did you forget to set your Mongo connection string?",
  );
}

let _client: MongoClient | null = null;
let _db: Db | null = null;

export async function initDb() {
  if (_client && _db) return { client: _client, db: _db };

  _client = new MongoClient(uri, {});
  await _client.connect();

  const dbNameFromEnv = process.env.MONGO_DB_NAME;
  let dbName = dbNameFromEnv;
  if (!dbName) {
    try {
      const parsed = new URL(uri);
      dbName = parsed.pathname?.replace(/^\//, "") || undefined;
    } catch (e) {
      dbName = "app";
    }
  }

  _db = _client.db(dbName);

  // Ensure common indexes for performance and uniqueness
  try {
    const c = _db;
    // users: unique username
    await c.collection("users").createIndex({ username: 1 }, { unique: true, sparse: true });
    // employees: index by businessId and userId
    await c.collection("employees").createIndex({ businessId: 1 });
    await c.collection("employees").createIndex({ userId: 1 }, { sparse: true });
    // clients: index by businessId and userId
    await c.collection("clients").createIndex({ businessId: 1 });
    await c.collection("clients").createIndex({ userId: 1 }, { sparse: true });
    // assets: unique barcode and qrCode if present
    await c.collection("assets").createIndex({ barcode: 1 }, { unique: true, sparse: true });
    await c.collection("assets").createIndex({ qrCode: 1 }, { unique: true, sparse: true });
    // timesheets: query active timesheets and by employee
    await c.collection("timesheets").createIndex({ employeeId: 1, clockIn: -1 });
    // jobs/invoices/todos indexes
    await c.collection("jobs").createIndex({ businessId: 1, startDate: 1 });
    await c.collection("invoices").createIndex({ jobId: 1 });
    await c.collection("invoices").createIndex({ clientId: 1 });
    await c.collection("invoices").createIndex({ businessId: 1 });
    await c.collection("todos").createIndex({ jobId: 1 });
  } catch (e) {
    // Index creation failure shouldn't block startup; log and continue
    // eslint-disable-next-line no-console
    console.warn("Warning: failed to create some indexes:", (e as Error).message);
  }

  return { client: _client, db: _db };
}

export function getClient(): MongoClient {
  if (!_client) throw new Error("Mongo client is not initialized. Call initDb() first.");
  return _client;
}

export function getDb(): Db {
  if (!_db) throw new Error("Mongo DB is not initialized. Call initDb() first.");
  return _db;
}

export async function closeDb() {
  if (_client) {
    await _client.close();
    _client = null;
    _db = null;
  }
}

export const ready = initDb();
