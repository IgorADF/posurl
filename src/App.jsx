import axios from "axios"
import React, { useEffect, useState } from "react"
import { ScaleLoader } from "react-spinners"
import { TOKENS } from "./services/styles"

const booleanSt = "true"

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [response, setResponse] = useState(null)

  useEffect(() => {
    let isDarkMode = localStorage.getItem('darkMode') === booleanSt
    setIsDarkMode(isDarkMode)
    changeDarkMode(isDarkMode)
  }, [])

  function changeDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function darkMode() {
    let isDarkMode = localStorage.getItem('darkMode')
    isDarkMode = !(isDarkMode === booleanSt)

    setIsDarkMode(isDarkMode)
    changeDarkMode(isDarkMode)
    localStorage.setItem('darkMode', isDarkMode)
  }

  async function onClickTestConnection() {
    setIsLoading(true)

    try {
      const { data } = await axios.get(url)
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {

    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-my-gray-100 dark:bg-my-gray-700 ">
      <button
        className="bg-white px-4 h-10 rounded-tl-3xl font-semibold text-sm border-my-gray-600 border-2 fixed bottom-0 right-0"
        onClick={darkMode}>
        {`Trocar para ${isDarkMode ? 'dark' : 'light'} mode`}
      </button>

      <div className="max-w-[980px] w-full h-full p-5 flex flex-col gap-6 rounded-sm bg-my-gray-100 dark:bg-my-gray-700">
        <div className="w-full flex gap-2 flex-col sm:flex-row">
          <input
            type={"text"}
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="w-full px-2 rounded-sm h-8 border-my-gray-600 border-2"
          />

          <button
            className="bg-white px-4 h-7 rounded-sm font-semibold text-sm border-my-gray-600 border-2 sm:h-8"
            onClick={onClickTestConnection}
          >
            Testar
          </button>
        </div>

        <div className="flex-1 text-sm rounded-sm overflow-auto bg-my-gray-100 dark:bg-my-gray-700 dark:text-my-gray-100">
          {
            isLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <ScaleLoader color={isDarkMode ? TOKENS.COLORS["my-gray"][100] : TOKENS.COLORS["my-gray"][700]} />
              </div>
            ) : (
              <pre>
                {response}
              </pre>
            )
          }
        </div>
      </div>
    </div>
  )
}