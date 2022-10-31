import { useRoutes } from "react-router-dom"
import routers from "./router"
import 'antd/dist/antd.css';
import { Suspense } from "react";
import { Spin } from "antd";
import { GlobalStyle } from "./GlobalStyle";

function App() {

  const element = useRoutes(routers)

  const loader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={
          <div className="loader" style={loader}>
            <Spin size="large" />
          </div>
        }>
        {element}
      </Suspense>
    </>
  )
}

export default App
