import { useState } from 'react'
import { InputBox } from './components/index'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import coverImage from './assets/CurrencycoverImage.jpg'
import ruppeeImage from './assets/ruppeeImage.jpg'

function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justigy-center items-center bg-cover "
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="w-fit mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/50 flex felx-row">
          <div className='mr-4'>
            <img
              src={ruppeeImage}
              className='max-w-xs h-fit rounded-lg' /></div>
                
          <div className="max-w-xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/50" >

            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert()
              }}
            >
              <div className="w-full mb-2 ">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}

                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type='button'
                  className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mb-4 mt-2">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
