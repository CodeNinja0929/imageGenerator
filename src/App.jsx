import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '@/Layout';
import { AICanvas, Home, TextToImage, Guides, Pricing, Community, ImageDetailPage, Manage } from '@/pages';
import { Canvas } from '@/containers/AICanvas';
import ProtectedRoute from '@/Routes/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthProvider';

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route
              path="/text-to-image"
              element={
                <ProtectedRoute>
                  <TextToImage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/aicanvas"
              element={
                <ProtectedRoute>
                  <AICanvas />
                </ProtectedRoute>
              }
            />

            <Route
              path="/aicanvas/:uuid"
              element={
                <ProtectedRoute>
                  <Canvas />
                </ProtectedRoute>
              }
            />
            
            <Route path="/community" element={<Community />} />
          </Route>
          <Route path="/image/:id" element={<ImageDetailPage />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
