import React from 'react';
import { Image, SectionList, StyleSheet, View, Text } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { ScrollView, RectButton } from 'react-native-gesture-handler';

import { BoldText, MediumText, RegularText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import NavigationOptions from '../config/NavigationOptions';

import songs from '../data/songs.json';

const gameSongs = songs.filter(song => song.category === 'game');
const playerSongs = songs.filter(song => song.category === 'player');
const teamSongs = songs.filter(song => song.category === 'team');

const SongData = [
  { data: gameSongs, title: 'Game Songs' },
  { data: playerSongs, title: 'Player Songs' },
  { data: teamSongs, title: 'Team Songs' }
];

class SpeakerRow extends React.Component {
  render() {
    const { item: speaker } = this.props;

    return (
      <RectButton
        onPress={this._handlePress}
        activeOpacity={0.05}
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <View style={styles.row}>
          <View style={styles.rowData}>
            <BoldText>{speaker.name}</BoldText>
            {speaker.organization ? (
              <MediumText>{speaker.organization}</MediumText>
            ) : null}
            <RegularText>{speaker.title}</RegularText>
          </View>
        </View>
      </RectButton>
    );
  }

  _handlePress = () => {
    this.props.onPress(this.props.item);
  };
}

export default class Songs extends React.Component {
  static navigationOptions = {
    title: 'Songs',
    ...NavigationOptions
  };

  render() {
    return (
      <LoadingPlaceholder>
        <SectionList
          renderScrollComponent={props => <ScrollView {...props} />}
          stickySectionHeadersEnabled={true}
          renderItem={this._renderItem}
          renderSectionHeader={this._renderSectionHeader}
          sections={SongData}
          keyExtractor={(item, index) => index}
        />
      </LoadingPlaceholder>
    );
  }

  _renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.sectionHeader}>
        <RegularText>{section.title}</RegularText>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    return <SpeakerRow item={item} onPress={this._handlePressRow} />;
  };

  _handlePressRow = song => {
    this.props.navigation.navigate('SingleSongScreen', { song });
  };
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
    flexDirection: 'row'
  },
  rowAvatarContainer: {
    paddingVertical: 5,
    paddingRight: 10,
    paddingLeft: 0
  },
  rowData: {
    flex: 1
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee'
  }
});
