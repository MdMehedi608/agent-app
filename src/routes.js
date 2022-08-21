import ChallanPage from './pages/challan/Challan'
import DemandDetailsPage from './pages/demand/DemandDetails'
import { default as DemandListPage } from './pages/demand/Index'
import AgentOrderDetails from './pages/order/AgentOrderDetails'
import AgentOrderList from './pages/order/AgentOrderList'
import BookPage from './pages/order/Book'
import BookDetailsPage from './pages/order/BookDetails'
import ConfirmPage from './pages/order/Confirm'
import EmptyCartPage from './pages/order/EmptyCart'
import MyCartPage from './pages/order/MyCart'
import LibraryStatementPage from './pages/print/marketing/LibraryStatement'

const routes = [
  // { path: '/', exact: true, name: 'Books' },
  // { path: '/home', name: 'Home', element: MainHomePage },
  { path: '/new-demand', name: 'New Demand', element: BookPage },
  { path: '/demand', name: 'Demand', element: DemandListPage },
  { path: '/demand-details:no', name: 'Demand Details', element: DemandDetailsPage },
  { path: '/book-details:id', name: 'Book Details', element: BookDetailsPage },
  { path: '/cart', name: 'My Cart', element: MyCartPage },
  { path: '/empty-cart', name: 'Empty Cart', element: EmptyCartPage },
  { path: '/confirm-message', name: 'Confirmation', element: ConfirmPage },
  { path: '/order', name: 'Order', element: AgentOrderList },
  { path: '/order-details/no', name: 'Agent Order Details', element: AgentOrderDetails },
  { path: '/challan', name: 'Challan', element: ChallanPage },
  { path: '/library-statement', name: 'Library Statement', element: LibraryStatementPage },
]

export default routes
