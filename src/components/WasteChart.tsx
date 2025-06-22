
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const WasteChart = () => {
  const weeklyData = [
    { day: 'Mon', organic: 24, plastic: 18, paper: 32, mixed: 15 },
    { day: 'Tue', organic: 28, plastic: 22, paper: 28, mixed: 18 },
    { day: 'Wed', organic: 32, plastic: 25, paper: 35, mixed: 20 },
    { day: 'Thu', organic: 30, plastic: 28, paper: 30, mixed: 22 },
    { day: 'Fri', organic: 35, plastic: 30, paper: 40, mixed: 25 },
    { day: 'Sat', organic: 20, plastic: 15, paper: 25, mixed: 12 },
    { day: 'Sun', organic: 18, plastic: 12, paper: 20, mixed: 10 }
  ];

  const wasteTypeData = [
    { name: 'Organic', value: 35, color: '#10b981' },
    { name: 'Paper', value: 30, color: '#3b82f6' },
    { name: 'Plastic', value: 25, color: '#f59e0b' },
    { name: 'Mixed', value: 10, color: '#ef4444' }
  ];

  return (
    <div className="space-y-8">
      {/* Weekly Collection Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Weekly Waste Collection (kg)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="organic" stackId="a" fill="#10b981" name="Organic" />
            <Bar dataKey="plastic" stackId="a" fill="#f59e0b" name="Plastic" />
            <Bar dataKey="paper" stackId="a" fill="#3b82f6" name="Paper" />
            <Bar dataKey="mixed" stackId="a" fill="#ef4444" name="Mixed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Waste Type Distribution Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Waste Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Environmental Impact</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Trees Saved</span>
              <span className="text-lg font-bold text-green-600">47</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Water Saved (L)</span>
              <span className="text-lg font-bold text-blue-600">1,240</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium">Energy Saved (kWh)</span>
              <span className="text-lg font-bold text-purple-600">890</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <span className="text-sm font-medium">CO₂ Reduced (kg)</span>
              <span className="text-lg font-bold text-emerald-600">156.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteChart;
