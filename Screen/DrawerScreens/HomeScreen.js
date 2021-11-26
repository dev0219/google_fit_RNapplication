import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

// Lib
import GoogleFit, { BucketUnit, Scopes } from 'react-native-google-fit'
import moment from "moment";
import Spinner from 'react-native-loading-spinner-overlay';
import { Card, Title, Button } from 'react-native-paper';

const HomeScreen = () => {

  // Date
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  // console.log("Date==================>", start.toISOString(), end.toISOString());


  let getDailySteCpountSamples = {
    startDate: "2017-01-01T00:00:17.971Z", // required
    endDate: new Date().toISOString(), // required
    bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  const DailyCalorie = {
    startDate: start.toISOString(), // required
    endDate: end.toISOString(), // required
    basalCalculation: true, // optional, to calculate or not basalAVG over the week
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1. 
  };

  let getActivitySamples = {
    startDate: start.toISOString(), // required
    endDate: new Date().toISOString(), // required
    bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1. 
  };

  const authorize = {
    scopes: [
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_NUTRITION_READ,
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_LOCATION_READ,
      // Scopes.FITNESS_ACTIVITY_WRITE,
      // Scopes.FITNESS_BODY_WRITE,
    ],
  }

  const [getLoader, setLoader] = useState(false);
  const [getStepDate, setStepDate] = useState(0);
  const [getStepValue, setStepValue] = useState(0);
  const [getCalories, setCalories] = useState(0);
  const [getDistance, setDistance] = useState(0);


  useEffect(() => {
    setLoader(true)
    requestLocationPermission()

    GoogleFit.authorize(authorize)
      .then((authResult) => {
        if (authResult.success) {
          GetDistance();
          GetDailyStep();
          GetCalories();
          setLoader(false)
        } else {
          setLoader(false)
        }
      })
      .catch(() => {
        setLoader(false)
        console.log("AUTH_ERROR");
      })

  }, [])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "Location Permission",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
      } else {
        console.log("Location Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const Refresh = async () => {
    await GetDistance();
    await GetDailyStep();
    await GetCalories();
  }

  const GetCalories = async () => {
    setLoader(true)
    const opt = {
      startDate: start.toISOString(), // required
      endDate: end.toISOString(), // required
      basalCalculation: true, // optional, to calculate or not basalAVG over the week
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1. 
    };

    GoogleFit.getDailyCalorieSamples(opt).then((res) => {
      // console.log(res[0].calorie);
      console.log(res);
      setCalories(res[0].calorie)
    });

    setLoader(false)
  }

  const GetDailyStep = async () => {
    setLoader(true)
    await GoogleFit.getDailySteps(start.toISOString()).then((res) => {
      setStepValue(res[2].steps[0].value)
    })
      .catch((err) => { console.log(err) });
  }

  const GetDistance = async () => {
    setLoader(true)
    const res = await GoogleFit.getDailyDistanceSamples(getActivitySamples)
    res.map((Datedistance) => {
      if (moment(Datedistance.endDate).format("YYYY-MM-DD") == moment(new Date()).format("YYYY-MM-DD")) {
        setStepDate(moment(Datedistance.endDate).format("YYYY-MM-DD"))
        setDistance(Datedistance.distance / 1000)
        setLoader(false)
      }
    })
  }




  return (
    <SafeAreaView>
      <View style={styles.screen}>
        <Text style={{ color: 'black', fontSize: 30 }}>Google Fit Data</Text>

        <View style={styles.CardBackground}>
          {
            getStepDate != null || getStepDate != undefined ?
              <Card style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Card.Content>
                  <Title style={styles.lFont}>{getStepDate}</Title>
                </Card.Content>
              </Card>
              :
              null
          }
        </View>

        <View style={[styles.CardBackground, { marginTop: 20 }]}>
          {
            getCalories != null || getCalories != undefined ?
              <Card style={styles.CardBoarder}>
                <Card.Content>
                  <Title style={styles.lFont}>Calories</Title>
                  <Title>{getCalories.toFixed(2)}</Title>
                  {/* <Title>{getCalories}</Title> */}
                  <Title style={styles.mFont}>Cal</Title>
                </Card.Content>
              </Card>
              :
              null
          }
          {
            getCalories != null || getCalories != undefined ?
              <Card style={styles.CardBoarder}>
                <Card.Content>
                  <Title style={styles.lFont}>Distance</Title>
                  <Title>{getDistance.toFixed(2)}</Title>
                  <Title style={styles.mFont}>Km</Title>
                </Card.Content>
              </Card>
              :
              null
          }
        </View>

        <View style={[styles.CardBackground, { marginTop: 40 }]}>
          {
            getStepValue != null || getStepValue != undefined ?
              <Card style={styles.CardBoarder}>
                <Card.Content>
                  <Title style={styles.lFont}>STEP</Title>
                  <Title>{getStepValue.toFixed()}</Title>
                  <Title style={styles.mFont}>Steps</Title>
                </Card.Content>
              </Card>
              :
              null
          }
        </View>

        <Button mode="contained" onPress={() => Refresh()}>
          Refresh
        </Button>


        <Spinner visible={getLoader} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cdcdcd'
  },
  CardBoarder: {
    borderRadius: 10,
    width: 130,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  CardBackground: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sFont: {
    fontSize: 12
  },
  mFont: {
    fontSize: 15
  },
  lFont: {
    fontSize: 18
  }
});

export default HomeScreen;