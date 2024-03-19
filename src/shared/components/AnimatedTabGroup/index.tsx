import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import { useTranslation } from 'react-i18next';
import AppText from '../AppText';

interface IndicatorItem {
  tag: string;
  status: string;
}

interface TabItem {
  title: string;
  x?: number;
  tabHeight?: number;
  tabWidth?: number;
}
interface Props {
  selectedIndex?: number;
  buttons?: string[];
  onPress?: (text: string, index: number) => void;
  activeTabBackground?: string;
  containerStyle?: any;
  indicatoritems?: IndicatorItem[];
}

const AnimatedTabGroup: React.FC<Props> = ({
  selectedIndex,
  buttons,
  onPress,
  activeTabBackground,
  containerStyle,
  indicatoritems,
}) => {
  const activeTabTranslateX = useState(new Animated.Value(0))[0];
  const activeTabWidth = useState(new Animated.Value(0))[0];
  const activeTabHeight = useState(new Animated.Value(0))[0];
  const [selectedTabIndex, setSelectedTabIndex] = useState(selectedIndex);
  const [data, setData] = useState<TabItem>();
  const { t } = useTranslation(['all']);

  useEffect(() => {
    setData(buttons.map((str) => ({ title: str })));
  }, []);

  const handleTabSlide = (
    x: Animated.Value,
    height: Animated.Value,
    width: Animated.Value
  ) => {
    Animated.spring(activeTabTranslateX, {
      toValue: x,
      useNativeDriver: false,
    }).start();
    Animated.timing(activeTabHeight, {
      toValue: height,
      duration: 100,
      useNativeDriver: false,
    }).start();
    Animated.spring(activeTabWidth, {
      toValue: width,
      useNativeDriver: false,
    }).start();
  };

  const handleOnPress = (item: any, key: number) => {
    setSelectedTabIndex(key);
    handleTabSlide(item.x, item.tabHeight, item.tabWidth);
  };

  const onTabPress = (item: any, key: number) => {
    onPress(item.title, key);
    handleOnPress(item, key);
  };

  if (selectedIndex != selectedTabIndex) {
    onTabPress(data[selectedIndex], selectedIndex);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {data && (
        <Animated.View
          style={[
            styles.activatedTabContainer,
            {
              height: activeTabHeight,
              width: activeTabWidth,
              transform: [
                {
                  translateX: activeTabTranslateX,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.animatedTabGroupActivatedTab,
              styles.activeButtonStyle,
              { borderBottomWidth: 4, borderColor: activeTabBackground },
            ]}
          />
        </Animated.View>
      )}
      {data &&
        data.map((item: TabItem, key: number) => {
          const indicatedItem = indicatoritems?.some(
            (it: any) => it.tag === item.title && it.status === 'Created'
          );
          // const title = indicatedItem ? `${item.title} •` : item.title;
          return (
            <TouchableHighlight
              key={key}
              underlayColor="transparent"
              onLayout={(event) => {
                item.x = event.nativeEvent.layout.x;
                item.tabHeight = event.nativeEvent.layout.height;
                item.tabWidth = event.nativeEvent.layout.width;
                if (key === selectedIndex || key === 0) {
                  handleTabSlide(item.x, item.tabHeight, item.tabWidth);
                }
              }}
              style={[styles.inActivatedTab, styles.inActiveButtonStyle]}
              onPress={() => onTabPress(item, key)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText
                  medium
                  h5
                  style={[
                    styles.inActivatedTabText,
                    {
                      color:
                        selectedTabIndex === key
                          ? THEME.COLORS.secondaryYellow
                          : THEME.COLORS.white,
                    },
                  ]}
                >
                  {t(item.title, { ns: ['all'] })}
                  {'  '}
                </AppText>
                {indicatedItem && (
                  <AppText
                    color={THEME.COLORS.secondaryYellow}
                    secondaryTitle
                    style={{ alignSelf: 'center' }}
                  >
                    •
                  </AppText>
                )}
              </View>
            </TouchableHighlight>
          );
        })}
    </View>
  );
};

export default AnimatedTabGroup;

const styles = StyleSheet.create({
  container: {
    height: 50,
    // width: "85%",
    marginHorizontal: 2,

    flexDirection: 'row',
    borderRadius: THEME.RADIUS.SMALLBOX,
  },
  inActivatedTab: {
    flex: 1,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inActiveButtonStyle: {
    backgroundColor: 'transparent',
  },
  activeButtonStyle: {
    margin: 2.5,

    backgroundColor: 'rgb(13,13,13,0.3)',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.11,
        shadowRadius: 13,
        shadowColor: THEME.COLORS.primary,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  activatedTabText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  activatedTabContainer: {
    position: 'absolute',
    top: 0,
  },
  animatedTabGroupActivatedTab: {
    flex: 1,
    // backgroundColor: "#bbb",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActivatedTabText: {
    textTransform: 'capitalize',
  },
});
