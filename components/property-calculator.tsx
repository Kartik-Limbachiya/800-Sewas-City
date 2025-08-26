"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator, Home, TrendingUp, PiggyBank } from "lucide-react"

export default function PropertyCalculator() {
  const [propertyValue, setPropertyValue] = useState([2500000])
  const [downPayment, setDownPayment] = useState([0])
  const [loanTenure, setLoanTenure] = useState([20])
  const [interestRate, setInterestRate] = useState([8.5])
  const [emi, setEmi] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    const principal = propertyValue[0] - downPayment[0]
    const monthlyRate = interestRate[0] / 12 / 100
    const months = loanTenure[0] * 12

    if (principal > 0 && monthlyRate > 0) {
      const emiAmount =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const total = emiAmount * months
      const interest = total - principal

      setEmi(emiAmount)
      setTotalAmount(total)
      setTotalInterest(interest)
    } else {
      setEmi(0)
      setTotalAmount(0)
      setTotalInterest(0)
    }
  }, [propertyValue, downPayment, loanTenure, interestRate])

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Property Calculator
          </h2>
          <p className="text-xl text-gray-600">Calculate your EMI and plan your investment</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Loan Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Property Value: ₹{propertyValue[0].toLocaleString()}
                </label>
                <Slider
                  value={propertyValue}
                  onValueChange={setPropertyValue}
                  max={10000000}
                  min={1000000}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹10L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Down Payment: ₹{downPayment[0].toLocaleString()} (
                  {((downPayment[0] / propertyValue[0]) * 100).toFixed(1)}%)
                </label>
                <Slider
                  value={downPayment}
                  onValueChange={setDownPayment}
                  max={propertyValue[0] * 0.5}
                  min={0}
                  step={50000}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Loan Tenure: {loanTenure[0]} years
                </label>
                <Slider value={loanTenure} onValueChange={setLoanTenure} max={30} min={5} step={1} className="w-full" />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Interest Rate: {interestRate[0]}% per annum
                </label>
                <Slider
                  value={interestRate}
                  onValueChange={setInterestRate}
                  max={15}
                  min={6}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Monthly EMI</h3>
                </div>
                <div className="text-4xl font-bold">₹{emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Total Amount</h3>
                </div>
                <div className="text-4xl font-bold">
                  ₹{totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <PiggyBank className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Total Interest</h3>
                </div>
                <div className="text-4xl font-bold">
                  ₹{totalInterest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-[var(--color-saffron)] to-orange-500 hover:from-orange-500 hover:to-[var(--color-saffron)] text-white py-6 text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              asChild
            >
              <a href="/booking">Apply for This Property</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
