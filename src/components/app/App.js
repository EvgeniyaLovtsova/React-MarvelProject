import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleComic from "../singleComic/singleComic";
import SingleChar from "../singleChar/singleChar";

const Page404 = lazy(() => import("../pages/404")); //Dynamic lazy loading
const MainPage = lazy(() => import("../pages/mainPage"));
const ComicsPage = lazy(() => import("../pages/comicsPage"));
const SinglePage = lazy(() => import("../pages/singlePage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComic} dataType="comic" />
                }
              />
              <Route
                path="/character/:id"
                element={<SinglePage Component={SingleChar} dataType="char" />}
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
