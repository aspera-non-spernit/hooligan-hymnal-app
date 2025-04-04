import React from 'react';
import {
  ViewPagerAndroid,
  Image,
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import SongView from '../components/SongView';
import NavigationOptions from '../config/NavigationOptions';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import withUnstated from '@airship/with-unstated';
import GlobalDataContainer from '../containers/GlobalDataContainer';
import { FontSizes, Layout } from '../constants';
import MenuButton from '../components/MenuButton';
import { BoldText, MediumText, RegularText, UnderlineText } from '../components/StyledText';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import TableOfContentsInline from './TableOfContentsInline';
import { Skin, DefaultColors} from '../config/Settings';

const screenWidth = Dimensions.get('window').width;
const firstValidPageIndex = 1;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff'
  },
  chapterText: {
    textAlign: 'center',
  },
  tocButtonStyle: {
    backgroundColor: Skin.Songbook_ToCButtonBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 0,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexDirection: 'row'
  },
  tocButtonText: {
    fontSize: FontSizes.normalButton,
    color: '#fff',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    width: 100 + '%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Skin.Songbook_Background
  }
});

let defaultChapterTitle = 'Cover';

// Android uses ViewPagerAndroid
// iOS uses ScrollView with pagingEnabled and horizontal properties
class Songbook extends React.Component {
  static navigationOptions = {
    title: 'Songbook',
    ...NavigationOptions
  };

  state = {
    chapter_title: defaultChapterTitle,
    tocButtonDisplay: true,
    songViews: [],
    songs: [],
    pageCount: 0
  };

  componentDidMount() {
    this.setData();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.globalData.state.songs &&
      this.props.globalData.state.songs
    ) {
      this.setData();
    }
  }

  setData = () => {
    let songViews = [];
    let songs = [];
    let pageCount = 0;
    this.props.globalData.state.songbook.chapters.forEach(chapterChild => {
      chapterChild.songs.forEach(songChild => {
        try {
          let item = this.props.globalData.state.songs.filter(
            song => song._id === songChild._id
          )[0];
          item.chapter_title = chapterChild.chapter_title;
          pageCount++;
          songs.push({ index: pageCount, song: item });
          songViews.push(
            <View
              key={item._id}
              chapter_title={chapterChild.chapter_title}
              style={{ flex: 1, width: screenWidth }}
            >
              <SongView song={item} pageCount={pageCount} />
            </View>
          );
        } catch (err) {
          console.log(songChild._id + ' not found in songs database');
        }
      });
    });

    this.setState({ songViews, songs, pageCount });
  };

  update() {
    console.log('update');
  }

  render() {
    let tocButton = null;

    if (this.state.tocButtonDisplay) {
      tocButton = (
        <RectButton
          style={styles.tocButtonStyle}
          onPress={this._handlePressTOCButton}
          underlayColor="#fff"
        >
          <Ionicons
            name="md-list"
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
          <RegularText style={styles.tocButtonText}>
            Table of Contents
          </RegularText>
        </RectButton>
      );
    }

    return (
      <LoadingPlaceholder>
        <View style={styles.sectionHeader}>
          <RegularText style={styles.chapterText}>{this.state.chapter_title}</RegularText>
        </View>
        <View style={styles.container}>
          <ScrollView key={'songbookScrollView'}
            ref={view => (this._scrollView = view)}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            horizontal={true}
            pagingEnabled={true}
            onMomentumScrollEnd={this._onSongbookMomentumScrollEnd}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1 }} />
              <Image
                style={{ width: screenWidth, height: screenWidth }}
                source={require('../../assets/songbook-front-cover-heebo.png')}
              />
              <View style={{ flex: 1 }} />
              <RegularText>Swipe Left/Right to View Songs</RegularText>
              <View style={{ flex: 1 }} />
            </View>
            {this.state.songViews}
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: screenWidth
              }}
            >
              <TableOfContentsInline
                style={{ width: screenWidth }}
                scrollToSong={this.scrollToSong}
                setCurrentSong={this.props.globalData.setCurrentSong}
                songbook={this.props.globalData.state.songbook}
                songs={this.props.globalData.state.songs}
              />
            </View>
          </ScrollView>
          {tocButton}
        </View>
      </LoadingPlaceholder>
    );
  }

  _handlePressTOCButton = () => {
    this.scrollToToC();
  };

  _onSongbookMomentumScrollEnd = ({ nativeEvent }) => {
    const pageIndex = Math.round(nativeEvent.contentOffset.x / screenWidth);

    if (this.state.pageCount + 1 === pageIndex) {
      this.setState({
        tocButtonDisplay: false,
        chapter_title: 'Table of Contents'
      });
    } else if (firstValidPageIndex <= pageIndex) {
      this.setState({
        tocButtonDisplay: true,
        chapter_title: this.state.songs[pageIndex - firstValidPageIndex].song
          .chapter_title
      });
    } else {
      this.setState({
        tocButtonDisplay: true,
        chapter_title: defaultChapterTitle
      });
    }
  };

  scrollToToC = () => {
    this.setState({
      tocButtonDisplay: false,
      chapter_title: 'Table of Contents'
    });
    this._scrollView.scrollTo({
      x: screenWidth * (this.state.pageCount + 1),
      y: 0,
      animated: false
    });
  };

  scrollToSong = () => {
    const { currentSong } = this.props.globalData.state;
    this.setState({
      tocButtonDisplay: true,
      chapter_title: currentSong.chapter_title
    });
    this._scrollView.scrollTo({
      x: (currentSong.page - 1 + firstValidPageIndex) * screenWidth,
      y: 0,
      animated: false
    });
  };
}

export default withUnstated(Songbook, { globalData: GlobalDataContainer });
