/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base'
import getNewsSource from '../../stores/newsSource'

export default class Sources extends Component {

  constructor(){
    super()
    this.sources = getNewsSource()
  }

  static navigationOptions = ({ navigation }) => ({
      title: `News sources`,
  })

  createSlug = (string) => {
    const replaced = string.split(' ').join('-');
    return replaced.toLowerCase()
  }

  onPressNews = (news) => {
    const { navigate } = this.props.navigation
    const slug = this.createSlug(news.title)
    navigate('Articles',{
      title:news.title,
      slug
    })
  }

   _keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>this.onPressNews(item)}>
        <View style={styles.containerItem}>
          <Text>{item.title}</Text>
          <Icon name='ios-arrow-forward-outline' style={{color:'#3498db'}}/>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
        data={this.sources}
        renderItem={this.renderItem}
        keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerItem : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    borderBottomWidth: 0.5,
    marginLeft: 10,
    borderColor: 'gray'
  }
});
