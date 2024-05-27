import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginForm from './components/profile/login-form';
import RegistrationForm from './components/profile/registration-form';
import Profile from './components/profile/profile-page-form';
import Layout from './components/logo/layout';
import UpdateUserForm from './components/profile/update-user-form';
import ChangePasswordForm from './components/password/change-password-form';
import HomePage from './components/home/home-page-form';
import { SortingHatPage } from './components/sorting-hat/sorting-hat-page';
import { HouseProvider } from './components/context/house-provider';
import { SearchForm } from './components/spells/services/spell-search-form';
import { PotionSearchForm } from './components/potions/service/potion-search-form';
import { TokenProvider } from './components/context/token-provider';
import HouseDetails from './components/House/housedetails';
import HouseMembers from './components/House/housemembers';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <ChakraProvider>
      <HouseProvider>
      <TokenProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />}/>
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/update" element={<UpdateUserForm />} />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route path="/sortinghat" element={<SortingHatPage />} />
              <Route path="/spells" element={<SearchForm/>}/>
              <Route path="/potions" element={<PotionSearchForm />} />
              <Route path="/houses/:houseId" element={<HouseDetails />} />
              <Route path="/houses/:houseId/members" element={<HouseMembers />} />
            </Route>
          </Routes>
        </Router>
        </TokenProvider>
      </HouseProvider>
    </ChakraProvider>
  );
};

export default App;
