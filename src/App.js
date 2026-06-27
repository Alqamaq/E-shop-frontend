import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {
  Login,
  Register,
  Home,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  CheckoutPage, PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/route.js";

import { useEffect, useState } from "react";
import { getAllEvents } from "./redux/actions/event.js";

import { loadUser } from "./redux/actions/user.js";
import { loadSeller } from "./redux/actions/user.js";
import store from "./redux/store.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import {
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupons,
  ShopAllOrders,
  ShopOrderDetails,
  ShopAllRefunds,
  ShopSettingPage,
} from "./routes/ShopRoute.js";
import SellerProtectedRoute from "./routes/sellerProtectedRoute.js";
import { getAllProducts } from "./redux/actions/product.js";
import { server } from "./server.js";


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeKey() {
    try {
      const { data } = await axios.get(`${server}/payment/stripeapikey`)
      setStripeApiKey(data.stripeApiKey)
      console.log('Stripe key loaded:', data.stripeApiKey)
    } catch (error) {
      console.error('Failed to fetch Stripe key:', error)
    }
  }
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.seller);

  // seller and authentication state can be used anywhere if needed
  // console.log(state.seller)

  console.log(stripeApiKey);

  useEffect(() => {
    const pathname = window.location.pathname;
    const shouldCheckSeller =
      pathname === "/shop-create" || pathname.startsWith("/dashboard");

    store.dispatch(loadUser());
    if (shouldCheckSeller) {
      store.dispatch(loadSeller());
    }
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());

    getStripeKey();

  }, []);

  return (
    <>
      {/* keep the router hidden until both user & seller auth checks complete */}
      {isLoading || loading ? null : ( // could render a spinner here instead of null
        <BrowserRouter>
          <ToastContainer />
          {
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Routes>
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <PaymentPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>

              </Elements>
            )
          }


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-user" element={<Login />} />
            <Route path="/activation/:activationToken" element={<Register />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route
              path="/profile-user"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/order/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <OrderDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/track/order/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <TrackOrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />


            {/* Shop Route */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/shop/activation/:activationToken"
              element={<SellerActivationPage />}
            />
            {/* public shop page, no auth needed */}
            <Route path="/shop/:id" element={<ShopHomePage />} />

            {/* protected seller dashboard routes */}
            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-product"
              element={
                <SellerProtectedRoute>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-products"
              element={
                <SellerProtectedRoute>
                  <ShopAllProducts />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-orders"
              element={
                <SellerProtectedRoute>
                  <ShopAllOrders />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-refunds"
              element={
                <SellerProtectedRoute>
                  <ShopAllRefunds />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <SellerProtectedRoute>
                  <ShopOrderDetails />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-event"
              element={
                <SellerProtectedRoute>
                  <ShopCreateEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-events"
              element={
                <SellerProtectedRoute>
                  <ShopAllEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-coupons"
              element={
                <SellerProtectedRoute>
                  <ShopAllCoupons />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <SellerProtectedRoute>
                  <ShopSettingPage />
                </SellerProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
