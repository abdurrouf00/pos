'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ApexCharts on client side only
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RadarChart() {
  const [series, setSeries] = useState([
    {
      name: 'Budget Distribution',
      data: [56, 42, 38, 27, 45, 33, 40, 25]
    }
  ]);

  const options = {
    chart: {
      height: 400,
      type: 'radar',
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      }
    },
    colors: ['#4C6FFF', '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', '#FFEB3B', '#673AB7', '#FF5252'],
    fill: {
      opacity: 0.7
    },
    stroke: {
      width: 2
    },
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    },
    tooltip: {
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const categories = ['Operations', 'Marketing', 'Sales', 'Development', 'Customer Support', 'Consulting', 'HR', 'Admin'];
        const value = series[seriesIndex][dataPointIndex];
        const label = categories[dataPointIndex];
        const billions = (value / 100 * 0.93).toFixed(3);
        
        return `
          <div class="custom-tooltip" style="background: #2D3748; padding: 10px; border-radius: 5px; color: white;">
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
              <span style="background: ${w.globals.colors[dataPointIndex]}; width: 10px; height: 10px; display: inline-block; margin-right: 5px; border-radius: 50%;"></span>
              <span>${label}  ${value}%</span>
            </div>
            <div>Value: ${billions} Billions</div>
          </div>
        `;
      }
    },
    yaxis: {
      show: true,
      tickAmount: 5,
      labels: {
        formatter: function(val) {
          return val;
        }
      }
    },
    xaxis: {
      categories: ['Operations', 'Marketing', 'Sales', 'Development', 'Customer Support', 'Consulting', 'HR', 'Admin']
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    }
  };

  return (
    <div className="radar-chart bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Budget Allocation</h3>
      <div className="w-full h-[400px]">
        <ReactApexChart 
          options={options} 
          series={series} 
          type="radar" 
          height="100%" 
        />
      </div>
    </div>
  );
} 