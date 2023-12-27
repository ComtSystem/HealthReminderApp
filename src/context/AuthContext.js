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
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      setIsLoading(false);
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
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
        }
        await AsyncStorage.setItem('reminder_user', JSON.stringify(userObject));
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
    }
    else {
      setError("لم نعثر على المستخدم");
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
      setError("يرجى ادخال اسمك الكامل");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("يرجى ادخال رقم الهاتف");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userEmail == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
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
        });

    createUserWithEmailAndPassword(auth, userEmail, password)
      .then( async (userCredential) => {
        try {
          const userObject = {
            id: idMaked,
            full_name: fullName,
            phone_number: phoneNumber,
            email: userEmail,
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
       
        if (e.code === "auth/email-already-in-use") {
          setError("الايميل موجود بالفعل , يرجى تسجيل الدخول");
        } else if (e.code === "auth/invalid-email") {
          setError("الايميل غير صحيح , يرجى كتابة الايميل بشكل صحيح");
        } 
         else if (e.code === "auth/weak-password") {
          setError("كلمة المرور ضعيفة يرجى ادخال كلمة مرور أقوى");
        } else if (e.code === "auth/network-request-failed") {
          setError("حدث خطأ في الشبكة");
        } else if (e.code === "auth/too-many-requests") {
          setError("تم تجاوز عدد المحاولات المسموح به , يرجى المحاولة في وقت أخر");
        } else if (e.code === "auth/user-disabled") {
          setError("تم تعطيل حسابك , يرجى التواصل مع الدعم");
        } else {
          setError(e.toString());
        }
        setTimeout(() => {
          setError('');
        } , 3000);

      });

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
        onLogout
       }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
