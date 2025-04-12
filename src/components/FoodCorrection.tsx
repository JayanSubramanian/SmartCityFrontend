"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loader2, Search, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import Layout from './Layout'

export default function FoodCorrection() {
  const [query, setQuery] = useState("")
  const [correctedName, setCorrectedName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCorrectName = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setCorrectedName(null)
    setIsSuccess(false)

    try {
      const response = await fetch(`http://127.0.0.1:8000/correct_food?query=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error("Failed to correct food name")
      }

      const data = await response.json()
      setCorrectedName(data["Corrected Food Name"])
      setIsSuccess(true)
    } catch (err) {
      setError("Error correcting food name. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-200 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-200 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Food Recommendation Chatbot
            </motion.h1>
            <motion.p
              className="text-lg text-slate-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get instant corrections for food names and discover delicious recommendations
            </motion.p>
          </div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Correct Food Name</h2>
              <p className="text-slate-600 mb-6">Enter a food name and we'll correct any typos for you</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Enter a food name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCorrectName()
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleCorrectName}
                  disabled={isLoading || !query.trim()}
                  className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Correcting...
                    </>
                  ) : (
                    "Correct Name"
                  )}
                </Button>
              </div>

              {/* Results area with animations */}
              {(correctedName || error) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  {isSuccess && correctedName && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-green-800">Corrected Food Name:</p>
                        <p className="text-lg text-green-900">{correctedName}</p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-800">Error</p>
                        <p className="text-red-700">{error}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Additional info card */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Our AI-powered system can correct misspelled food names and provide recommendations
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  )
}
