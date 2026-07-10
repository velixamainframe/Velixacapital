import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { getEmployeeByUserId, employeeStats } from "@/lib/data";
import { db } from "@/lib/db";

export const runtime = "nodejs";

/**
 * GET /api/crm/stats
 *
 * Returns the current employee's CRM stats plus a 7-day calls-per-day series
 * for the dashboard chart. Admins get an aggregate across all employees.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (user.role !== "employee" && user.role !== "admin") {
    return NextResponse.json({ error: "Employee access required" }, { status: 403 });
  }

  // Admin: aggregate stats across all employees.
  if (user.role === "admin") {
    const [assignments, outcomes, pending, converted, connected, followUps] = await Promise.all([
      db.callAssignment.count(),
      db.callOutcome.count(),
      db.callAssignment.count({ where: { status: "pending" } }),
      db.callAssignment.count({ where: { status: "converted" } }),
      db.callOutcome.count({ where: { outcome: "connected" } }),
      db.followUp.count({ where: { completed: false, scheduledAt: { gte: new Date() } } }),
    ]);
    const series = await last7DaysSeries(null);
    const dispositionBreakdown = await dispositionCounts(null);
    return NextResponse.json({
      mode: "admin",
      stats: {
        assignments,
        outcomes,
        pending,
        converted,
        followUps,
        connected,
        connectRate: assignments ? Math.round((connected / assignments) * 100) : 0,
        conversionRate: assignments ? Math.round((converted / assignments) * 100) : 0,
      },
      series7d: series,
      dispositionBreakdown,
    });
  }

  // Employee path.
  const employee = await getEmployeeByUserId(user.id);
  if (!employee) {
    return NextResponse.json(
      { error: "No employee record linked to this account." },
      { status: 403 },
    );
  }

  const stats = await employeeStats(employee.id);
  const series = await last7DaysSeries(employee.id);
  const dispositionBreakdown = await dispositionCounts(employee.id);
  const todayCount = await db.callOutcome.count({
    where: {
      employeeId: employee.id,
      createdAt: { gte: startOfToday() },
    },
  });

  return NextResponse.json({
    mode: "employee",
    employee: {
      id: employee.id,
      fullName: employee.fullName,
      designation: employee.designation,
      targetCalls: employee.targetCalls,
    },
    stats: {
      ...stats,
      todayCalls: todayCount,
      conversionRate: stats.claimed
        ? Math.round((stats.converted / stats.claimed) * 100)
        : 0,
    },
    series7d: series,
    dispositionBreakdown,
  });
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Calls-per-day for the last 7 days (inclusive of today). */
async function last7DaysSeries(employeeId: string | null) {
  const days: { date: string; label: string; calls: number; connected: number }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - i);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const where: any = { createdAt: { gte: start, lt: end } };
    if (employeeId) where.employeeId = employeeId;
    const [calls, connected] = await Promise.all([
      db.callOutcome.count({ where }),
      db.callOutcome.count({ where: { ...where, outcome: "connected" } }),
    ]);
    days.push({
      date: start.toISOString().slice(0, 10),
      label: start.toLocaleDateString("en-IN", { weekday: "short" }),
      calls,
      connected,
    });
  }
  return days;
}

/** Disposition breakdown for the pie chart. */
async function dispositionCounts(employeeId: string | null) {
  const where: any = {};
  if (employeeId) where.employeeId = employeeId;
  const groups = await db.callOutcome.groupBy({
    by: ["disposition"],
    _count: { _all: true },
    where,
  });
  const map: Record<string, number> = {
    success: 0,
    rejected: 0,
    not_connected: 0,
    reschedule: 0,
    callback: 0,
    converted: 0,
    dnd: 0,
  };
  for (const g of groups) {
    if (map[g.disposition] !== undefined) map[g.disposition] = g._count._all;
  }
  return Object.entries(map).map(([k, v]) => ({ disposition: k, count: v }));
}
