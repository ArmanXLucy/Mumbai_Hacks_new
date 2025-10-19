import React, { useState } from "react";
import { ArrowRightLeft, DollarSign, Euro, PoundSterling, JapaneseYen, IndianRupee, Zap, Loader2, BarChart3, TrendingUp, RefreshCcw, Calculator } from "lucide-react";
import Footer from "../components/Footer";


const API_KEY = "02bf587059db2fb43a928746c2aee8e2";
const API_URL = "https://api.forexrateapi.com/v1/latest";


const AVAILABLE_CURRENCIES = [

    { code: "USD", name: "US Dollar", icon: <DollarSign size={20} className="text-emerald-500" /> },
    { code: "EUR", name: "Euro", icon: <Euro size={20} className="text-gray-400" /> },
    { code: "GBP", name: "British Pound", icon: <PoundSterling size={20} className="text-yellow-600" /> },
    { code: "JPY", name: "Japanese Yen", icon: <JapaneseYen size={20} className="text-amber-500" /> },
    { code: "INR", name: "Indian Rupee", icon: <IndianRupee size={20} className="text-lime-500" /> },
    { code: "AUD", name: "Australian Dollar", icon: <DollarSign size={20} className="text-sky-500" /> },
    { code: "CAD", name: "Canadian Dollar", icon: <DollarSign size={20} className="text-red-500" /> },
    { code: "CHF", name: "Swiss Franc", icon: <span className="font-sans text-gray-400">CHF</span> },
];


const currencyIcons = AVAILABLE_CURRENCIES.reduce((acc, curr) => {
    acc[curr.code] = curr.icon;
    return acc;
}, {});

const getSelectedCurrencyIcon = (code) => {
    return currencyIcons[code] || <DollarSign size={20} className="text-gray-400" />;
};





const AmountInput = ({ amount, setAmount, fromCurrency }) => (
    <div className="flex flex-col items-start space-y-2">
        <label className="text-sm font-medium text-zinc-300 flex items-center">
            <span className="mr-2">{getSelectedCurrencyIcon(fromCurrency)}</span>
            Amount ({fromCurrency})
        </label>
        <div className="relative w-full">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g., 100.00"

                className="w-full pl-3 pr-10 py-3 bg-zinc-700/50 text-white border border-zinc-700 rounded-lg text-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition duration-200 shadow-inner appearance-none"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                aria-label="Amount to convert"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 text-sm font-semibold">
                {fromCurrency}
            </span>
        </div>
    </div>
);


const CurrencySelect = ({ label, value, onChange }) => (
    <div className="flex flex-col items-start space-y-2 w-full">
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        <div className="relative w-full">
            <select
                value={value}
                onChange={onChange}

                className="w-full pl-10 pr-4 py-3 bg-zinc-700/50 text-white border border-zinc-700 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition duration-200"
                aria-label={label}
            >
                {AVAILABLE_CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                    </option>
                ))}
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                {getSelectedCurrencyIcon(value)}
            </div>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-zinc-400">
                &#9660;
            </div>
        </div>
    </div>
);




const TickerItem = ({ pair, rate, trendIcon }) => (

    <div className="flex items-center justify-between px-3 py-1 bg-zinc-800/50 rounded-lg text-sm transition duration-300 hover:bg-zinc-700/70">
        <span className="font-semibold text-zinc-200">{pair}</span>
        <div className="flex items-center space-x-2">

            <span className="font-mono text-amber-400">{rate}</span>
            {trendIcon}
        </div>
    </div>
);


const LiveTicker = () => (

    <div className="bg-zinc-950 border-b border-yellow-600/30 shadow-2xl sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto p-2">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

                <TickerItem pair="USD/EUR" rate="0.9234" trendIcon={<BarChart3 size={16} className="text-green-500" />} />
                <TickerItem pair="USD/JPY" rate="156.78" trendIcon={<TrendingUp size={16} className="text-red-500" />} />
                <TickerItem pair="GBP/USD" rate="1.2611" trendIcon={<TrendingUp size={16} className="text-green-500" />} />
                <TickerItem pair="AUD/USD" rate="0.6622" trendIcon={<BarChart3 size={16} className="text-green-500" />} />
                <TickerItem pair="USD/INR" rate="83.58" trendIcon={<TrendingUp size={16} className="text-red-500" />} />
            </div>
        </div>
    </div>
);




