
import React, { useState } from 'react';
import { Page } from './types';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import FoodHostingPage from './pages/FoodHostingPage';
import MembersPage from './pages/MembersPage';
import CoursesPage from './pages/CoursesPage';
import MuzmurPage from './pages/MuzmurPage';
import TeamsPage from './pages/TeamsPage';
import FinancialPage from './pages/FinancialPage';

const AUTHORIZED_STEWARDS = ['dereje', 'estifanos', 'henok', 'biruk', 'mahlet', 'alemu'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Splash);
  const [user, setUser] = useState<string | null>(null);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (username: string) => {
    setUser(username);
    navigate(Page.Home);
  };

  const isAuthorized = user ? AUTHORIZED_STEWARDS.includes(user.toLowerCase()) : false;

  const renderPage = () => {
    switch (currentPage) {
      case Page.Splash:
        return <SplashPage onEnter={() => navigate(Page.Login)} />;
      case Page.Login:
        return <LoginPage onLogin={handleLogin} />;
      default:
        return (
          <DashboardLayout 
            activePage={currentPage} 
            onNavigate={navigate} 
            currentUser={user}
            isAuthorized={isAuthorized}
          >
            {currentPage === Page.Home && <HomePage onNavigate={navigate} />}
            {currentPage === Page.Announcements && <AnnouncementsPage isAuthorized={isAuthorized} memberName={user || 'Anonymous'} />}
            {currentPage === Page.FoodHosting && <FoodHostingPage />}
            {currentPage === Page.Members && <MembersPage isAuthorized={isAuthorized} />}
            {currentPage === Page.Courses && <CoursesPage isAuthorized={isAuthorized} />}
            {currentPage === Page.Muzmur && <MuzmurPage isAuthorized={isAuthorized} />}
            {currentPage === Page.Teams && <TeamsPage />}
            {currentPage === Page.Financial && <FinancialPage isAuthorized={isAuthorized} onNavigate={navigate} currentUser={user} />}
          </DashboardLayout>
        );
    }
  };

  return (
    <div className="relative min-h-screen transition-all duration-700">
      {renderPage()}
    </div>
  );
};

export default App;
