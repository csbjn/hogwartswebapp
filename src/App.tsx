// src/App.tsx
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
import HouseListHufflepuff from './components/House/renderer-hufflepuff';
import HouseListSlytherin from './components/House/renderer-slytherin';
import HouseListRavenclaw from './components/House/renderer-ravenclaw';
import HouseListGryffindor from './components/House/renderer-gryffindor';
import HouseMembers from './components/House/house-members';
import { SearchForm } from './components/spells/services/spell-search-form';
import { PotionSearchForm } from './components/potions/service/potion-search-form';


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
              <Route path="/house/gryffindor" element={<HouseListGryffindor />} />
              <Route path="/house/hufflepuff" element={<HouseListHufflepuff />} />
              <Route path="/house/slytherin" element={<HouseListSlytherin />} />
              <Route path="/house/ravenclaw" element={<HouseListRavenclaw />} />
              <Route path="/houses/:houseId/members" element={<HouseMembers isLoggedIn={isLoggedIn} />} />
              <Route path="/spells" element={<SearchForm/>}/>
              <Route path="/potions" element={<PotionSearchForm />} />
            </Route>
          </Routes>
        </Router>
      </HouseProvider>
    </ChakraProvider>
  );
};

export default App;
