import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import "./App.css";

function App() {
  const [homeValue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const newDownPayment = Math.floor(homeValue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homeValue - newDownPayment);
  }, [homeValue]);

  useEffect(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = tenure * 12;
    const numerator = loanAmount * monthlyInterestRate * (1 + monthlyInterestRate) ** totalPayments;
    const denominator = ((1 + monthlyInterestRate) ** totalPayments) - 1;
    const EMI = numerator / denominator;

    setMonthlyPayment(EMI);
  }, [loanAmount, interestRate, tenure]);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div>
        <div>
          <p>Home Value</p>
          <p>{homeValue} $</p>
          <input
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
            step="100"
          />
        </div>
        <div>
          <p>Down Payment</p>
          <p>{downPayment} $</p>
          <input
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value);
              setDownPayment(value);
              setLoanAmount(homeValue - value);
            }}
            type="range"
            min="0"
            max={homeValue}
            step="100"
            value={downPayment}
          />
        </div>
        <div>
          <p>Loan Amount</p>
          <p>{loanAmount} $</p>
          <input
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value);
              setLoanAmount(value);
              setDownPayment(homeValue - value);
            }}
            type="range"
            min="0"
            max={homeValue}
            step="100"
            value={loanAmount}
          />
        </div>
        <div>
          <p>Interest Rate</p>
          <p>% {interestRate}</p>
          <input
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
          />
        </div>
      </div>
      <div style={{ width: "300px" }}>
        <h3>Monthly Payment: $ {monthlyPayment.toFixed(2)}</h3>
        <CChart
          type="pie"
          data={{
            labels: ["Principal", "Interest"],
            datasets: [
              {
                backgroundColor: ["#A020F0", "#E46651"],
                data: [loanAmount, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
