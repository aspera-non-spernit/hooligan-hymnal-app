import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import { RectButton } from 'react-native-gesture-handler';
import NavigationOptions from '../config/NavigationOptions';
import { HeaderBackButton } from 'react-navigation';
import { FontSizes } from '../constants';
import { Skin, DefaultColors, Palette } from '../config/Settings';
import { Ionicons } from '@expo/vector-icons';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';

class TwitterList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: 'Twitter List',
      ...NavigationOptions,
      headerLeft: (
          <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#fff" />
      )
  });

  render() {
    let handles = '';
    this.props.navigation.state.params.roster.players.forEach(player => {
      if (player.twitter)
        handles += '@' + player.twitter + ' ';
    });
      
    handles += '@ChattanoogaFC @chattahooligan @LosCFCHooligans';

    return (
      <View style={{flex: 1, padding: 10, backgroundColor: Palette.Sky }}>
        <View style={{ flex: 1, padding: 5 }}>
          <MediumText style={{backgroundColor: Palette.White, paddingHorizontal: 5, fontSize: 18}}>
            All Together, Now
          </MediumText>
          <RegularText style={{backgroundColor: Palette.White, padding: 5, marginBottom: 1}}>          
          The connection between CFC fans and the team is unique, special, and tangible. 
          Messages of encouragement, love, whatever, truly mean a lot to the players.
          {"\n"}{"\n"}
          You can copy multiple Twitter handles from the box below and paste them into a longer Twitter thread.
          </RegularText>
            <ScrollView style={{flex: 1, padding: 5, backgroundColor: Palette.White}}>
                <RegularText style={{fontSize: 18}} selectable={true}>{handles}</RegularText>
            </ScrollView>
            <ClipBorderRadius>
                <RectButton
                    style={styles.bigButton}
                    onPress={() => {Linking.openURL('https://twitter.com/intent/tweet?text=');}}
                    underlayColor="#fff"
                >
                    <Ionicons
                        name="logo-twitter"
                        size={23}
                        style={{
                            color: '#fff',
                            marginTop: 3,
                            marginBottom: 3,
                            marginLeft: 5,
                            marginRight: 5,
                            backgroundColor: 'transparent'
                        }}
                    />
                    <MediumText style={styles.bigButtonText}>Open Twitter App</MediumText>
                </RectButton>
            </ClipBorderRadius>
          </View>
      </View>
    );
  }
}

const ClipBorderRadius = ({ children, style }) => {
    return (
      <View
        style={[
          { borderRadius: BORDER_RADIUS, overflow: 'hidden', marginTop: 10 },
          style
        ]}
      >
        {children}
      </View>
    );
  };
  
const BORDER_RADIUS = 3;

const styles = StyleSheet.create({
    bigButton: {
        backgroundColor: DefaultColors.ButtonBackground,
        marginTop: 5,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
        flexDirection: 'row'
      },
      bigButtonText: {
        fontSize: FontSizes.normalButton,
        color: DefaultColors.ButtonText,
        textAlign: 'center'
      }
});

export default withUnstated(TwitterList, { globalData: GlobalDataContainer });