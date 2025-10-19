import React, { useState } from "react";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./RetirementPlanner.css";
import Footer from "../components/Footer";
import Background from "./Background"

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RetirementPlanner = () => {
  const [currentSavings, setCurrentSavings] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [retirementDuration, setRetirementDuration] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [inflationRate, setInflationRate] = useState(3);
  const [returnRate, setReturnRate] = useState(7);
  const [results, setResults] = useState({
    monthlyContribution: 0,
    totalSavings: 0,
    progress: 0,
  });

  const calculate = (e) => {
    e.preventDefault();

    const yearsToRetirement = retirementAge - currentAge;
    const futureExpenses =
      monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const requiredCorpus = futureExpenses * 12 * retirementDuration;

    const totalSavings =
      currentSavings * Math.pow(1 + returnRate / 100, yearsToRetirement);
    const progress = Math.min((totalSavings / requiredCorpus) * 100, 100);
    const monthlyContribution =
      (requiredCorpus - totalSavings) /
      ((Math.pow(1 + returnRate / 100 / 12, yearsToRetirement * 12) - 1) /
        (returnRate / 100 / 12));

    setResults({
      monthlyContribution: monthlyContribution.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      progress: progress.toFixed(2),
    });
  };

  const reset = () => {
    setCurrentSavings("");
    setCurrentAge("");
    setRetirementAge("");
    setRetirementDuration("");
    setMonthlyExpenses("");
    setInflationRate(3);
    setReturnRate(7);
    setResults({ monthlyContribution: 0, totalSavings: 0, progress: 0 });
  };

  const chartData = {
    labels: ["Current Savings", "Future Expenses", "Total Savings", "Required Corpus"],
    datasets: [
      {
        label: "Retirement Plan Overview (₹)",
        data: [
          currentSavings || 0,
          monthlyExpenses * 12 * retirementDuration || 0,
          results.totalSavings || 0,
          results.monthlyContribution * 12 * retirementDuration || 0,
        ],
        backgroundColor: "rgba(255, 215, 0, 0.7)",
        borderColor: "#ffcc00",
        borderWidth: 2,
      },
    ],
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", 
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Retirement Plan Overview (₹)",
        color: "#ffffff", 
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", 
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
  };

  return (
    <div className="main-container">
      <h1 className="text-4xl font-bold text-white ml-[35%] mt-5">Welcome To Retirement Planner</h1>

      <div className="content">
        <div className="form-section">
          <h2 className="font-bold text-xl">Advanced Retirement Calculator</h2>
          <form onSubmit={calculate}>
            <label>Current Savings (₹):</label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="Enter your current savings"
            />

            <label>Current Age:</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              placeholder="Enter your current age"
            />

            <label>Retirement Age:</label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="Enter desired retirement age"
            />

            <label>Years After Retirement:</label>
            <input
              type="number"
              value={retirementDuration}
              onChange={(e) => setRetirementDuration(e.target.value)}
              placeholder="Enter expected years"
            />

            <label>Monthly Expenses (₹):</label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="Enter monthly expenses"
            />

            <label>Inflation Rate: {inflationRate}%</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
            />

            <label>Return Rate: {returnRate}%</label>
            <input
              type="range"
              min="0"
              max="15"
              step="0.1"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
            />

            <div className="button-group">
              <button type="submit" className="calculate-btn">CALCULATE</button>
              <button type="button" onClick={reset} className="reset-btn">RESET</button>
            </div>
          </form>
        </div>

        <div className="chart-section">
          <Bar data={chartData} options={chartOptions} />
          <div className="results">
            <p>Monthly Contribution: ₹{results.monthlyContribution}</p>
            <p>Total Savings: ₹{results.totalSavings}</p>
            <p>Goal Progress: {results.progress}%</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${results.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
<Footer/>
    </div>
  );
};

export default RetirementPlanner;
