import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import DashboardPage from './containers/DashboardPage'
import JournalPage from './containers/JournalPage'
import TradeFormPage from './containers/TradeFormPage'
import AnalyticsPage from './containers/AnalyticsPage'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router'


// Router will take care of the webiste navigation
// TODO add errorElement
const router = createBrowserRouter([
  {
    path:"/",
    element: <DashboardPage />,
  },
  {
    path:"/journal",
    element: <JournalPage />,
  },
  {
    path:"/tradeForm",
    element: <TradeFormPage />,
  },
  {
    path:"/analytics",
    element: <AnalyticsPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
    {/* // we pass the defined path above as a value */}
  </StrictMode>,
)
