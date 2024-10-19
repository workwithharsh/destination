import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Import components
import { Layout } from "./components/Components.js";
import { Explore, Home } from "./pages/Pages.js";

// Create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
    </Route>
  )
);

// Render router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
