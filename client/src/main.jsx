import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import App from './App.jsx'
import Login from './components/_auth/Login.jsx';
import DashBoard from './components/DashBoard.jsx';
import './index.css'
import SignUp from './components/_auth/SignUp.jsx';
import userLoader from './loaders/userLoader.js';
import userLoginLoader from './loaders/userLoginLoader.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: userLoginLoader
  },
  {
    path: "/login",
    element: <Login />,
    loader: userLoginLoader,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    loader: userLoader,
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
