import { StyleSheet, Text, View, Alert, Image, ScrollView, TouchableWithoutFeedback, Modal, Component , useState } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChipGroup from '../components/ChipGroup';
import TeaserTrailer from './../models/TeaserTrailer';
import TrailerItem from '../components/TrailerItem';
import YoutubePlayer from "react-native-youtube-iframe";

//import { WebView } from 'react-native-webview';

export default class MovieDetail extends React.Component {
  movieItem = null;
  constructor(props){
    super(props);
    this.movieItem = props.route.params.item;
  }

  state = {
    teeserTrailers: [],
    modalVisible: false,

  };


  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/movie/' + this.movieItem.id + '/videos?api_key=def30dcb6753a6abdcf8682057b1ed85')
    .then((response) => response.json())
    .then((responseJson) => {
      var items = [];
      responseJson.results.map(movie => {
        items.push(new TeaserTrailer({key: movie.key, name: movie.name, type: movie.type,}));
      });
      this.setState({teeserTrailers: items});
    })
    .catch((error) => console.error(error));
  }

  render() {
    //const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={styles.container}>

      
        <Modal style={{ position: 'absolute', top: 0,}}
        animationType='slide' transparent={true} statusBarTranslucent={true} visible={this.state.modalVisible}
        onRequestClose={() => { this.setState({ modalVisible: false}) }} >

          <View style={{ flex: 1, height: 120, alignItems: 'center', justifyContent: 'center', backgroundColor: "#000"}}>
            
            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false })}>
              <View style={{
                backgroundColor:'#222', 
                width:48, 
                height:48, 
                position: 'absolute', 
                top: Constants.statusBarHeight + 10, 
                left: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
                <MaterialCommunityIcons name='close' size={20} color={'white'} />
              </View>
            </TouchableWithoutFeedback>

            <View style={{ width: '100%',}} >
              <YoutubePlayer
                height={300}
                play={true}
                videoId={"JfVOs4VSpmA"}
              />
            </View>

          </View>
        </Modal>


        <ScrollView>
          
          <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()} >
            
            <MaterialCommunityIcons 
          style={{ position: "absolute", top: Constants.statusBarHeight +10, left: 20, zIndex:1, paddingRight: 20, paddingBottom:20}} name="chevron-left" size={24} color={"#fff"} />
          </TouchableWithoutFeedback>

          <Image style={styles.poster} resizeMode={"cover"} source={{uri: "https://image.tmdb.org/t/p/original/" + this.movieItem.backdrop_path}} />

          <View style={{ 
            flex: 1, 
            
            padding: 20,
            }}>
            <View style={{ 
              flex:1, 
              flexDirection: "row", 
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,

              }}>

              <View style={{ flexWrap: "wrap", flexDirection: "column"}}>
                <Text style={styles.title}>{this.movieItem.title}</Text>
                <Text>{this.movieItem.release_date}</Text>
              </View>
              <View style={{ 
                width:48, 
                height:48, 
                backgroundColor:"white", 
                borderRadius:24,
                justifyContent:"center",
                alignItems:"center",
                
                }}>
                  <Text>{this.movieItem.vote_average}</Text>
              </View>
            </View>

                <View style={{width: "100%"}}>
                  <ChipGroup datas={this.movieItem.genres} />
                </View>


            <Text style={styles.header}>Overview</Text>
            <Text>{this.movieItem.overview}</Text>
            <Text style={styles.header}>Teaser & Trailers</Text>
            <View style={{ flexWrap: 'wrap', flexDirection:'row' }}>
              {
                this.state.teeserTrailers.map((item, index) => {
                  return (
                    
                      <TrailerItem key={item.key} onPressFunction={() => this.setState({ modalVisible: true}) } poster={this.movieItem.backdrop_path} data = {item} modalVisible={this.state.modalVisible} itemIndex={index} />
                  );
                })}
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: Constants.statusBarHeight,

    },
    poster:{
      height: 230,
    },
    title:{
      fontSize: 20,
      fontWeight: "700",
      },
    header:{
      fontSize: 26,
      fontWeight:"bold",
      marginTop: 10,
    }
})