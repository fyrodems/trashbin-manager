import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './auth/authProvider'
import { client } from './graphql/client'
import './index.scss'
import { router } from './routes'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
)
