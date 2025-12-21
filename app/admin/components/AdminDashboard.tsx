/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";

type DashboardKPI = {
  title: string;
  value: string;
  trend: string;
  isUp: boolean;
  color: string;
  icon: string;
  points: number[];
};

type DashboardData = {
  kpis: DashboardKPI[];
  lineChartData: number[];
  barChartData: { cat: string; val: number }[];
  orders: { id: string; customer: string; status: "Paid" | "Pending" | "Failed"; amount: number; date: string }[];
  activity: { text: string; type: "order" | "system" | "user" | "content"; time: string }[];
  health: { name: string; val: number; max?: number; unit?: string; color: string }[];
};

const mockDashboardData: DashboardData = {
  kpis: [
    { title: "Total Revenue", value: "$24,500", trend: "+12%", isUp: true, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-green-400", points: [20, 25, 40, 30, 45, 50, 60] },
    { title: "Total Orders", value: "1,240", trend: "+5%", isUp: true, icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", color: "text-neon-primary", points: [30, 40, 35, 50, 49, 60, 70] },
    { title: "Visitors", value: "45.2k", trend: "-2%", isUp: false, icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", color: "text-purple-400", points: [50, 45, 40, 35, 40, 30, 25] },
    { title: "Avg. Time", value: "4m 30s", trend: "+8%", isUp: true, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-yellow-400", points: [10, 15, 12, 18, 20, 22, 25] },
  ],
  lineChartData: [20, 45, 30, 60, 55, 75, 65, 80, 70, 90, 85, 100],
  barChartData: [
    { cat: "Elec", val: 75 },
    { cat: "Fash", val: 50 },
    { cat: "Home", val: 65 },
    { cat: "Spor", val: 40 },
    { cat: "Book", val: 30 },
  ],
  orders: [
    { id: "#ORD-001", customer: "Alex Neon", status: "Paid", amount: 120.0, date: "2023-10-24" },
    { id: "#ORD-002", customer: "Sarah Cyber", status: "Pending", amount: 85.5, date: "2023-10-24" },
    { id: "#ORD-003", customer: "John Doe", status: "Failed", amount: 250.0, date: "2023-10-23" },
    { id: "#ORD-004", customer: "Jane Void", status: "Paid", amount: 45.0, date: "2023-10-23" },
    { id: "#ORD-005", customer: "Mike Bit", status: "Paid", amount: 500.0, date: "2023-10-22" },
  ],
  activity: [
    { text: "New order #ORD-001 received", type: "order", time: "2 min ago" },
    { text: "Server CPU usage spiked to 85%", type: "system", time: "15 min ago" },
    { text: "Sarah updated profile picture", type: "user", time: "1 hr ago" },
    { text: "Weekly report generated", type: "content", time: "3 hrs ago" },
    { text: "Payment gateway maintenance", type: "system", time: "5 hrs ago" },
  ],
  health: [
    { name: "Uptime", val: 99.9, color: "bg-green-400" },
    { name: "API Latency", val: 45, max: 200, unit: "ms", color: "bg-neon-primary" },
    { name: "Disk Usage", val: 72, color: "bg-yellow-400" },
  ],
};

export default function AdminDashboard({ data = mockDashboardData }: { data?: DashboardData }) {
  const [notes, setNotes] = useState("");
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; visible: boolean }>({
    text: "",
    x: 0,
    y: 0,
    visible: false,
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [orders, setOrders] = useState(data.orders);
  const [orderFilter, setOrderFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("neoDash_notes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("neoDash_notes", notes);
  }, [notes]);

  useEffect(() => {
    setOrders(data.orders);
  }, [data.orders]);

  const lineChart = useMemo(() => {
    const width = 800;
    const height = 300;
    const max = Math.max(...data.lineChartData, 1) * 1.1;
    const points = data.lineChartData.map((val, i) => {
      const x = (i / (data.lineChartData.length - 1 || 1)) * width;
      const y = height - (val / max) * height;
      return [x, y];
    });
    const pathD = `M ${points.map((p) => p.join(",")).join(" L ")}`;
    const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;
    return { width, height, points, pathD, areaD };
  }, [data.lineChartData]);

  const statusColors: Record<"Paid" | "Pending" | "Failed", string> = {
    Paid: "bg-green-500/20 text-green-400 border-green-500/30",
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const activityColors: Record<string, string> = {
    order: "text-green-400",
    system: "text-red-400",
    user: "text-neon-primary",
    content: "text-yellow-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div>
          <p className="text-sm text-gray-500">Overview / Dashboard</p>
          <h1 className="text-2xl font-display font-bold text-white">System Overview</h1>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
          <button className="px-3 py-1 text-sm rounded-md bg-white/10 text-white shadow-sm">7D</button>
          <button className="px-3 py-1 text-sm rounded-md text-gray-400 hover:text-white transition-colors">14D</button>
          <button className="px-3 py-1 text-sm rounded-md text-gray-400 hover:text-white transition-colors">30D</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.kpis.map((kpi, idx) => {
          const max = Math.max(...kpi.points, 1);
          const sparkPoints = kpi.points
            .map((p, i) => `${(i / (kpi.points.length - 1 || 1)) * 100},${30 - (p / max) * 30}`)
            .join(" ");
          return (
            <div
              key={kpi.title}
              className="glass-panel glass-panel-hover p-5 rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-between items-start z-10">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{kpi.title}</p>
                  <h2 className="text-2xl font-bold text-white mt-1">{kpi.value}</h2>
                </div>
                <div className="p-2 rounded-lg bg-white/5 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={kpi.icon} />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto z-10">
                <span className={`text-xs font-medium ${kpi.isUp ? "text-green-400" : "text-red-400"} flex items-center gap-1`}>
                  {kpi.isUp ? "↑" : "↓"} {kpi.trend}
                </span>
                <svg className={`w-24 h-8 overflow-visible stroke-current ${kpi.color} opacity-50`} preserveAspectRatio="none" viewBox="0 0 100 30">
                  <polyline points={sparkPoints} fill="none" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Traffic Overview</h3>
            <button className="text-xs text-neon-primary hover:underline">View Report</button>
          </div>
          <div className="relative w-full h-[300px]">
            <svg viewBox={`0 0 ${lineChart.width} ${lineChart.height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1={lineChart.height} x2={lineChart.width} y2={lineChart.height} stroke="#ffffff20" strokeWidth="1" />
              <line x1="0" y1={lineChart.height / 2} x2={lineChart.width} y2={lineChart.height / 2} stroke="#ffffff10" strokeWidth="1" strokeDasharray="4" />
              <path d={lineChart.areaD} fill="url(#lineGradient)" />
              <path d={lineChart.pathD} fill="none" stroke="#00f3ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {lineChart.points.map((p, i) => (
                <circle
                  key={i}
                  cx={p[0]}
                  cy={p[1]}
                  r={4}
                  fill="#050510"
                  stroke="#00f3ff"
                  strokeWidth="2"
                  onMouseEnter={(evt) =>
                    setTooltip({
                      visible: true,
                      text: `${data.lineChartData[i]} visitors`,
                      x: evt.nativeEvent.offsetX + 10,
                      y: evt.nativeEvent.offsetY - 30,
                    })
                  }
                  onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
                />
              ))}
            </svg>
            <div
              className="chart-tooltip"
              style={{
                display: tooltip.visible ? "block" : "none",
                left: tooltip.x,
                top: tooltip.y,
              }}
            >
              {tooltip.text}
            </div>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Orders by Category</h3>
          </div>
          <div className="relative w-full h-[300px] flex items-end justify-between gap-2 pt-4">
            {data.barChartData.map((d) => {
              const max = Math.max(...data.barChartData.map((b) => b.val), 1);
              const h = (d.val / max) * 100;
              return (
                <div key={d.cat} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full bg-white/5 rounded-t-sm relative h-full flex items-end overflow-hidden">
                    <div className="w-full bg-neon-primary/80 hover:bg-neon-secondary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,243,255,0.3)]" style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{d.cat}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 glass-panel p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Filter orders..."
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-1 text-sm focus:border-neon-primary focus:outline-none"
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
              />
              <select
                className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-sm focus:border-neon-primary focus:outline-none"
                onChange={(e) => {
                  const type = e.target.value;
                  const sorted = [...orders].sort((a, b) => {
                    if (type === "amount-desc") return b.amount - a.amount;
                    if (type === "amount-asc") return a.amount - b.amount;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                  });
                  setOrders(sorted);
                }}
              >
                <option value="date-desc">Newest</option>
                <option value="amount-desc">Amount High</option>
                <option value="amount-asc">Amount Low</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 text-xs uppercase border-b border-white/10">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody id="orders-table-body" className="text-sm">
                {orders
                  .filter(
                    (order) =>
                      order.id.toLowerCase().includes(orderFilter.toLowerCase()) ||
                      order.customer.toLowerCase().includes(orderFilter.toLowerCase())
                  )
                  .map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                      <td className="py-3 px-2 font-mono text-neon-primary text-xs">{order.id}</td>
                      <td className="py-3 px-2 font-medium text-white">{order.customer}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${statusColors[order.status]}`}>{order.status}</span>
                      </td>
                      <td className="py-3 px-2 text-white">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-2 text-gray-400 text-xs">{order.date}</td>
                      <td className="py-3 px-2 text-right">
                        <button
                          className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded"
                          onClick={() => alert(`Action clicked: ${order.id}`)}
                        >
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
            <span>Showing 5 of 50</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 bg-white/5 rounded hover:bg-white/10" disabled>
                &lt;
              </button>
              <button className="px-2 py-1 bg-white/5 rounded hover:bg-white/10">&gt;</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel p-5 rounded-xl">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">System Health</h3>
            <div className="space-y-4">
              {data.health.map((h) => (
                <div key={h.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{h.name}</span>
                    <span className="text-white font-mono">
                      {h.val}
                      {h.unit || "%"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${h.color} shadow-[0_0_5px_currentColor]`} style={{ width: `${h.max ? (h.val / h.max) * 100 : h.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 rounded-xl flex flex-col flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Notes</h3>
              <button
                onClick={() => {
                  setNotes("");
                  localStorage.removeItem("neoDash_notes");
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Clear
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full flex-1 bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-gray-300 focus:border-neon-primary focus:outline-none resize-none h-32"
              placeholder="Jot down something... (Autosaved)"
            />
          </div>

          <div className="glass-panel p-5 rounded-xl max-h-[300px] overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Live Activity</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-0 before:left-[9px] before:w-[2px] before:bg-white/5">
              {data.activity.map((act, idx) => (
                <div key={idx} className="relative pl-6 py-1 group">
                  <div className={`absolute left-0 top-2 w-2 h-2 rounded-full ${activityColors[act.type]} bg-current shadow-[0_0_5px_currentColor]`} />
                  <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{act.text}</p>
                  <span className="text-xs text-gray-600">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {paletteOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20"
          onClick={(e) => {
            if (e.currentTarget === e.target) setPaletteOpen(false);
          }}
        >
          <div className="bg-neon-card border border-neon-primary/30 w-full max-w-lg rounded-xl shadow-2xl shadow-neon-primary/20 transform transition-all scale-100 overflow-hidden">
            <div className="border-b border-white/10 px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-neon-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Type a command or search..." className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none text-lg" />
              <span className="text-xs text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">ESC</span>
            </div>
            <div className="py-2">
              <div className="px-4 py-1 text-xs text-gray-500 font-bold uppercase">Actions</div>
              <button className="w-full text-left px-4 py-2 hover:bg-neon-primary/10 hover:text-neon-primary text-gray-300 flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>{" "}
                Create New Order
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-neon-primary/10 hover:text-neon-primary text-gray-300 flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>{" "}
                Create Post
              </button>
              <div className="px-4 py-1 mt-2 text-xs text-gray-500 font-bold uppercase">Navigation</div>
              <button className="w-full text-left px-4 py-2 hover:bg-neon-primary/10 hover:text-neon-primary text-gray-300 flex items-center gap-3 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>{" "}
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button
          onClick={() => setPaletteOpen(true)}
          className="px-3 py-2 bg-neon-primary/10 border border-neon-primary/30 rounded-lg text-xs font-medium text-neon-primary hover:bg-neon-primary/20 transition-all"
        >
          Command Palette
        </button>
      </div>
    </div>
  );
}
