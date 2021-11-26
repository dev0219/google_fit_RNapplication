import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {DrawerActions} from 'react-navigation';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    console.log(props);
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;