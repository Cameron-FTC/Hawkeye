import { db } from "./db";
import { eq, and, gte, lte, desc, sql } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  type Business,
  type InsertBusiness,
  type Employee,
  type InsertEmployee,
  type Client,
  type InsertClient,
  type Location,
  type InsertLocation,
  type Job,
  type InsertJob,
  type JobAssignment,
  type InsertJobAssignment,
  type Todo,
  type InsertTodo,
  type Timesheet,
  type InsertTimesheet,
  type Invoice,
  type InsertInvoice,
  type Asset,
  type InsertAsset,
  type AssetScan,
  type InsertAssetScan,
  users,
  businesses,
  employees,
  clients,
  locations,
  jobs,
  jobAssignments,
  todos,
  timesheets,
  invoices,
  assets,
  assetScans,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getBusiness(id: string): Promise<Business | undefined>;
  getAllBusinesses(): Promise<Business[]>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business | undefined>;
  
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployeesByBusiness(businessId: string): Promise<Employee[]>;
  getEmployeeByUserId(userId: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<boolean>;
  
  getClient(id: string): Promise<Client | undefined>;
  getClientsByBusiness(businessId: string): Promise<Client[]>;
  getClientByUserId(userId: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  
  getLocation(id: string): Promise<Location | undefined>;
  getLocationsByBusiness(businessId: string): Promise<Location[]>;
  createLocation(location: InsertLocation): Promise<Location>;
  updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location | undefined>;
  deleteLocation(id: string): Promise<boolean>;
  
  getJob(id: string): Promise<Job | undefined>;
  getJobsByBusiness(businessId: string): Promise<Job[]>;
  getJobsByClient(clientId: string): Promise<Job[]>;
  getJobsByDateRange(businessId: string, startDate: Date, endDate: Date): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;
  
  getJobAssignment(id: string): Promise<JobAssignment | undefined>;
  getJobAssignmentsByJob(jobId: string): Promise<JobAssignment[]>;
  getJobAssignmentsByEmployee(employeeId: string): Promise<JobAssignment[]>;
  createJobAssignment(assignment: InsertJobAssignment): Promise<JobAssignment>;
  deleteJobAssignment(id: string): Promise<boolean>;
  
  getTodo(id: string): Promise<Todo | undefined>;
  getTodosByJob(jobId: string): Promise<Todo[]>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, todo: Partial<InsertTodo>): Promise<Todo | undefined>;
  deleteTodo(id: string): Promise<boolean>;
  
  getTimesheet(id: string): Promise<Timesheet | undefined>;
  getTimesheetsByEmployee(employeeId: string): Promise<Timesheet[]>;
  getTimesheetsByJob(jobId: string): Promise<Timesheet[]>;
  getTimesheetsByDateRange(jobId: string, startDate: Date, endDate: Date): Promise<Timesheet[]>;
  getActiveTimesheet(employeeId: string): Promise<Timesheet | undefined>;
  createTimesheet(timesheet: InsertTimesheet): Promise<Timesheet>;
  updateTimesheet(id: string, timesheet: Partial<InsertTimesheet>): Promise<Timesheet | undefined>;
  deleteTimesheet(id: string): Promise<boolean>;
  
  getInvoice(id: string): Promise<Invoice | undefined>;
  getInvoicesByJob(jobId: string): Promise<Invoice[]>;
  getInvoicesByClient(clientId: string): Promise<Invoice[]>;
  getInvoicesByBusiness(businessId: string): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: string): Promise<boolean>;
  
  getAsset(id: string): Promise<Asset | undefined>;
  getAssetsByBusiness(businessId: string): Promise<Asset[]>;
  getAssetsByLocation(locationId: string): Promise<Asset[]>;
  getAssetByBarcode(barcode: string): Promise<Asset | undefined>;
  getAssetByQRCode(qrCode: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: string, asset: Partial<InsertAsset>): Promise<Asset | undefined>;
  deleteAsset(id: string): Promise<boolean>;
  
  getAssetScan(id: string): Promise<AssetScan | undefined>;
  getAssetScansByAsset(assetId: string): Promise<AssetScan[]>;
  getAssetScansByEmployee(employeeId: string): Promise<AssetScan[]>;
  createAssetScan(scan: InsertAssetScan): Promise<AssetScan>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getBusiness(id: string): Promise<Business | undefined> {
    const result = await db.select().from(businesses).where(eq(businesses.id, id)).limit(1);
    return result[0];
  }

  async getAllBusinesses(): Promise<Business[]> {
    return await db.select().from(businesses).orderBy(desc(businesses.createdAt));
  }

  async createBusiness(business: InsertBusiness): Promise<Business> {
    const result = await db.insert(businesses).values(business).returning();
    return result[0];
  }

  async updateBusiness(id: string, business: Partial<InsertBusiness>): Promise<Business | undefined> {
    const result = await db.update(businesses).set(business).where(eq(businesses.id, id)).returning();
    return result[0];
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    const result = await db.select().from(employees).where(eq(employees.id, id)).limit(1);
    return result[0];
  }

  async getEmployeesByBusiness(businessId: string): Promise<Employee[]> {
    return await db.select().from(employees).where(eq(employees.businessId, businessId)).orderBy(desc(employees.createdAt));
  }

  async getEmployeeByUserId(userId: string): Promise<Employee | undefined> {
    const result = await db.select().from(employees).where(eq(employees.userId, userId)).limit(1);
    return result[0];
  }

  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const result = await db.insert(employees).values(employee).returning();
    return result[0];
  }

  async updateEmployee(id: string, employee: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const result = await db.update(employees).set(employee).where(eq(employees.id, id)).returning();
    return result[0];
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const result = await db.delete(employees).where(eq(employees.id, id)).returning();
    return result.length > 0;
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
    return result[0];
  }

  async getClientsByBusiness(businessId: string): Promise<Client[]> {
    return await db.select().from(clients).where(eq(clients.businessId, businessId)).orderBy(desc(clients.createdAt));
  }

  async getClientByUserId(userId: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.userId, userId)).limit(1);
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await db.update(clients).set(client).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  async getLocation(id: string): Promise<Location | undefined> {
    const result = await db.select().from(locations).where(eq(locations.id, id)).limit(1);
    return result[0];
  }

  async getLocationsByBusiness(businessId: string): Promise<Location[]> {
    return await db.select().from(locations).where(eq(locations.businessId, businessId)).orderBy(desc(locations.createdAt));
  }

  async createLocation(location: InsertLocation): Promise<Location> {
    const result = await db.insert(locations).values(location).returning();
    return result[0];
  }

  async updateLocation(id: string, location: Partial<InsertLocation>): Promise<Location | undefined> {
    const result = await db.update(locations).set(location).where(eq(locations.id, id)).returning();
    return result[0];
  }

  async deleteLocation(id: string): Promise<boolean> {
    const result = await db.delete(locations).where(eq(locations.id, id)).returning();
    return result.length > 0;
  }

  async getJob(id: string): Promise<Job | undefined> {
    const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    return result[0];
  }

  async getJobsByBusiness(businessId: string): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.businessId, businessId)).orderBy(desc(jobs.createdAt));
  }

  async getJobsByClient(clientId: string): Promise<Job[]> {
    return await db.select().from(jobs).where(eq(jobs.clientId, clientId)).orderBy(desc(jobs.createdAt));
  }

  async getJobsByDateRange(businessId: string, startDate: Date, endDate: Date): Promise<Job[]> {
    return await db.select().from(jobs)
      .where(
        and(
          eq(jobs.businessId, businessId),
          gte(jobs.startDate, startDate),
          lte(jobs.startDate, endDate)
        )
      )
      .orderBy(jobs.startDate);
  }

  async createJob(job: InsertJob): Promise<Job> {
    const result = await db.insert(jobs).values(job).returning();
    return result[0];
  }

  async updateJob(id: string, job: Partial<InsertJob>): Promise<Job | undefined> {
    const result = await db.update(jobs).set(job).where(eq(jobs.id, id)).returning();
    return result[0];
  }

  async deleteJob(id: string): Promise<boolean> {
    const result = await db.delete(jobs).where(eq(jobs.id, id)).returning();
    return result.length > 0;
  }

  async getJobAssignment(id: string): Promise<JobAssignment | undefined> {
    const result = await db.select().from(jobAssignments).where(eq(jobAssignments.id, id)).limit(1);
    return result[0];
  }

  async getJobAssignmentsByJob(jobId: string): Promise<JobAssignment[]> {
    return await db.select().from(jobAssignments).where(eq(jobAssignments.jobId, jobId));
  }

  async getJobAssignmentsByEmployee(employeeId: string): Promise<JobAssignment[]> {
    return await db.select().from(jobAssignments).where(eq(jobAssignments.employeeId, employeeId));
  }

  async createJobAssignment(assignment: InsertJobAssignment): Promise<JobAssignment> {
    const result = await db.insert(jobAssignments).values(assignment).returning();
    return result[0];
  }

  async deleteJobAssignment(id: string): Promise<boolean> {
    const result = await db.delete(jobAssignments).where(eq(jobAssignments.id, id)).returning();
    return result.length > 0;
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    const result = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return result[0];
  }

  async getTodosByJob(jobId: string): Promise<Todo[]> {
    return await db.select().from(todos).where(eq(todos.jobId, jobId)).orderBy(desc(todos.createdAt));
  }

  async createTodo(todo: InsertTodo): Promise<Todo> {
    const result = await db.insert(todos).values(todo).returning();
    return result[0];
  }

  async updateTodo(id: string, todo: Partial<InsertTodo>): Promise<Todo | undefined> {
    const result = await db.update(todos).set(todo).where(eq(todos.id, id)).returning();
    return result[0];
  }

  async deleteTodo(id: string): Promise<boolean> {
    const result = await db.delete(todos).where(eq(todos.id, id)).returning();
    return result.length > 0;
  }

  async getTimesheet(id: string): Promise<Timesheet | undefined> {
    const result = await db.select().from(timesheets).where(eq(timesheets.id, id)).limit(1);
    return result[0];
  }

  async getTimesheetsByEmployee(employeeId: string): Promise<Timesheet[]> {
    return await db.select().from(timesheets).where(eq(timesheets.employeeId, employeeId)).orderBy(desc(timesheets.clockIn));
  }

  async getTimesheetsByJob(jobId: string): Promise<Timesheet[]> {
    return await db.select().from(timesheets).where(eq(timesheets.jobId, jobId)).orderBy(desc(timesheets.clockIn));
  }

  async getTimesheetsByDateRange(jobId: string, startDate: Date, endDate: Date): Promise<Timesheet[]> {
    return await db.select().from(timesheets)
      .where(
        and(
          eq(timesheets.jobId, jobId),
          gte(timesheets.clockIn, startDate),
          lte(timesheets.clockIn, endDate)
        )
      )
      .orderBy(timesheets.clockIn);
  }

  async getActiveTimesheet(employeeId: string): Promise<Timesheet | undefined> {
    const result = await db.select().from(timesheets)
      .where(
        and(
          eq(timesheets.employeeId, employeeId),
          sql`${timesheets.clockOut} IS NULL`
        )
      )
      .limit(1);
    return result[0];
  }

  async createTimesheet(timesheet: InsertTimesheet): Promise<Timesheet> {
    const result = await db.insert(timesheets).values(timesheet).returning();
    return result[0];
  }

  async updateTimesheet(id: string, timesheet: Partial<InsertTimesheet>): Promise<Timesheet | undefined> {
    const result = await db.update(timesheets).set(timesheet).where(eq(timesheets.id, id)).returning();
    return result[0];
  }

  async deleteTimesheet(id: string): Promise<boolean> {
    const result = await db.delete(timesheets).where(eq(timesheets.id, id)).returning();
    return result.length > 0;
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
    return result[0];
  }

  async getInvoicesByJob(jobId: string): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.jobId, jobId)).orderBy(desc(invoices.createdAt));
  }

  async getInvoicesByClient(clientId: string): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.clientId, clientId)).orderBy(desc(invoices.createdAt));
  }

  async getInvoicesByBusiness(businessId: string): Promise<Invoice[]> {
    return await db.select().from(invoices).where(eq(invoices.businessId, businessId)).orderBy(desc(invoices.createdAt));
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const result = await db.insert(invoices).values(invoice).returning();
    return result[0];
  }

  async updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const result = await db.update(invoices).set(invoice).where(eq(invoices.id, id)).returning();
    return result[0];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    const result = await db.delete(invoices).where(eq(invoices.id, id)).returning();
    return result.length > 0;
  }

  async getAsset(id: string): Promise<Asset | undefined> {
    const result = await db.select().from(assets).where(eq(assets.id, id)).limit(1);
    return result[0];
  }

  async getAssetsByBusiness(businessId: string): Promise<Asset[]> {
    return await db.select().from(assets).where(eq(assets.businessId, businessId)).orderBy(desc(assets.createdAt));
  }

  async getAssetsByLocation(locationId: string): Promise<Asset[]> {
    return await db.select().from(assets).where(eq(assets.locationId, locationId)).orderBy(desc(assets.createdAt));
  }

  async getAssetByBarcode(barcode: string): Promise<Asset | undefined> {
    const result = await db.select().from(assets).where(eq(assets.barcode, barcode)).limit(1);
    return result[0];
  }

  async getAssetByQRCode(qrCode: string): Promise<Asset | undefined> {
    const result = await db.select().from(assets).where(eq(assets.qrCode, qrCode)).limit(1);
    return result[0];
  }

  async createAsset(asset: InsertAsset): Promise<Asset> {
    const result = await db.insert(assets).values(asset).returning();
    return result[0];
  }

  async updateAsset(id: string, asset: Partial<InsertAsset>): Promise<Asset | undefined> {
    const result = await db.update(assets).set(asset).where(eq(assets.id, id)).returning();
    return result[0];
  }

  async deleteAsset(id: string): Promise<boolean> {
    const result = await db.delete(assets).where(eq(assets.id, id)).returning();
    return result.length > 0;
  }

  async getAssetScan(id: string): Promise<AssetScan | undefined> {
    const result = await db.select().from(assetScans).where(eq(assetScans.id, id)).limit(1);
    return result[0];
  }

  async getAssetScansByAsset(assetId: string): Promise<AssetScan[]> {
    return await db.select().from(assetScans).where(eq(assetScans.assetId, assetId)).orderBy(desc(assetScans.scannedAt));
  }

  async getAssetScansByEmployee(employeeId: string): Promise<AssetScan[]> {
    return await db.select().from(assetScans).where(eq(assetScans.employeeId, employeeId)).orderBy(desc(assetScans.scannedAt));
  }

  async createAssetScan(scan: InsertAssetScan): Promise<AssetScan> {
    const result = await db.insert(assetScans).values(scan).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
