import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Router import */
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router'

/* Pages import */
import DashboardPage from './containers/DashboardPage'
import JournalPage from './containers/JournalPage'
import TradeFormPage from './containers/TradeFormPage'
import AnalyticsPage from './containers/AnalyticsPage'

/* Styles import */
import './index.css'
import './styles/AnalyticsStyle.css'
import './styles/DashboardStyle.css'
import './styles/JournalStyle.css'
import './styles/TradeFormStyle.css'

/* Provider import */
import FormProvider from './data/FormContext'
import { DataProvider } from './data/DataContext'
import { StatisticsProvider } from './data/StatisticsContext'

// Router will take care of the website navigation
  // Depending on the path, the corresponding page will be rendered
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
    <DataProvider>
      <FormProvider>
        <StatisticsProvider>
          <RouterProvider router={router} /> 
        </StatisticsProvider>
      </FormProvider>
    </DataProvider>
  </StrictMode>,
)
