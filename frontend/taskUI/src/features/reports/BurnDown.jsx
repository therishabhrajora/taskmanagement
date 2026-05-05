import { useEffect, useState } from "react";
import { burnDown } from "../../api/reportApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowTrendingDownIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function BurnDown() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await burnDown(1);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <ArrowPathIcon className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header with Stats */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Burn Down Chart
            </h2>
            <p className="mt-1 text-sm text-gray-500">Tracking sprint progress and remaining effort.</p>
          </div>
        </div>

        {/* Main Chart Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="flex items-center gap-2 text-indigo-600">
              <ArrowTrendingDownIcon className="h-5 w-5" />
              <h3 className="text-base font-semibold leading-6 text-gray-900">Sprint Velocity</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.chartPoints || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Line 
                    name="Ideal Burndown"
                    type="monotone" 
                    dataKey="ideal" 
                    stroke="#d1d5db" 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                  <Line 
                    name="Remaining Tasks"
                    type="monotone" 
                    dataKey="remaining" 
                    stroke="#4f46e5" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#4f46e5' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Raw Data Toggle (Optional Tailwind UI style) */}
        <details className="mt-8 group">
          <summary className="flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <span>View raw JSON data</span>
          </summary>
          <div className="mt-4 rounded-lg bg-gray-900 p-4 shadow-inner">
            <pre className="text-xs text-indigo-300 overflow-auto leading-relaxed">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
}
