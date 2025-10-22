import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmployeeSchema, insertClientSchema, insertLocationSchema, insertJobSchema, insertJobAssignmentSchema, insertTodoSchema, insertTimesheetSchema, insertInvoiceSchema, insertAssetSchema, insertAssetScanSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ===== EMPLOYEES =====
  app.get("/api/employees", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      if (!businessId) {
        return res.status(400).json({ error: "businessId is required" });
      }
      const employees = await storage.getEmployeesByBusiness(businessId);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employees" });
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch employee" });
    }
  });

  app.post("/api/employees", async (req, res) => {
    try {
      const data = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee(data);
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create employee" });
    }
  });

  app.patch("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.updateEmployee(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: "Failed to update employee" });
    }
  });

  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const success = await storage.deleteEmployee(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete employee" });
    }
  });

  // ===== CLIENTS =====
  app.get("/api/clients", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      if (!businessId) {
        return res.status(400).json({ error: "businessId is required" });
      }
      const clients = await storage.getClientsByBusiness(businessId);
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const data = insertClientSchema.parse(req.body);
      const client = await storage.createClient(data);
      res.status(201).json(client);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create client" });
    }
  });

  // ===== LOCATIONS =====
  app.get("/api/locations", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      if (!businessId) {
        return res.status(400).json({ error: "businessId is required" });
      }
      const locations = await storage.getLocationsByBusiness(businessId);
      res.json(locations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/api/locations", async (req, res) => {
    try {
      const data = insertLocationSchema.parse(req.body);
      const location = await storage.createLocation(data);
      res.status(201).json(location);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create location" });
    }
  });

  // ===== JOBS =====
  app.get("/api/jobs", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      const clientId = req.query.clientId as string;
      
      if (clientId) {
        const jobs = await storage.getJobsByClient(clientId);
        return res.json(jobs);
      }
      
      if (businessId) {
        const jobs = await storage.getJobsByBusiness(businessId);
        return res.json(jobs);
      }
      
      return res.status(400).json({ error: "businessId or clientId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const data = insertJobSchema.parse(req.body);
      const job = await storage.createJob(data);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create job" });
    }
  });

  app.patch("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.updateJob(req.params.id, req.body);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: "Failed to update job" });
    }
  });

  // ===== JOB ASSIGNMENTS =====
  app.get("/api/job-assignments", async (req, res) => {
    try {
      const jobId = req.query.jobId as string;
      const employeeId = req.query.employeeId as string;
      
      if (jobId) {
        const assignments = await storage.getJobAssignmentsByJob(jobId);
        return res.json(assignments);
      }
      
      if (employeeId) {
        const assignments = await storage.getJobAssignmentsByEmployee(employeeId);
        return res.json(assignments);
      }
      
      return res.status(400).json({ error: "jobId or employeeId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job assignments" });
    }
  });

  app.post("/api/job-assignments", async (req, res) => {
    try {
      const data = insertJobAssignmentSchema.parse(req.body);
      const assignment = await storage.createJobAssignment(data);
      res.status(201).json(assignment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create job assignment" });
    }
  });

  app.delete("/api/job-assignments/:id", async (req, res) => {
    try {
      const success = await storage.deleteJobAssignment(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Job assignment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete job assignment" });
    }
  });

  // ===== TODOS =====
  app.get("/api/todos", async (req, res) => {
    try {
      const jobId = req.query.jobId as string;
      if (!jobId) {
        return res.status(400).json({ error: "jobId is required" });
      }
      const todos = await storage.getTodosByJob(jobId);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  });

  app.post("/api/todos", async (req, res) => {
    try {
      const data = insertTodoSchema.parse(req.body);
      const todo = await storage.createTodo(data);
      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create todo" });
    }
  });

  app.patch("/api/todos/:id", async (req, res) => {
    try {
      const todo = await storage.updateTodo(req.params.id, req.body);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to update todo" });
    }
  });

  app.delete("/api/todos/:id", async (req, res) => {
    try {
      const success = await storage.deleteTodo(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete todo" });
    }
  });

  // ===== TIMESHEETS =====
  app.get("/api/timesheets", async (req, res) => {
    try {
      const employeeId = req.query.employeeId as string;
      const jobId = req.query.jobId as string;
      
      if (employeeId) {
        const timesheets = await storage.getTimesheetsByEmployee(employeeId);
        return res.json(timesheets);
      }
      
      if (jobId) {
        const timesheets = await storage.getTimesheetsByJob(jobId);
        return res.json(timesheets);
      }
      
      return res.status(400).json({ error: "employeeId or jobId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timesheets" });
    }
  });

  app.get("/api/timesheets/active/:employeeId", async (req, res) => {
    try {
      const timesheet = await storage.getActiveTimesheet(req.params.employeeId);
      res.json(timesheet || null);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active timesheet" });
    }
  });

  app.post("/api/timesheets", async (req, res) => {
    try {
      const data = insertTimesheetSchema.parse(req.body);
      const timesheet = await storage.createTimesheet(data);
      res.status(201).json(timesheet);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create timesheet" });
    }
  });

  app.patch("/api/timesheets/:id", async (req, res) => {
    try {
      const timesheet = await storage.updateTimesheet(req.params.id, req.body);
      if (!timesheet) {
        return res.status(404).json({ error: "Timesheet not found" });
      }
      res.json(timesheet);
    } catch (error) {
      res.status(500).json({ error: "Failed to update timesheet" });
    }
  });

  // Clock in endpoint
  app.post("/api/timesheets/clock-in", async (req, res) => {
    try {
      const { employeeId, jobId, billableRate } = req.body;
      
      if (!employeeId || !jobId) {
        return res.status(400).json({ error: "employeeId and jobId are required" });
      }
      
      // Check if there's already an active timesheet
      const activeTimesheet = await storage.getActiveTimesheet(employeeId);
      if (activeTimesheet) {
        return res.status(400).json({ error: "Already clocked in" });
      }
      
      const timesheet = await storage.createTimesheet({
        employeeId,
        jobId,
        clockIn: new Date(),
        billableRate,
        status: "pending",
      });
      
      res.status(201).json(timesheet);
    } catch (error) {
      res.status(500).json({ error: "Failed to clock in" });
    }
  });

  // Clock out endpoint
  app.post("/api/timesheets/clock-out", async (req, res) => {
    try {
      const { employeeId, lunchBreakMinutes } = req.body;
      
      if (!employeeId) {
        return res.status(400).json({ error: "employeeId is required" });
      }
      
      const activeTimesheet = await storage.getActiveTimesheet(employeeId);
      if (!activeTimesheet) {
        return res.status(400).json({ error: "No active timesheet found" });
      }
      
      const clockOut = new Date();
      const clockIn = new Date(activeTimesheet.clockIn);
      const totalMinutes = Math.floor((clockOut.getTime() - clockIn.getTime()) / 1000 / 60);
      const lunchMinutes = lunchBreakMinutes || 30;
      const totalHours = ((totalMinutes - lunchMinutes) / 60).toFixed(2);
      
      const timesheet = await storage.updateTimesheet(activeTimesheet.id, {
        clockOut,
        lunchBreakMinutes: lunchMinutes,
        totalHours,
      });
      
      res.json(timesheet);
    } catch (error) {
      res.status(500).json({ error: "Failed to clock out" });
    }
  });

  // ===== INVOICES =====
  app.get("/api/invoices", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      const clientId = req.query.clientId as string;
      const jobId = req.query.jobId as string;
      
      if (jobId) {
        const invoices = await storage.getInvoicesByJob(jobId);
        return res.json(invoices);
      }
      
      if (clientId) {
        const invoices = await storage.getInvoicesByClient(clientId);
        return res.json(invoices);
      }
      
      if (businessId) {
        const invoices = await storage.getInvoicesByBusiness(businessId);
        return res.json(invoices);
      }
      
      return res.status(400).json({ error: "businessId, clientId, or jobId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", async (req, res) => {
    try {
      const data = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(data);
      res.status(201).json(invoice);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create invoice" });
    }
  });

  app.patch("/api/invoices/:id", async (req, res) => {
    try {
      const invoice = await storage.updateInvoice(req.params.id, req.body);
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }
      res.json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to update invoice" });
    }
  });

  // Generate invoice for a job/week
  app.post("/api/invoices/generate", async (req, res) => {
    try {
      const { jobId, weekStartDate, weekEndDate } = req.body;
      
      if (!jobId || !weekStartDate || !weekEndDate) {
        return res.status(400).json({ error: "jobId, weekStartDate, and weekEndDate are required" });
      }
      
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      
      if (!job.clientId) {
        return res.status(400).json({ error: "Job has no client assigned" });
      }
      
      const startDate = new Date(weekStartDate);
      const endDate = new Date(weekEndDate);
      
      const timesheets = await storage.getTimesheetsByDateRange(jobId, startDate, endDate);
      
      let totalHours = 0;
      let totalAmount = 0;
      
      for (const timesheet of timesheets) {
        const hours = parseFloat(timesheet.totalHours || "0");
        const rate = parseFloat(timesheet.billableRate || "0");
        totalHours += hours;
        totalAmount += hours * rate;
      }
      
      // Generate invoice number
      const invoiceNumber = `INV-${Date.now()}`;
      
      const invoice = await storage.createInvoice({
        jobId,
        clientId: job.clientId,
        businessId: job.businessId,
        invoiceNumber,
        weekStartDate: startDate,
        weekEndDate: endDate,
        totalHours: totalHours.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        status: "draft",
      });
      
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate invoice" });
    }
  });

  // ===== ASSETS =====
  app.get("/api/assets", async (req, res) => {
    try {
      const businessId = req.query.businessId as string;
      const locationId = req.query.locationId as string;
      
      if (locationId) {
        const assets = await storage.getAssetsByLocation(locationId);
        return res.json(assets);
      }
      
      if (businessId) {
        const assets = await storage.getAssetsByBusiness(businessId);
        return res.json(assets);
      }
      
      return res.status(400).json({ error: "businessId or locationId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  app.get("/api/assets/scan/:code", async (req, res) => {
    try {
      const code = req.params.code;
      const type = req.query.type as string;
      
      let asset;
      if (type === "barcode") {
        asset = await storage.getAssetByBarcode(code);
      } else if (type === "qr") {
        asset = await storage.getAssetByQRCode(code);
      } else {
        return res.status(400).json({ error: "Invalid scan type" });
      }
      
      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }
      
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: "Failed to scan asset" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      console.log("Creating asset with data:", req.body);
      const data = insertAssetSchema.parse(req.body);
      console.log("Validated data:", data);
      const asset = await storage.createAsset(data);
      console.log("Asset created:", asset);
      res.status(201).json(asset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ error: error.errors });
      }
      console.error("Failed to create asset:", error);
      res.status(500).json({ error: "Failed to create asset" });
    }
  });

  app.patch("/api/assets/:id", async (req, res) => {
    try {
      const asset = await storage.updateAsset(req.params.id, req.body);
      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }
      res.json(asset);
    } catch (error) {
      res.status(500).json({ error: "Failed to update asset" });
    }
  });

  // ===== ASSET SCANS =====
  app.get("/api/asset-scans", async (req, res) => {
    try {
      const assetId = req.query.assetId as string;
      const employeeId = req.query.employeeId as string;
      
      if (assetId) {
        const scans = await storage.getAssetScansByAsset(assetId);
        return res.json(scans);
      }
      
      if (employeeId) {
        const scans = await storage.getAssetScansByEmployee(employeeId);
        return res.json(scans);
      }
      
      return res.status(400).json({ error: "assetId or employeeId is required" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch asset scans" });
    }
  });

  app.post("/api/asset-scans", async (req, res) => {
    try {
      const data = insertAssetScanSchema.parse(req.body);
      const scan = await storage.createAssetScan(data);
      
      // Update asset status based on scan type
      if (data.scanType === "check-out") {
        await storage.updateAsset(data.assetId, { status: "in-use" });
      } else if (data.scanType === "check-in") {
        await storage.updateAsset(data.assetId, { status: "available" });
      } else if (data.scanType === "issue") {
        await storage.updateAsset(data.assetId, { status: "maintenance" });
      }
      
      res.status(201).json(scan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create asset scan" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
