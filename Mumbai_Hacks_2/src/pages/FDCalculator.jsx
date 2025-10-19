import React, { useState, useEffect, useRef } from "react";
import Background from './Background'
import Footer from "../components/Footer";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "boxicons/css/boxicons.min.css";
import "./FDCalculator.css";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FDCalculator = () => {
  const [invested, setInvested] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [investedAmt, setInvestedAmt] = useState("");
  const [estReturn, setEstReturn] = useState("");
  const [total, setTotal] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  
  useEffect(() => {
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  const calculate = () => {
    const P = parseFloat(invested);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      alert("Please enter valid numbers for all fields!");
      return;
    }

    const A = P * Math.pow(1 + R / 100, T);
    const interest = A - P;

    setInvestedAmt(P.toFixed(2));
    setEstReturn(interest.toFixed(2));
    setTotal(A.toFixed(2));

    drawChart(P, interest);
  };

  const drawChart = (principal, interest) => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");


    if (chartInstance.current) chartInstance.current.destroy();


    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            label: "Investment Breakdown (₹)",
            data: [principal || 0, interest || 0],
            backgroundColor: ["#ffcc00", "#00bfff"],

            borderWidth: 1.5,
            borderRadius: 6,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { color: "#fff" } },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount (₹)",
              color: "#fff",
              font: { size: 14, weight: "bold" },
            },
            grid: {
              color: "rgba(255,255,255,0.2)", 
              drawTicks: true,
              drawBorder: true,
            },
            ticks: { color: "#fff" },
          },
          y: {
            title: {
              display: true,
              text: "Category",
              color: "#fff",
              font: { size: 14, weight: "bold" },
            },
            grid: {
              color: "rgba(255,255,255,0.2)", 
              drawTicks: true,
              drawBorder: true,
            },
            ticks: { color: "#fff" },
          },
        },
      },
    });
  };

  const reset = () => {
    setInvested("");
    setRate("");
    setTime("");
    setInvestedAmt("");
    setEstReturn("");
    setTotal("");
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
    drawChart(0, 0); 
  };


  useEffect(() => {
    drawChart(0, 0);
  }, []);

  return (
    <div>
      
    <div className="fd-body">
      <h1 className="text-white text-4xl font-bold text-center mt-5 mb-5">
        Welcome to FD Calculator
      </h1>

      <div className="bodytext">
        <div className="container0">
          <div className="container1">
            <div className="inv-div">
              <h2>Enter your Invested Amount</h2>
              <input
                type="number"
                value={invested}
                onChange={(e) => setInvested(e.target.value)}
                placeholder="Enter amount"
                />
            </div>

            <div className="inv-div">
              <h2>Enter your Interest Rate (%)</h2>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enter interest rate"
                />
            </div>

            <div className="inv-div">
              <h2>Enter the Time of Investment (in years)</h2>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
                />
            </div>

            <div className="button_div">
              <button className="fdcalc_btn" onClick={calculate}>
                Calculate
              </button>
              <button className="fdreset_btn" onClick={reset}>
                Reset
              </button>
            </div>
          </div>

          <div className="container2">
            <div className="inv-div">
              <h3>Your Invested Amount is</h3>
              <input type="text" value={investedAmt} readOnly />
            </div>

            <div className="inv-div">
              <h3>Your Estimated Return is</h3>
              <input type="text" value={estReturn} readOnly />
            </div>

            <div className="inv-div">
              <h3>Your Total Return is</h3>
              <input type="text" value={total} readOnly />
            </div>
          </div>
      
        </div>
        <div className="pie_container">
          <h2>Your Investment Breakdown</h2>
          <div className="chart-wrapper">
            <canvas
              ref={chartRef}
              id="investmentChart"
              width="500"
              height="500"
              style={{ display: "block", margin: "auto" }}
              ></canvas>
          </div>
        </div>
      </div>
   <Footer/>
    </div>
</div>
    
  );
};

export default FDCalculator;