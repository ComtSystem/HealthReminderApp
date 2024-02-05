import React, { createContext, useState  } from "react";
import {  query , collection , getDocs , db , setDoc , doc  , where , updateDoc} from "../config/firebase/firebase";
export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ success , setSucces ] = useState(null);
 
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


  const addMedecineMethod = async ( type , name , quantity, per , familyCode ,  callBack) => {

    setIsLoading(true);
    if (type == '' ) {
      setError("please enter type of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (name == '' ) {
      setError("please enter name of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (quantity == '' ) {
      setError("please enter category of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (per == '' ) {
      setError("please enter medcien quantity");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

  

    let idMaked = makeid(20);
   
    try {
      const Medecines = await setDoc(doc(db, 'Medecines', idMaked), {
        med_type: type,
        med_name: name,
        med_quantity: quantity,
        med_per: per,
        family_code : familyCode,
      });

      setSucces("added successfully");
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("Something went wrong");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addReminderMethod = async ( startDate , endDate , theTime, type ,  familyCode , callBack) => {

    setIsLoading(true);
    if (type == '' ) {
      setError("please enter type of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (startDate == '' ) {
      setError("please enter date of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (endDate == '' ) {
      setError("please enter end date of medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (theTime == '' ) {
      setError("please enter time for taking the medecine");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);
   
    try {
      const Reminders = await setDoc(doc(db, 'Reminders', idMaked), {
        med_type: type,
        remind_start_date: startDate,
        remind_end_date: endDate,
        remind_time: theTime,
        family_code : familyCode,
      });

      setSucces("added successfully");
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("Something went wrong");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  function getRandomOffset(min, max) {
    return Math.random() * (max - min) + min;
  }

  const addFamilyMethod = async ( familyName , familyCode , userId , callBack) => {

    setIsLoading(true);
    if (familyName == '' ) {
      setError("Please enter family name");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (familyCode == '' ) {
      setError("Please enter family code");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);
   
    try {
      const families = await setDoc(doc(db, 'families', idMaked), {
        family_name: familyName,
        family_code: familyCode,
        user_id : userId,
      });

      const docRef = doc(db, "users", userId);
  
      const data = {
        joinedFamily: true,
        familyId: familyCode,
      };
  
     await updateDoc(docRef, data);


     setSucces("added successfully");
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("Something went wrong");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const joinFamilyMethod = async ( familyCode, userId ,  callBack) => {

    setIsLoading(true);
    if (familyCode == '' ) {
      setError("Please Enter Family Code");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

   
    try {
      const q = query(collection(db, "families"), where("family_code", "==", familyCode ) );
      const querySnapshot = await getDocs(q);
      const familiesDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';

      if ( familiesDataArray.length !== 0  ) {

      // Original latitude and longitude values
      const originalLatitude = 16.909683;
      const originalLongitude = 42.567902;

      // Generate random offsets (adjust these values as needed)
      const latitudeOffset = getRandomOffset(-0.001, 0.001); // Modify the range as needed
      const longitudeOffset = getRandomOffset(-0.001, 0.001); // Modify the range as needed

      // Calculate the new latitude and longitude values
      const newLatitude = originalLatitude + latitudeOffset;
      const newLongitude = originalLongitude + longitudeOffset;

      // Update the Firestore document
      const docRef = doc(db, "users", userId);

      const data = {
        joinedFamily: true,
        familyId: familyCode,
        latitude: newLatitude,
        longitude: newLongitude
      };
    
       await updateDoc(docRef, data);
        setSucces("Joined successfully");
        setIsLoading(false);
    }
    else {
      setError("we could not find that family");
      setTimeout(() => {
        setError('');
      } , 3000);
    }
      setIsLoading(false);
     
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
     setError("Something went wrong");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }
  }




  function convertTimeToHourMinuteString(timeObject) {
    const date = new Date(timeObject.seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if necessary
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if necessary
  
    return `${hours}:${minutes}`;
  }

  function convertTimeToDateString(timeObject) {
    if (!timeObject.seconds) {
      return ''; // Return an empty string if seconds property is undefined
    }
  
    const date = new Date(timeObject.seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

  
    return `${year}-${month}-${day}`;
  }


  return (
    <AppContext.Provider
      value={{ 
        isLoading,
        error,
        success,
        addMedecineMethod,
        addReminderMethod,
        addFamilyMethod,
        joinFamilyMethod,
        convertTimeToHourMinuteString,
        convertTimeToDateString
       }}
    >
      {children}
    </AppContext.Provider>
  );
};
