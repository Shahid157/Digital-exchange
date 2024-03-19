/* eslint-disable react/function-component-definition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { THEME } from 'shared/theme';
import { RF } from 'shared/theme/responsive';
import AppText from '../AppText';

interface Props {
  selectedIndex: number;
  buttons: string[];
  onPress: (text: string, index: number) => void;
  activeTabBackground: string;
}

interface TabItem {
  title: string;
  x?: number;
  tabHeight?: number;
  tabWidth?: number;
}

const SecondaryTabGroup: React.FC<Props> = ({
  selectedIndex,
  buttons,
  onPress,
  activeTabBackground,
}) => {
  const activeTabTranslateX = useState(new Animated.Value(0))[0];
  const activeTabWidth = useState(new Animated.Value(0))[0];
  const activeTabHeight = useState(new Animated.Value(0))[0];
  const [selectedTabIndex, setSelectedTabIndex] = useState(selectedIndex);
  const [data, setData] = useState<TabItem>();

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
    <View style={[styles.container]}>
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
              { backgroundColor: activeTabBackground },
            ]}
          />
        </Animated.View>
      )}
      {data &&
        data.map((item: any, key: number) => (
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
            <AppText
              medium
              h4
              style={[
                styles.inActivatedTabText,
                {
                  color:
                    selectedTabIndex === key
                      ? THEME.COLORS.secondaryYellow
                      : THEME.COLORS.textGrey,
                },
              ]}
            >
              {item.title}
            </AppText>
          </TouchableHighlight>
        ))}
    </View>
  );
};

export default SecondaryTabGroup;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '60%',

    marginHorizontal: 2,
    marginVertical: RF(10),
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
    borderRadius: THEME.RADIUS.SMALLBOX,

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
