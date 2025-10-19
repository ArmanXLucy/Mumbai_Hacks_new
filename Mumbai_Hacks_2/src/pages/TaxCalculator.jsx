import React, { useState, useEffect, useRef } from "react";
import "./TaxCalculator.css";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js/auto";
import Footer from "../components/Footer";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [investments, setInvestments] = useState("");
  const [result, setResult] = useState({ taxableIncome: 0, taxAmount: 0 });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  const calculateTax = () => {
    const inc = parseFloat(income) || 0;
    const ded = parseFloat(deductions) || 0;
    const inv = parseFloat(investments) || 0;
    const taxable = Math.max(inc - ded - inv, 0);
    let tax = 0;

    if (taxable <= 250000) tax = 0;
    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
    else tax = 112500 + (taxable - 1000000) * 0.3;

    setResult({ taxableIncome: taxable, taxAmount: tax });
    updateChart(inc, ded, inv, taxable, tax);
  };

  const resetForm = () => {
    setIncome("");
    setDeductions("");
    setInvestments("");
    setResult({ taxableIncome: 0, taxAmount: 0 });
    updateChart(0, 0, 0, 0, 0);
  };


  const updateChart = (inc, ded, inv, taxable, tax) => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Income", "Deductions", "Investments", "Taxable Income", "Tax Amount"],
        datasets: [
          {
            label: "Tax Calculation Breakdown",
            data: [inc, ded, inv, taxable, tax],
            backgroundColor: [
              "#007bff",
              "#ff6384",
              "#ffcd56",
              "#36a2eb",
              "#4bc0c0",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "#fff" },
          },
        },
        scales: {
          x: {
            ticks: { color: "#fff" },
            grid: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            ticks: { color: "#fff" },
            grid: { color: "rgba(255,255,255,0.1)" },
            title: {
              display: true,
              text: "Amount (₹)",
              color: "#ffcc00",
              font: { size: 14, weight: "bold" },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    updateChart(0, 0, 0, 0, 0); 
  }, []);

  return (
    <>
    <h1 className="text-4xl font-bold text-white text-center mt-5">Welcome To Tax Calculator</h1>
    <div className="tax-app flex justify-center">


      <div className="parent w-[90vw]">

        <div className="containerTax w-[30%]">
          <h1 className="text-xl font-bold">Advanced Tax Calculator</h1>
          <div className="inputs">
            <label>Income:</label>
            <input
              type="number"
              placeholder="Enter your annual income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <label>Deductions:</label>
            <input
              type="number"
              placeholder="Enter total deductions"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
            />
            <label>Investments:</label>
            <input
              type="number"
              placeholder="Enter total investments"
              value={investments}
              onChange={(e) => setInvestments(e.target.value)}
            />
            <label>Select Region:</label>
            <select defaultValue="india">
              <option value="india">India</option>
            </select>

            <div className="button_sec">
              <button onClick={calculateTax} className="calc_btn">Calculate</button>
              <button onClick={resetForm} className="reset_btn">Reset</button>
            </div>
          </div>
        </div>

        <div className="chart_parent w-[55%]">
          <h1>Personal Finance Summary Graph</h1>
          <div className="chart-container">
            <canvas ref={chartRef} id="tax-chart"></canvas>
          </div>
          <div className="result">
            <p>Taxable Income: ₹{result.taxableIncome.toFixed(2)}</p>
            <p>Tax Amount: ₹{result.taxAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

    </div>
      <Footer/>
    </>
  );
};

export default TaxCalculator;