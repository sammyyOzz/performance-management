import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import { Toaster } from "sonner"
import App from './App.tsx'
import './index.css'
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ unstyled: true, classNames: { toast: "right-0" } }} pauseWhenPageIsHidden />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
