import React from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { Block, Text, Input, theme } from 'galio-framework';
import { SliderBox } from "react-native-image-slider-box";

const { width } = Dimensions.get('screen');

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../assets/images/house1.jpg'),
        require('../assets/images/house2.jpg'),
        require('../assets/images/house3.jpg'),
        require('../assets/images/house4.jpg'),
        require('../assets/images/house5.jpg'),
        require('../assets/images/house6.jpg'),
        require('../assets/images/house7.jpg'),
        require('../assets/images/house8.jpg'),
      ],
      events: [
        {
          title: 'Christmas Eve 1',
          content: "Dinner together! Let's have a good time!",
          date: '01/01/2010',
          location: 'home',
        },
        {
          title: 'Christmas Eve 2',
          content: "Dinner together! Let's have a good time!",
          date: '01/02/2010',
          location: 'home',
        },
      ]
    };
  }

  handleDeleteEvent = index => {
    this.setState({ events: this.state.events.filter((event, i) => i != index ) });
  }

  renderItem = ({ item, index }) => {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={{ uri: uri }}
          style={styles.imageBackground}
        >
          <View style={styles.rightTextContainer}>
            <Text style={styles.rightText}>Lorem</Text>
          </View>
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderSliderBox = () => {
    return (
      <SliderBox
        images={this.state.images}
        sliderBoxHeight={200}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor="#222222"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={0}
        autoplay
        circleLoop
      />
    );
  }

  renderEvents = () => {
    const cardList = this.state.events.map((event, i) => {
      return (
        <Card
          title={event.title}
          key={event.title + event.date}
        >
          <Text style={{ marginBottom: 10 }}>
            地点: {event.location}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            日期: {event.date}
          </Text>
          <Text> {event.content} </Text>
          <View style={styles.cardButtons} >
            <Icon
              name='delete'
              color='#999'
              style={styles.deleteIcon}
              onPress={() => this.handleDeleteEvent(i)}
            />
            <Icon
              name='create'
              color='#999'
              style={styles.editIcon}
              onPress={() => console.log('hello')}
            />
          </View>
        </Card>
      )
    })
    return cardList;
  }

  renderHomepageContent = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block>
          {this.renderSliderBox()}
        </Block>
        <Block>
          {this.renderEvents()}
        </Block>
        <Block>
          <Button title='添加' />
        </Block>
      </ScrollView>
    );
  }

  render() {
    console.log(this.state.events);
    return (
      <Block flex center style={styles.home}>
        {this.renderHomepageContent()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingTop: 20,
  },
  carousel: {
    flex: 1,
    backgroundColor: '#141518'
  },
  item: {
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white'
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    margin: 10
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  contentText: {
    fontSize: 12
  },
  cardButtons: {
    flex: 1,
    flexDirection: 'row-reverse'
  }
});
