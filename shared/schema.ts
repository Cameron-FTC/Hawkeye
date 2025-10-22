import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const businesses = pgTable("businesses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBusinessSchema = createInsertSchema(businesses).omit({
  id: true,
  createdAt: true,
});

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  companyName: text("company_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export const locations = pgTable("locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  contactPerson: text("contact_person"),
  contactPhone: text("contact_phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
  createdAt: true,
});

export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type Location = typeof locations.$inferSelect;

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  locationId: varchar("location_id").references(() => locations.id).notNull(),
  clientId: varchar("client_id").references(() => clients.id),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export const jobAssignments = pgTable("job_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => jobs.id).notNull(),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
});

export const insertJobAssignmentSchema = createInsertSchema(jobAssignments).omit({
  id: true,
  assignedAt: true,
});

export type InsertJobAssignment = z.infer<typeof insertJobAssignmentSchema>;
export type JobAssignment = typeof jobAssignments.$inferSelect;

export const todos = pgTable("todos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => jobs.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false).notNull(),
  priority: text("priority").default("medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const insertTodoSchema = createInsertSchema(todos).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type Todo = typeof todos.$inferSelect;

export const timesheets = pgTable("timesheets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  jobId: varchar("job_id").references(() => jobs.id).notNull(),
  clockIn: timestamp("clock_in").notNull(),
  clockOut: timestamp("clock_out"),
  lunchBreakMinutes: integer("lunch_break_minutes").default(30),
  totalHours: decimal("total_hours", { precision: 5, scale: 2 }),
  billableRate: decimal("billable_rate", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTimesheetSchema = createInsertSchema(timesheets).omit({
  id: true,
  createdAt: true,
});

export type InsertTimesheet = z.infer<typeof insertTimesheetSchema>;
export type Timesheet = typeof timesheets.$inferSelect;

export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => jobs.id).notNull(),
  clientId: varchar("client_id").references(() => clients.id).notNull(),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  weekStartDate: timestamp("week_start_date").notNull(),
  weekEndDate: timestamp("week_end_date").notNull(),
  totalHours: decimal("total_hours", { precision: 8, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"),
  pdfUrl: text("pdf_url"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
  createdAt: true,
});

export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

export const assets = pgTable("assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  businessId: varchar("business_id").references(() => businesses.id).notNull(),
  locationId: varchar("location_id").references(() => locations.id),
  title: text("title").notNull(),
  customTag: text("custom_tag"),
  barcode: text("barcode").unique(),
  qrCode: text("qr_code").unique(),
  description: text("description"),
  status: text("status").notNull().default("available"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAssetSchema = createInsertSchema(assets).omit({
  id: true,
  createdAt: true,
});

export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assets.$inferSelect;

export const assetScans = pgTable("asset_scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetId: varchar("asset_id").references(() => assets.id).notNull(),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  jobId: varchar("job_id").references(() => jobs.id),
  scanType: text("scan_type").notNull(),
  notes: text("notes"),
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
});

export const insertAssetScanSchema = createInsertSchema(assetScans).omit({
  id: true,
  scannedAt: true,
});

export type InsertAssetScan = z.infer<typeof insertAssetScanSchema>;
export type AssetScan = typeof assetScans.$inferSelect;
