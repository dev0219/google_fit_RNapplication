import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import PhoneInput from "react-native-phone-number-input";
import Loader from './Components/Loader';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [checked, setChecked] = useState('male');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [usercountry,setCountry] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhone,setFormattedPhonenumber] = useState('');
  const [userStep,setUserStep] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [weight, setUserWeight] = useState('');
  const [height, setUserHeight] = useState('');
  // const [BMI, setUserBMI] = useState('');
  const [phonevalue, setUserphoneValue] = useState("");
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();
  const heightInputRef = createRef();
  const weightInputRef = createRef();
  // const bmiInputRef = createRef();
  const stepInputRef = createRef();
  const phoneInput  = createRef(null);
  const handleSubmitButton = () => {


    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if(!usercountry) {
      alert('please fill Country');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    // if (!userAddress) {
    //   alert('Please fill Address');
    //   return;
    // }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userPhone) {
      alert('Please fill userPhone');
      return;
    }
    if (!height) {
      alert('Please fill height');
      return;
    }
    if (!weight) {
      alert('Please fill weight');
      return;
    }
    if (!userStep) {
      alert('Please fill Step');
      return;
    }
    // if (!BMI) {
    //   alert('Please fill BMI');
    //   return;
    // }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      phone:"+"+usercountry.callingCode[0].toString() + phonevalue,
      country:usercountry.name,
      height:height,
      weight:weight,
      step:userStep,
      // BMI:BMI,
      gender:checked,
      // address: userAddress,
      password: userPassword,
    };

    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');  
   
    fetch('http://innosens.com.my/fit/api/register.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        setIsRegistraionSuccess(true);
        console.log(
          'Registration Successful. Please Login to proceed'
        );
      } else {
        setErrortext(responseJson.msg);
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
    });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/google_fit.png')}
          style={{
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: 'http://innosens.com.my/fit/users/dist/img/user8-128x128.jpg'}}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              margin: 30,
              borderRadius: 50,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.genderSectionSytle}>    
        
                         
              <RadioButton
                value="male"
                status={ checked === 'male' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('male')}
              /><Text  style={{marginTop:10,color:"#8b9cb5"}}>Male</Text>
              <RadioButton
                value="female"
                status={ checked === 'female' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('female')}
              /><Text style={{marginTop:10,color:"#8b9cb5"}}>Female</Text>
           
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              underlineColorAndroid="#f000"
              placeholder="Age"
              placeholderTextColor="#8b9cb5"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                heightInputRef.current &&
                heightInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserHeight) =>
                setUserHeight(UserHeight)
              }
              underlineColorAndroid="#f000"
              placeholder="Height"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={heightInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                weightInputRef.current &&
                weightInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserWeight) =>
                setUserWeight(UserWeight)
              }
              underlineColorAndroid="#f000"
              placeholder="Weight"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={weightInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                bmiInputRef.current &&
                bmiInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          {/* <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserBMI) =>
                setUserBMI(UserBMI)
              }
              underlineColorAndroid="#f000"
              placeholder="BMI"
              placeholderTextColor="#7DE24E"
              autoCapitalize="sentences"
              ref={bmiInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View> */}
          <View style={styles.phoneSection}>
            <PhoneInput
             style={styles.inputStyle}
              ref={phoneInput}
              defaultValue={phonevalue}
              defaultCode="DM"
              layout="first"
              onChangeCountry={(text) => {
                setCountry(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedPhonenumber(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
        
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(text) => {
                setUserphoneValue(text);
              }}
              underlineColorAndroid="#f000"
              placeholder="Contact No"
              value={phonevalue}
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                stepInputRef.current &&
                stepInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(Userstep) =>
                setUserStep(Userstep)
              }
              underlineColorAndroid="#f000"
              placeholder="Target Step"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={stepInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={styles.registerTextStyle}
            onPress={() => navigation.navigate('LoginScreen')}>
            Already have an account ? Login now
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  genderSectionSytle:{
    flexDirection: 'row',
    height: 45,
    marginLeft: 15,
    
    right:0,
    margin: 10,
    width:"93%",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#7DE24E',
  },
  phoneSection: {
    flexDirection: 'row',
    height: 45,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#adc93e',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop:5,
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputStyle: {
    flex:1,
    height:45,
    color: 'black',
    marginLeft:-20,
    marginRight:-20,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#7DE24E',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});