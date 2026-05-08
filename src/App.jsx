/* Router import */
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router'

/* Pages import */
import DashboardPage from './containers/DashboardPage'
import JournalPage from './containers/JournalPage'
import TradeFormPage from './containers/TradeFormPage'
import AnalyticsPage from './containers/AnalyticsPage'
import ErrorPage from './containers/ErrorPage'
import ProfilePage from './containers/ProfilePage'
import ProfileFormPage from './containers/ProfileFormPage'

/* Provider import */
import FormProvider from './data/FormContext'
import { DataProvider } from './data/ArticlesContext'
import { StatisticsProvider } from './data/StatisticsContext'

// Router will take care of the website navigation
  // Depending on the path, the corresponding page will be rendered
const router = createBrowserRouter([
  {
    path:"/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />
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
  {
    path:"/profile",
    element: <ProfilePage />
  },
  {
    path:"/profileForm",
    element: <ProfileFormPage />
  }
])

const App = () => {
  return (
    <DataProvider>
      <FormProvider>
        <StatisticsProvider>
          <RouterProvider router={router} /> 
        </StatisticsProvider>
      </FormProvider>
    </DataProvider>
  )
}

export default App;