const CurrencyExchange = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleConvert = async () => {
        const parsedAmount = parseFloat(amount);

        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            setResult("");
            setError("Please enter a valid positive amount.");
            return;
        }

        setLoading(true);
        setError("");
        setResult("");

        const maxRetries = 3;
        let lastError = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const response = await fetch(
                    `${API_URL}?api_key=${API_KEY}&base=${fromCurrency}&currencies=${toCurrency}`
                );

                if (!response.ok) {
                    throw new Error(`API returned status ${response.status}`);
                }

                const data = await response.json();

                if (!data || !data.rates || !data.rates[toCurrency]) {
                    if (data.status && data.message) {
                        throw new Error(data.message);
                    }
                    throw new Error("Invalid API response or rate unavailable.");
                }

                const rate = data.rates[toCurrency];
                const convertedAmount = (parsedAmount * rate).toFixed(4);

                setResult(
                    <div className="flex flex-col items-center">

                        <span className="text-4xl font-extrabold text-amber-400 drop-shadow-lg">
                            {convertedAmount}
                        </span>
                        <span className="text-xl text-zinc-400 mt-1">
                            {toCurrency}
                        </span>
                    </div>
                );
                lastError = null;
                break;

            } catch (err) {
                lastError = err;
                console.error("Conversion Attempt Error:", err);
                if (attempt < maxRetries - 1) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        if (lastError) {
            setError(`Conversion failed: ${lastError.message || "Could not fetch rates. Please check the network."}`);
        }

        setLoading(false);
    };

    const handleReset = () => {
        setAmount("");
        setResult("");
        setError("");
    };

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setResult("");
        setError("");
    };

    return (

        <div className="min-h-screen flex flex-col bg-zinc-900 font-inter antialiased">

            <LiveTicker />

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <header className="text-center mb-8">

                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-600">
                                Professional Global Exchange
                            </span>
                        </h1>
                        <p className="text-zinc-400 text-lg">
                            Instant, accurate currency conversion powered by live market data.
                        </p>
                    </header>


                    <div className="p-6 md:p-8 bg-zinc-800 rounded-2xl shadow-xl border border-yellow-600/30">
                        <div className="mb-6">

                            <h2 className="text-2xl font-semibold text-zinc-100 flex items-center">
                                <BarChart3 size={24} className="mr-3 text-amber-500" />
                                FX Conversion Panel
                            </h2>
                        </div>


                        <div className="mb-6">
                            <AmountInput
                                amount={amount}
                                setAmount={setAmount}
                                fromCurrency={fromCurrency}
                            />
                        </div>


                        <div className="flex items-end justify-between gap-4 mb-8 flex-col sm:flex-row">
                            <CurrencySelect
                                label="From Currency"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            />


                            <button
                                className="w-10 h-10 bg-amber-600 hover:bg-amber-500 text-zinc-900 rounded-full flex items-center justify-center transition duration-300 shadow-lg hover:shadow-amber-500/50 sm:mb-2 transform sm:translate-y-0 translate-y-2 rotate-90 sm:rotate-0"
                                onClick={handleSwap}
                                title="Swap currencies"
                                aria-label="Swap currencies"
                                disabled={loading}
                            >
                                <ArrowRightLeft size={20} />
                            </button>

                            <CurrencySelect
                                label="To Currency"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            />
                        </div>


                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">


                            <div className="w-full md:w-3/5 min-h-[80px] flex items-center justify-center bg-zinc-700/30 border border-yellow-600/50 rounded-lg p-4 transition-all duration-300">
                                {loading && <h3 className="flex items-center text-amber-400 gap-3 font-mono text-lg">
                                    <Loader2 className="animate-spin" size={24} /> Fetching live rates...
                                </h3>}
                                {error && <h3 className="text-lg font-medium text-red-400 flex items-center gap-2">
                                    {error}
                                </h3>}
                                {!loading && !error && result && (
                                    <div className="text-center">{result}</div>
                                )}
                                {!loading && !error && !result && (
                                    <p className="text-zinc-500 italic">Enter amount and click convert.</p>
                                )}
                            </div>


                            <div className="w-full md:w-2/5 flex flex-col space-y-3">

                                <button
                                    className="w-full btn bg-yellow-600 hover:bg-yellow-500 text-zinc-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition duration-300 shadow-md hover:shadow-lg shadow-yellow-600/50"
                                    onClick={handleConvert}
                                    disabled={loading}
                                >
                                    <Zap size={18} className="inline mr-2" /> Convert Rate
                                </button>

                                <button
                                    className="w-full btn bg-transparent border border-zinc-600 text-amber-400 hover:border-amber-500 hover:text-amber-500 font-medium py-3 px-4 rounded-lg flex items-center justify-center transition duration-300"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    <RefreshCcw size={18} className="inline mr-2" /> Reset Form
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CurrencyExchange;
