// /* @flow weak */
//
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import Placeholder from 'rn-placeholder';
//
// const CustomPlaceholder = ({loading}) => (
//   <View style={styles.container}>
//     <Placeholder.ImageContent
//       size={100}
//       animate="fade"
//       lineNumber={4}
//       lineSpacing={10}
//       lastLineWidth="30%"
//       onReady={!loading}
//     >
//     </Placeholder.ImageContent>
//   </View>
// );
//
// export default CustomPlaceholder;
//
// const styles = StyleSheet.create({
//   container: {
//     margin: 10
//   },
// });
/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import Placeholder from 'rn-placeholder';

export default class CustomPlaceholder extends Component {

  _keyExtractor = (item, index) => index.toString();

 renderItem = ({item}) => {
   return (
     <View style={{margin:10}}>
       <Placeholder.ImageContent
         size={100}
         animate="fade"
         lineNumber={4}
         lineSpacing={10}
         lastLineWidth="30%"
         onReady={!this.props.loading}
       >
       </Placeholder.ImageContent>
     </View>
   )
 }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[1,2,4,5,6]}
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
  },
});
