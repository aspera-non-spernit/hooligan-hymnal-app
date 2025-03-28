/*
    Supporter Group Info
*/

// Web presence config
// "Follow Us" on Home screen

// TODO: Build home screen dynamically based on this websites object

// URLs
export const TWITTER_URL = 'https://twitter.com/chattahooligan';
export const FACEBOOK_URL = 'https://www.facebook.com/TheChattahooligans';
export const INSTAGRAM_URL = 'https://instagram.com/thechattahooligans';
export const WEBSITE_URL = 'http://chattahooligan.com';
export const YOUTUBE_URL = '';
export const SHOP_URL = 'https://squareup.com/store/the-chattahooligans';
export const PRIDERAISER_URL = 'https://chatt.prideraiser.org/';
export const GOFUNDME_URL = 'https://www.gofundme.com/chattahooligan-youth-soccer-investment';
export const ESP_TWITTER_URL = 'https://twitter.com/LosCFCHooligans';
export const ESP_INSTAGRAM_URL = 'https://instagram.com/loschattahooligans';
export const ESP_WEBSITE_URL = 'http://chattahooligan.com/es';
export const EVENTS_URL = 'https://m.facebook.com/TheChattahooligans/events/';
export const INSTRUMENTATION_URL ='https://drive.google.com/open?id=1dW9z4lh5924mXKtOyhc4dt8_OuAT9UXr';

// Common Images
// like social media icons
export const PRIDERAISER_ICON = require('../../assets/prideraiser.png');
export const GOFUNDME_ICON = require('../../assets/gofundme.png');
export const GOFUNDME_BW_ICON = require('../../assets/gofundme_bw.png');
export const CLUB_LOGO = require('../../assets/chattfc_logo.png');
// used in SongView to link to sheet music
export const MUSICAL_SCORE_ICON = require('../../assets/musical-score.png');

/*
    App Skin
*/

// Chattahooligans palette
export const Palette = {
  Navy: '#002D56',
  Sky: '#A3D8F7',
  White: '#FFFFFF',
  Black: '#000000',
  Prideraiser: '#a55eea'
};

export const DefaultColors = {
  NavigationBarBackground: Palette.Navy,
  Background: Palette.White,
  ButtonBackground: Palette.Navy,
  ButtonText: Palette.White,
  HeaderBackground: Palette.Navy,
  HeaderText: Palette.White,
  Text: Palette.Black,
  ColorText: Palette.Navy,
  Secondary: Palette.Sky
}

export const Skin = {
  Home_SocialButtons: DefaultColors.ButtonBackground,
  Songbook_Background: Palette.Sky,
  Songbook_ToCButtonBackground: DefaultColors.ButtonBackground,
  SingleSong_Background: Palette.Navy,
  Player_TopContainerBackground: DefaultColors.NavigationBarBackground,
  Player_Background: Palette.Sky,
  Roster_DefaultThumbnail: CLUB_LOGO,
  Roster_TabBackground: DefaultColors.ButtonBackground,
  Roster_ActiveTabIndicator: DefaultColors.ButtonText,
  Roster_ActiveTabLabel: DefaultColors.ButtonText,
  Roster_InactiveTabLabel: DefaultColors.Secondary,
  Roster_FriendsTabIcon: 'md-heart',
  Roster_FriendsTabLabel: 'Friends',
  Roster_FoesTabIcon: 'md-thumbs-down',
  Roster_FoesTabLabel: 'Foes',
  Player_DefaultImage: CLUB_LOGO,
};

/*
  Pass this structure to the config property of components/SocialButtonPanel
*/
// icon: Iconicons name
export const socialButtons = [
  {
    header: "Follow us",
    headerColor: DefaultColors.ColorText,
    items: [
      { icon: 'logo-twitter', url: TWITTER_URL },
      { icon: 'logo-facebook', url: FACEBOOK_URL },
      { icon: 'logo-instagram', url: INSTAGRAM_URL },  
      { icon: 'md-cart', url: SHOP_URL },
      { image: PRIDERAISER_ICON, url: PRIDERAISER_URL, tintToSkin: false },
      { image: GOFUNDME_BW_ICON, url: GOFUNDME_URL, tintToSkin: true }
    ]
  },
  {
    header: "Síguenos",
    headerColor: DefaultColors.ColorText,
    items: [
      { icon: 'logo-twitter', url: ESP_TWITTER_URL },
      { icon: 'logo-instagram', url: ESP_INSTAGRAM_URL },
      { icon: 'md-browsers', url: ESP_WEBSITE_URL }
    ]
  }
]
// Other/Seasonal
// { icon: 'md-browsers', url: WEBSITE_URL },
// { image: PRIDERAISER_ICON, url: PRIDERAISER_URL },
// { image: GOFUNDME_ICON, url: GOFUNDME_URL }

/*
  "Headline" banners on home screen
*/
export const banners = [
]
//{ backgroundColor: Palette.Prideraiser, image: PRIDERAISER_ICON, url: PRIDERAISER_URL, text: "Pledge to Chattanooga Prideraiser", textColor: Palette.White },
// { backgroundColor: Palette.Sky, image: GOFUNDME_BW_ICON, tintColor: Skin.Home_SocialButtons, url: GOFUNDME_URL, text: "Youth Soccer Investment Crowdfunding", textColor: Palette.Black }


/*
  App Feature Flags
*/
export const Settings = {
  CapoHome_GKNicknameEnabled: true,
  Player_ShowSongs: true
}