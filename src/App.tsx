import { MainLayout } from '@layouts/MainLayout';
import { GeneratePage } from '@pages/Generate/GeneratePage';
import { HistoryPage } from '@pages/History';
import { HomePage } from '@pages/Home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/generate" element={<GeneratePage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
