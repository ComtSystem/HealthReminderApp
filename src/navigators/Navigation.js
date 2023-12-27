import React , {useContext} from "react";
import {NavigationContainer} from '@react-navigation/native';
import { AppNavigator } from "./AppNavigator";
import { AppAuthNavigator } from "./AppAuthNavigator";
import {  AuthenticationContext } from '../context/AuthContext';


export const Navigation = () => {

  const { isAuthenticated  } = useContext(AuthenticationContext);


  return (
    <>
  <NavigationContainer>


  { isAuthenticated &&  (
    <AppAuthNavigator />
  ) }

  { !isAuthenticated && (
        <AppNavigator />
  ) }

    </NavigationContainer>
    </>
   
  );
};
