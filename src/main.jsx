import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { Fallback } from './components';
import AuthProvider from './context/AuthContext';
import SidebarProvider from './context/SidebarContext';
import './index.css';
import { makeServer } from './server';

// Call make Server
makeServer();
const errorHandler = (error, errorInfo) => {
  console.log('Logging Error', error);
  console.log('Logging ErrorInfo', errorInfo);
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
    <ChakraProvider>
      <AuthProvider>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </AuthProvider>
    </ChakraProvider>
  </ErrorBoundary>
);
