

///////////// networking using fetch method////
import { Text, View, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'

export class App extends Component {
  constructor() {
    super();
    this.state = ({
      loader: false,
      DATA: []
    })
  }
  getData() {
    this.setState({ loader: true })
    fetch('https://api.sampleapis.com/coffee/hot')
      .then((response) => (response.json()))
      .then((response) => {
        if (response.length > 0) {
          this.setState({ DATA: response })
        }
        this.setState({ loader: false })
        console.log(response)
      }).catch((error) => {
        this.setState({ loader: false })
        console.log(error)
      })
  }
  componentDidMount() {
    this.getData()
  }
  render() {
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
          <Image source={{ uri: item.image }} style={styles.imageStyle} />
        </View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descriptionStyle}>Ingredients: {item.ingredients}</Text>
          <Text style={styles.descriptionStyle}>{item.description}</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        <ActivityIndicator size={20} animating={this.state.loader} />
        <Text onPress={() => this.getData()} style={{ fontWeight: 'bold' }}>Menu</Text>
        <FlatList
          style={{ width: '95%', marginTop: 10 }}
          data={this.state.DATA}
          renderItem={renderItem}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'beige',
    margin: 10,
    elevation: 5
  },
  titleText: {
    fontSize: 18,
    color: 'black'
  },
  imageStyle: {
    width: 90,
    height: 90,
    alignSelf: 'flex-end'
  },
  descriptionStyle: {
    padding: 5,

  }
})
export default App