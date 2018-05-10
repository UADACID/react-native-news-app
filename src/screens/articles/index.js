/* @flow */

import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import axios from 'axios'
import Placeholder from 'rn-placeholder';
import ImageLoad from 'react-native-image-placeholder';
import { Icon, ListItem, Thumbnail, Body, Text, Header, Item, Input } from 'native-base'
import CustomPlaceholder from './components/CustomPlaceholder'



const API_KEY = '9d44d2d888694b5a8ecbadb444b0ff16'

const getDinamicUrl = (slug) => {
  const URL = `https://newsapi.org/v2/top-headlines?sources=${slug}&apiKey=${API_KEY}`
  return URL
}

export default class Articles extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.getParam('title', 'Title News')}`,
  })

  state = {
    loading : true,
    articles : [],
    searchResult : []
  }

  componentDidMount(){
    const otherParam = this.props.navigation.getParam('slug', 'some default value');
    this.getArticles(otherParam)
  }

  getArticles = (params) => {
    const url = getDinamicUrl(params)
    axios({
      method:'get',
      url:url,
      headers: {'Content-Type': 'application/json'},
    })
    .then((response) => {
      const {articles} = response.data
      this.setState({
        articles,
        loading:false
      })
    })
    .catch(err => {
      console.log(JSON.parse(JSON.stringify(err)));
    })
  }

  onSearchResult = (text) => {
    const regexp = new RegExp(text, 'i');
    const searchByText = this.state.articles.filter(x => regexp.test(x.title))
    this.setState({
      searchResult : searchByText
    })
  }

  onPressArticles = (article) => {
    const { navigate } = this.props.navigation
    navigate('WebViews',{
      title:article.title,
      url:article.url
    })
  }

  _keyExtractor = (item, index) => index.toString();

   renderItem = ({item}) => {
     return (
       <ListItem onPress={()=>this.onPressArticles(item)}>
         <ImageLoad
          style={{ width: 100, height: 100 }}
          loadingStyle={{ size: 'large', color: 'blue' }}
          source={{ uri: item.urlToImage }}
          />
          <Body>
            <Text>{item.title}</Text>
            <Text note>{item.description}</Text>
          </Body>
        </ListItem>
     )
   }

   renderSearchbar = () => {
     return (
       <Header searchBar rounded androidStatusBarColor='#000' style={{backgroundColor:'#0073b2'}}>
           <Item>
             <Icon name="ios-search" />
             <Input
               placeholder="Search"
               onChangeText={this.onSearchResult} />
           </Item>
         </Header>
     )
   }

  render() {
    const { articles, loading, searchResult } = this.state
    if (!loading && searchResult.length !== 0) {
      return (
        <View style={styles.container}>
        {this.renderSearchbar()}
        <FlatList
          data={searchResult}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          />
        </View>
      )
    }
    if (loading) {
      return (
        <View style={styles.loading}>
          <CustomPlaceholder loading={loading}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      {this.renderSearchbar()}
      <FlatList
        data={articles}
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
  loading : {
    flex: 1,
    backgroundColor: '#fff'
  },
});
