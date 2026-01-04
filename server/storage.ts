import { ObjectId } from "mongodb";
import { getDb } from "./db"; // adjust import if your db helper is named differently

export type User = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: "employee" | "manager" | "client" | "admin";
  businessId?: string | null;
  businessName?: string | null;
  createdAt?: Date;
};

// create a new user (saves to employees or clients based on role)
export async function createUser(user: Partial<User> & { role: User["role"] }) {
  const db = await getDb();
  const collection = user.role === "client" ? db.collection("clients") : db.collection("employees");
  const doc = {
    name: user.name,
    email: user.email,
    phone: user.phone ?? null,
    role: user.role,
    businessId: user.businessId ?? null,
    businessName: user.businessName ?? null,
    createdAt: new Date(),
  };
  const result = await collection.insertOne(doc);
  return { id: result.insertedId.toString(), ...doc };
}

// update a user by id (searches employees then clients)
export async function updateUser(id: string, updates: Partial<User>) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const employees = db.collection("employees");
  const clients = db.collection("clients");

  const emp = await employees.findOneAndUpdate({ _id }, { $set: updates }, { returnDocument: "after" as any });
  if (emp.value) {
    const v = emp.value;
    return { id: v._id.toString(), ...v };
  }

  const cli = await clients.findOneAndUpdate({ _id }, { $set: updates }, { returnDocument: "after" as any });
  if (cli.value) {
    const v = cli.value;
    return { id: v._id.toString(), ...v };
  }

  return null;
}

// delete a user by id (searches employees then clients)
export async function deleteUser(id: string) {
  const db = await getDb();
  const _id = new ObjectId(id);
  const employees = db.collection("employees");
  const clients = db.collection("clients");

  const r1 = await employees.deleteOne({ _id });
  if (r1.deletedCount && r1.deletedCount > 0) return true;

  const r2 = await clients.deleteOne({ _id });
  return !!(r2.deletedCount && r2.deletedCount > 0);
}

export const storage = {
  // existing user helpers
  createUser,
  updateUser,
  deleteUser,

  // stubs for other storage methods referenced by routes.ts
  // implement these as needed in this file or replace with real implementations
  getEmployeesByBusiness: async (..._args: any[]) => { throw new Error("getEmployeesByBusiness not implemented"); },
  getEmployee: async (..._args: any[]) => { throw new Error("getEmployee not implemented"); },
  createEmployee: async (..._args: any[]) => { throw new Error("createEmployee not implemented"); },
  updateEmployee: async (..._args: any[]) => { throw new Error("updateEmployee not implemented"); },
  deleteEmployee: async (..._args: any[]) => { throw new Error("deleteEmployee not implemented"); },

  getClientsByBusiness: async (..._args: any[]) => { throw new Error("getClientsByBusiness not implemented"); },
  createClient: async (..._args: any[]) => { throw new Error("createClient not implemented"); },

  getLocationsByBusiness: async (..._args: any[]) => { throw new Error("getLocationsByBusiness not implemented"); },
  createLocation: async (..._args: any[]) => { throw new Error("createLocation not implemented"); },

  getJobsByClient: async (..._args: any[]) => { throw new Error("getJobsByClient not implemented"); },
  getJobsByBusiness: async (..._args: any[]) => { throw new Error("getJobsByBusiness not implemented"); },
  getJob: async (..._args: any[]) => { throw new Error("getJob not implemented"); },
  createJob: async (..._args: any[]) => { throw new Error("createJob not implemented"); },
  updateJob: async (..._args: any[]) => { throw new Error("updateJob not implemented"); },

  getJobAssignmentsByJob: async (..._args: any[]) => { throw new Error("getJobAssignmentsByJob not implemented"); },
  getJobAssignmentsByEmployee: async (..._args: any[]) => { throw new Error("getJobAssignmentsByEmployee not implemented"); },
  createJobAssignment: async (..._args: any[]) => { throw new Error("createJobAssignment not implemented"); },
  deleteJobAssignment: async (..._args: any[]) => { throw new Error("deleteJobAssignment not implemented"); },

  getTodosByJob: async (..._args: any[]) => { throw new Error("getTodosByJob not implemented"); },
  createTodo: async (..._args: any[]) => { throw new Error("createTodo not implemented"); },
  updateTodo: async (..._args: any[]) => { throw new Error("updateTodo not implemented"); },
  deleteTodo: async (..._args: any[]) => { throw new Error("deleteTodo not implemented"); },

  getTimesheetsByEmployee: async (..._args: any[]) => { throw new Error("getTimesheetsByEmployee not implemented"); },
  getTimesheetsByJob: async (..._args: any[]) => { throw new Error("getTimesheetsByJob not implemented"); },
  getActiveTimesheet: async (..._args: any[]) => { throw new Error("getActiveTimesheet not implemented"); },
  createTimesheet: async (..._args: any[]) => { throw new Error("createTimesheet not implemented"); },
  updateTimesheet: async (..._args: any[]) => { throw new Error("updateTimesheet not implemented"); },
  getTimesheetsByDateRange: async (..._args: any[]) => { throw new Error("getTimesheetsByDateRange not implemented"); },

  getInvoicesByJob: async (..._args: any[]) => { throw new Error("getInvoicesByJob not implemented"); },
  getInvoicesByClient: async (..._args: any[]) => { throw new Error("getInvoicesByClient not implemented"); },
  getInvoicesByBusiness: async (..._args: any[]) => { throw new Error("getInvoicesByBusiness not implemented"); },
  createInvoice: async (..._args: any[]) => { throw new Error("createInvoice not implemented"); },
  updateInvoice: async (..._args: any[]) => { throw new Error("updateInvoice not implemented"); },

  getAssetsByLocation: async (..._args: any[]) => { throw new Error("getAssetsByLocation not implemented"); },
  getAssetsByBusiness: async (..._args: any[]) => { throw new Error("getAssetsByBusiness not implemented"); },
  getAssetByBarcode: async (..._args: any[]) => { throw new Error("getAssetByBarcode not implemented"); },
  getAssetByQRCode: async (..._args: any[]) => { throw new Error("getAssetByQRCode not implemented"); },
  createAsset: async (..._args: any[]) => { throw new Error("createAsset not implemented"); },
  updateAsset: async (..._args: any[]) => { throw new Error("updateAsset not implemented"); },

  getAllUsers: async (..._args: any[]) => { throw new Error("getAllUsers not implemented"); },

  getAssetScansByAsset: async (..._args: any[]) => { throw new Error("getAssetScansByAsset not implemented"); },
  getAssetScansByEmployee: async (..._args: any[]) => { throw new Error("getAssetScansByEmployee not implemented"); },
  createAssetScan: async (..._args: any[]) => { throw new Error("createAssetScan not implemented"); },
};