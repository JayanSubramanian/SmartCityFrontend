import React, { useState } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import Layout from './Layout';

interface Food {
  name: string;
  calories: number;
  score: number;
}

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

function NutriBot() {
  const [calorieLimit, setCalorieLimit] = useState<number>(600);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/recommendations?calorie_limit=${calorieLimit}`);
      const data = await response.json();
      setRecommendations(data.top_20);
      setSelectedFoods(data.optimized_selection);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
    setLoading(false);
  };

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-green-600 text-white py-6 shadow-lg rounded-md">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              🥗 NutriBot - Smart Food Recommender
            </h1>
            <p className="mt-2 text-green-100">Get the best food suggestions under your calorie goal!</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Set Your Calorie Goal</h2>
            <div className="flex gap-4">
              <input
                type="number"
                value={calorieLimit}
                onChange={(e) => setCalorieLimit(Number(e.target.value))}
                min="100"
                max="3000"
                step="50"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-2"
              />
              <button
                onClick={getRecommendations}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Get Recommendations'}
              </button>
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">📊 Top 20 Recommended Foods</h2>
              <div className="space-y-2">
                {recommendations.map((food, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span>{food.name}</span>
                    <span className="text-gray-600">
                      {food.calories} cal (score: {food.score.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedFoods.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">🍽️ Optimized Selection</h2>
              <div className="space-y-2">
                {selectedFoods.map((food, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <span>{food.name}</span>
                    <span className="text-gray-600">
                      {food.calories} cal (score: {food.score.toFixed(2)})
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-green-600 font-semibold">
                  ✅ Total Calories: {selectedFoods.reduce((sum, food) => sum + food.calories, 0)} |
                  Total Score: {selectedFoods.reduce((sum, food) => sum + food.score, 0).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bot className="h-6 w-6" />
                Chat with NutriBot
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={sendChatMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask something about food, nutrition, or recommendations..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 px-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default NutriBot;