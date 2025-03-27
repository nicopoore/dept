import { Layout } from "components";
import { Login, FlightDetails } from "pages";
import { Routes, Route } from "react-router-dom";
import ModeProvider from "./contexts/ModeContext";
import { LaunchesList } from "./containers";
import "./app.scss";
import { useAuth } from "hooks/useAuth";

export default function App() {
  const { token } = useAuth();

  return (
    <div className="App">
      <Routes>
        {token ? (
          <>
            <Route
              path="/"
              element={
                <ModeProvider>
                  <Layout>
                    <LaunchesList />
                  </Layout>
                </ModeProvider>
              }
            />
            <Route
              path=":flightNumber"
              element={
                <FlightDetails />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}
