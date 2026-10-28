import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { Toaster } from "react-hot-toast";

function App() {
  return <>

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      }}
    />

    <RouterProvider router={router} />

  </>
}

export default App;
