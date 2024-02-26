import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/CustomMainLayout';
import ErrorLayout from '../layouts/ErrorLayout';
import AdminDashboard from 'pages/elena_dashboard/AdminDashboard';
import Monitoring from 'pages/elena_dashboard/Tracking/Tracking';
import { FilterData, FilterProvider } from 'context/FilterContext';
import ReportKMTracking from 'pages/report/reportView/KMTracking/ReportKM';
import { PingData } from 'context/PingContext';
import ReportLayout from 'layouts/ReportLayout';
import { WebSocketProvider } from 'context/SocketContext';
import ReportIdle from 'pages/report/reportView/Idle Report/IdleReport';

// const Landing = lazy(() => import('components/pages/landing/Landing'));
const Error404 = lazy(() => import('components/errors/Error404'));
const Error500 = lazy(() => import('components/errors/Error500'));
const Login = lazy(() => import('pages/login_page/Login'));
const ForgetPassword = lazy(() =>
  import('pages/forget_password/ForgetPassword')
);
const Logout = lazy(() => import('pages/logout_page/Logout'));
const TrackingPage = lazy(() => import('pages/tracking_page/TrackingPage'));

const FalconRoutes = () => {
  var loggedInUser = JSON.parse(window.sessionStorage.getItem('loggedInUser'));
  // document.location.pathname !== '/login' &&
  // if (loggedInUser === null)
  //   window.location.href = '/dashboard';

  return (
    <FilterData>
      <WebSocketProvider>
        <PingData>
          <Routes>
            {/* <Route
        path="/landing"
        element={
          <Suspense fallback={''}>
            <Landing />
          </Suspense>
        }
      /> */}

            {/*- ------------- Error ---------------------------  */}
            <Route element={<ErrorLayout />}>
              <Route
                path="/errors/404"
                element={
                  <Suspense fallback={''}>
                    <Error404 />
                  </Suspense>
                }
              />
              <Route
                path="/errors/500"
                element={
                  <Suspense fallback={''}>
                    <Error500 />
                  </Suspense>
                }
              />
            </Route>

            {/*- ------------- Authentication ---------------------------  */}
            <Route
              path="/login"
              element={
                <Suspense fallback={''}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path=""
              element={
                <Suspense fallback={''}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/logout"
              element={
                <Suspense fallback={''}>
                  <Logout />
                </Suspense>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <Suspense fallback={''}>
                  <ForgetPassword />
                </Suspense>
              }
            />

            {/*- ------------- Dashboard ---------------------------  */}

            <Route element={<MainLayout />}>
              <Route
                path="/dashboard"
                element={
                  // loggedInUser &&
                  // (loggedInUser?.user?.companies ? (
                  //   // <Suspense fallback={''}>
                  //   <AdminDashboard />
                  // ) : // </Suspense>
                  // loggedInUser?.user?.voc || loggedInUser?.user?.school ? (
                  //   // <Suspense fallback={''}>
                  //   <VehicleDashboard />
                  // ) : // </Suspense>
                  // null)
                  <Suspense fallback={''}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route path="/tracking" element={<Monitoring />} />
              {/* <Route
            path="/report"
            element={
              <Suspense fallback={''}>
                <Report />
              </Suspense>
            }
          /> */}
            </Route>
            <Route element={<ReportLayout />}>
              <Route
                path="/report/KM-report"
                element={
                  <Suspense>
                    <ReportKMTracking />
                  </Suspense>
                }
              />
              <Route
                path="/report/Idle"
                element={
                  <Suspense>
                    <ReportIdle />
                  </Suspense>
                }
              />
              {/* <Route
              path="/report/unlit"
              element={
                <Suspense>
                  <ReportUnlit />
                </Suspense>
              }
            /> */}
            </Route>

            {/*- ------------- Tracking ---------------------------  */}

            {/* <Navigate to="/errors/404" /> */}
            <Route
              path="*"
              element={
                <Suspense fallback={''}>
                  <Navigate to="/errors/404" replace />
                </Suspense>
              }
            />

            {/* MONITORING PAGE */}
            {/* <Route path="/map/:buoyName" component={LeafletMapExample} /> */}
          </Routes>
        </PingData>
      </WebSocketProvider>
    </FilterData>
  );
};

export default FalconRoutes;
