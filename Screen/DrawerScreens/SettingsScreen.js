import React,{useState,useEffect} from 'react';
import {View, Text,Image,  TouchableOpacity, SafeAreaView,StyleSheet,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { cos } from 'react-native-reanimated';
const SettingsScreen = ({props}) => {
  const [userinfo, setUserinfo] = useState(null);
  const [mounted, setMounted] = useState(false);
  const logout = async () => {
    AsyncStorage.clear();
    props.navigation.replace('Auth');
  }
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userinfo');
      if (value !== null) {       
        setUserinfo(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  // console.log("profile page",  AsyncStorage.getItem('userinfo'));
  useEffect(() => {
    // Update the document title using the browser API
    if (!mounted) {
      _retrieveData();    
      setMounted(true);
    }
  }, []);
  return (
    <ScrollView         
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.container}>
     
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        
          <View style={styles.body}>
            <View style={styles.bodyContent}>              
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Name</Text>   
                <Text style={styles.contents}>{userinfo?.username}</Text>   
                         
              </View>   
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Email</Text>   
                <Text  style={styles.contents}>{userinfo?.email}</Text> 
              </View>           
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Gender</Text>   
                <Text  style={styles.contents}>{userinfo?.gender}</Text> 
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Age</Text>   
                <Text  style={styles.contents}>{userinfo?.age}</Text>  
              </View>              
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Height</Text>   
                <Text  style={styles.contents}>{userinfo?.height}</Text> 
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Weight</Text>   
                <Text  style={styles.contents}>{userinfo?.weight}</Text>  
              </View>              
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Step Counter</Text>   
                <Text  style={styles.contents}>{userinfo?.step}</Text> 
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>BMI</Text>   
                <Text  style={styles.contents}>{userinfo?.bmi}</Text>  
              </View>              
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Country</Text>   
                <Text  style={styles.contents}>{userinfo?.country}</Text> 
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.property}>Contact No</Text>   
                <Text  style={styles.contents}>{userinfo?.phone}</Text> 
              </View>              
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={() => logout()}>
                <Text style={styles.buttonTextStyle}>Log out</Text>
              </TouchableOpacity>
            </View>          
          </View>
         
      </View>
      </ScrollView>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#213d65",
    height:100,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonStyle: {
    backgroundColor: '#adc93e',
    borderWidth: 0,
    color: 'black',
    borderColor: '#7DE24E',
    height: 40,
    width:"100%",
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 0,
    marginRight:0,
    marginLeft:-20,
    marginRight:-20,
    marginTop: 10,
    marginBottom: 5,
    fontSize:30,
    fontWeight:700
  },
  property:{
    fontSize:18,
    fontWeight:"800",
    color:"#213d65",
    marginLeft:10,
  }, 
  contents:{
    fontSize:16,
    fontWeight:"500",
    color:"#213d65",
    marginRight:10,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:-50,
    alignSelf:'center',
    position: 'relative',
    marginTop:-70
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    padding:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:0,
    width:'100%',
    marginLeft:-20,
    marginRight:-20,
    borderRadius:0,
    borderBottomWidth:2,
    borderBottomColor:"#213d65",
    backgroundColor: "#ffffff",
  },
});