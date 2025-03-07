import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FadeIn from 'react-native-fade-in-image';
import { withNavigation } from 'react-navigation';
import { BoldText, RegularText, MediumText } from './StyledText';
import { Colors, FontSizes } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { Skin, DefaultColors } from '../config/Settings';

@withNavigation
export default class GoalkeeperNicknameCard extends React.Component {
  render() {
    const { goalkeeperNickname } = this.props;

    if (!goalkeeperNickname) {
      return <View />;
    }

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', 
        backgroundColor: goalkeeperNickname.backgroundColor,
        paddingVertical: 5, paddingHorizontal: 10}}>
        <Ionicons
              name="md-hand"
              size={23}
              style={{
                color: goalkeeperNickname.textColor,
                backgroundColor: 'transparent',
                marginHorizontal: 5,
              }}
            />
        <RegularText style={[styles.text, {color: goalkeeperNickname.textColor}]}>We're gonna score on you, </RegularText>
        <BoldText style={[styles.nickname, {color: goalkeeperNickname.textColor}]}>
        {goalkeeperNickname.nickname}
        </BoldText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: FontSizes.subtitle
  },
  nickname: {
    fontSize: FontSizes.subtitle,
    marginRight: 5
  }
});
