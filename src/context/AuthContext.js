import React, { createContext, useState, useContext } from "react";
import { onAuthStateChanged , signInWithEmailAndPassword , auth  , setDoc , createUserWithEmailAndPassword , doc , db, signOut  , where , query , collection , getDocs , updateDoc  , or} from '../config/firebase/firebase';
export const AuthenticationContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextProvider = ({ children }) => {
 

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [ success , setSuccess ] = useState(null);
  const [isAdmin , setIsAdmin ] = useState(false);

  onAuthStateChanged(auth,  async (usr) => {
    // const value = await AsyncStorage.getItem('reminder_user');
    // let jsonPrsed = JSON.parse(value);

    // setIsAdmin(jsonPrsed.admin);
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } 
    else {
        setIsLoading(false);
    }
  });

  const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  const onLogin =  ( email , password ) => {
    setIsLoading(true);
    if (email == '' ) {
      setError("please enter your email");
       setTimeout(() => {
      setError('');
      setIsLoading(false);
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("please enter your password");
       setTimeout(() => {
      setError('');
      setIsLoading(false);
      
    } , 3000);
      return;
    }
  
  
    signInWithEmailAndPassword(auth, email, password)
    .then(  async (userCredential) => {

      const q = query(collection(db, "users"), where("email", "==", email ) );
      const querySnapshot = await getDocs(q);
      const usersDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';

      if ( usersDataArray.length !== 0  ) {

        const userObject = {
          id: usersDataArray[0].id,
          full_name: usersDataArray[0].full_name,
          phone_number: usersDataArray[0].phone_number,
          email: usersDataArray[0].email,
          account_type: usersDataArray[0].account_type,
        }
        await AsyncStorage.setItem('reminder_user', JSON.stringify(userObject));
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
    }
    else {
      setError("we could not find the user");
      setTimeout(() => {
        setError('');
      } , 3000);
    }
      setIsLoading(false);
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e.toString());
      setTimeout(() => {
        setError('');
      } , 3000);
    });

  }

  const onRegister = async (fullName , phoneNumber , userEmail , accountType ,  password) => {
    setIsLoading(true);

    if (fullName == '' ) {
      setError("please enter your name");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("please enter your phone number");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userEmail == '' ) {
      setError("please enter your email");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("please enter your password");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

      let idMaked = makeid(20);
      
      const users = await setDoc(doc(db, "users", idMaked ), {
        full_name: fullName,
        phone_number: phoneNumber,
        email: userEmail,
        account_type: accountType,
        joinedFamily: false,
        familyId: '',
        latitude: '',
        longitude: ''
        });

    createUserWithEmailAndPassword(auth, userEmail, password)
      .then( async (userCredential) => {
        try {
          const userObject = {
            id: idMaked,
            full_name: fullName,
            phone_number: phoneNumber,
            email: userEmail,
            account_type: accountType
          }
          await AsyncStorage.setItem('reminder_user', JSON.stringify(userObject));
         
        } catch (error) {
         
        }
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
     
       
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        setTimeout(() => {
          setError('');
        } , 3000);

      });

   }

   const editUserProfile = async ( id , fullName  , phoneNumber , accountType ,  callBack ) => {

    setIsLoading(true);

    if (fullName == '' ) {
      setError("please enter your name");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("please enter your phone number");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    const existingValue = await AsyncStorage.getItem('reminder_user');
    const parsedValue = JSON.parse(existingValue);
    parsedValue.full_name = fullName;
    parsedValue.phone_number = phoneNumber;
    parsedValue.account_type = accountType;
    await AsyncStorage.setItem('reminder_user', JSON.stringify(parsedValue));


    const docRef = doc(db, "users", id);
  
    const data = {
      phone_number: phoneNumber,
      full_name: fullName,
    };

   await updateDoc(docRef, data);

    setSuccess("successfully added");
   
    setTimeout(() => {
      setSuccess(null);
      if (callBack) {
        callBack();
      }
      setIsLoading(false);
    } , 3000);
  }


   const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsAdmin(false);
      setError(null);
    });
  };


  return (
    <AuthenticationContext.Provider
      value={{ 
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        error,
        setError,
        success,
        onLogin,
        onRegister,
        onLogout,
        editUserProfile
       }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
