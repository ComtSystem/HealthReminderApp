import React, { createContext, useState  } from "react";
import {  query , collection , getDocs , db , setDoc , doc  } from "../config/firebase/firebase";
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


  const addMedecineMethod = async ( type , name , quantity, per , callBack) => {

    setIsLoading(true);
    if (type == '' ) {
      setError("يرجى ادخال نوع الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (name == '' ) {
      setError("يرجى ادخال اسم الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (quantity == '' ) {
      setError("يرجى ادخال تصنيف الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (per == '' ) {
      setError("يرجى ادخال كمية الدواء ");
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
      });

      setSucces("تمت اضافة الدواء بنجاح");
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addReminderMethod = async ( startDate , endDate , theTime, type , callBack) => {

    setIsLoading(true);
    if (type == '' ) {
      setError("يرجى ادخال نوع الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (startDate == '' ) {
      setError("يرجى ادخال تاريخ الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (endDate == '' ) {
      setError("يرجى ادخال انتهاء الدواء ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (theTime == '' ) {
      setError("يرجى ادخال الوقت ");
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
      });

      setSucces("تمت اضافة التنبيه بنجاح");
      setTimeout( () => {
        setSucces('');
        if (callBack) {
          callBack();
        }
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }



  return (
    <AppContext.Provider
      value={{ 
        isLoading,
        error,
        success,
        addMedecineMethod,
        addReminderMethod
       }}
    >
      {children}
    </AppContext.Provider>
  );
};
