import firebase from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

export default function useAuthState() {
  const [authState, setAuthState] = useState({
    loading: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthState({ loading: false, user });
      } else {
        setAuthState({ loading: false, user: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return [authState.user, authState.loading];
}