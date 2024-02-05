import { StatusBar } from 'expo-status-bar';
import { useRef, useState  , useCallback} from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  query , collection , getDocs , db  , getDoc , doc , where}  from "../config/firebase/firebase";

export default function MapScreen() {
  const [isLoading , setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
   
  });
  const mapRef = useRef();

  const onRegionChange = (region) => {
  
  };
  const [familiesData, setFamiliesData] = useState(null);



  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('reminder_user');
          let jsonPrsed = JSON.parse(value);
          console.log(jsonPrsed)
          const docRef = doc(db, "users", jsonPrsed.id );
          const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              try {
                console.log(docSnap.data().familyId)
                const q = query(collection(db, "users") , where("familyId", "==", docSnap.data().familyId ) );
                const querySnapshot = await getDocs(q);
                const famData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                console.log(famData)
                setFamiliesData(famData);
                setIsLoading(false)
              } catch (error) {
                setError(error.message);
              } finally {
                setIsLoading(false);
              }

            } else {
              setIsLoading(false);
            }
          setIsLoading(false);
        } catch (error) {
        }
      };
      getData();

  

    }, [])
  );


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef} 
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 16.909683,
          latitudeDelta: 1.05, // Adjust this value to reduce zoom
          longitude: 42.567902,
          longitudeDelta: 1.05, // Adjust this value to reduce zoom
        }}
       //  customMapStyle={mapJson}
      >

        {isLoading ? (
         <Marker 
         coordinate={{ latitude: 16.909683, longitude: 42.567902}}
              pinColor='#0000ff'
            />
        ) : (
          familiesData && familiesData.latitude !== '' && familiesData.map(({ latitude , longitude } , index) => (
            <Marker 
            key={index}
            coordinate={{
              longitude: longitude ? longitude : 16.909683,
              latitude: latitude ? latitude : 42.567902
            }}
                 pinColor='#0000ff'
               />
                 ))
        )}

       
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width:'100%',
    height: '100%'
  },
  mapOverlay: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 5,
    padding: 16,
    left: "25%",
    width: "50%",
    textAlign: "center"
  }
});