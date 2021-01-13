import { Dimensions, Platform } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const topBarHeight = 44;
const bottomNaviHeight = 56;
const mainBannerHeight = (width-30) * (3 / 4);
const mainAdBannerHeight = width * (1 / 5);
const widthFix = width - 30;

const baseFs = 8;
const fsXXS = baseFs;
const fsXS = baseFs + 2;
const fsXMS = baseFs + 3;
const fsS = baseFs + 4;
const fsSM = baseFs + 5;
const fsM = baseFs + 6;
const fsL = baseFs + 8;
const fsXL = baseFs + 10;
const fsXXL = baseFs + 12;
const fsXXXL = baseFs + 14;
const fsXXXXL = baseFs + 16;
const fs6XL = baseFs + 20;
const fs8XL = baseFs + 24;
const fs11XL = baseFs + 30;

const fsFontNsR = Platform.OS === 'ios' ? ('NanumSquare') : ('NanumSquareRegular');
// const fsFontNsB = Platform.OS === 'ios' ? ('NanumSquare') : ('NanumSquareBold')

export default {
  window: {
    width,
    height,
    topBarHeight,
    bottomNaviHeight,
    mainBannerHeight,
    widthFix,
    mainAdBannerHeight
  },
  fsXXS,
  fsXS,
  fsS,
  fsSM,
  fsM,
  fsL,
  fsXL,
  fsXXL,
  fsXXXL,
  fsXXXXL,
  fs6XL,
  fs8XL,
  fs11XL,
  fsFontNsR,
  fsXMS
  // fsFontNsB
};
