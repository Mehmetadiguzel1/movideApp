import { StyleSheet, Text, View, Alert, Image, ScrollView, TouchableWithoutFeedback, Modal, Component , useState } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChipGroup from '../components/ChipGroup';
import TeaserTrailer from './../models/TeaserTrailer';
import TrailerItem from '../components/TrailerItem';
import YoutubePlayer from "react-native-youtube-iframe";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
//import { WebView } from 'react-native-webview';
const db = SQLite.openDatabase("movie.db");
export default class MovieDetail extends React.Component {
  movieItem = null;
  constructor(props){
    super(props);
    this.movieItem = props.route.params.item;
    this.readMovieData(this.movieItem);
  }

  state = {
    teaserTrailers: [],
    activeMovieTrailerKey: '',
    modalVisible: false,
    isFavorite: false,

  };

  readMovieData(data){
    db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Favorites WHERE movie_id = ?",
                [data.id],
                (txObj, { rows: {_array } }) => {
                    if (_array.length != 0){
                      this.setState({ isFavorite: true});
                    } else {
                      console.log("Can not reach DATA")
                    }

                },
                (txObj, error) => console.error(error)
            );
    });
  }



  downloadFile = async (data, process) =>{
    const movieDir = FileSystem.documentDirectory + "/" + data.id + "/";
    const dirInfo = await FileSystem.getInfoAsync(movieDir);
    if (!dirInfo.exists){
      await FileSystem.makeDirectoryAsync(movieDir, {intermediates: true});
    }
    const fileUri = movieDir + (process == 1 ? "poster_path.jpg" : "backdrop_path.jpg");
    const uri = process == 1 ? data.poster_path : data.poster_path;
    
    let downloadObject = FileSystem.createDownResumable(uri, fileUri);
    let response = await downloadObject.downloadAsync();
    return response;
  };

  deleteItem = async (data) => {
    const movieDir = FileSystem.documentDirectory + "/" + data.id + "/";
    await FileSystem.deleteAsync(movieDir);
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Favorites WHERE movie_id = ? ",
        [data.id],
        (txObj, resultSet) => {
          if (resultSet.rowAffected > 0){
            this.setState({ isFavorite: false});
          }
        }
      );
    });
  };





  addItem = async (data) => {
    await this.downloadFile(data, 1).then(response => {
      if (response.status === 200) {
        this.downloadFile(data, 2).then(response => {
        if (response.status == 200) {
          data.genresString = "";
          data.genresString += data.genres.map((item, index) => item);
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO Favorites (movie_id, title, genres, overview, popularity, release_date, vote_average, vote_count) values (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                data.id,
                data.title,
                data.genresString,
                data.overview,
                data.popularity,
                data.release_date,
                data.vote_average,
                data.vote_count,
              ],
              (txObj, resultSet) => {
                this.setState({ isFavorite: true});
                
              },
              (txObj, err) => console.log("Error", error)
              
              );
          });
        }
        })
    }
  })




    

  };
  favoriteProcess(data){
    if (this.state.isFavorite) {
      this.deleteItem(data);

    }else{
      this.addItem(data)
    }
  }

  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/movie/' + this.movieItem.id + '/videos?api_key=def30dcb6753a6abdcf8682057b1ed85')
    .then((response) => response.json())
    .then((responseJson) => {
      var items = [];
      responseJson.results.map(movie => {
        items.push(new TeaserTrailer({key: movie.key, name: movie.name, type: movie.type,}));
      });
      this.setState({teaserTrailers: items});
    })
    .catch((error) => console.error(error));
  }

  render() {
    //const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={styles.container}>
        <Modal
          style={{ position: "absolute", top: 0 }}
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={styles.IframeBackground}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ modalVisible: false })}
            >
              <View style={styles.ExitButton}>
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color={"white"}
                />
              </View>
            </TouchableWithoutFeedback>

            <View style={{ width: "100%" }}>
              <YoutubePlayer
                play={true}
                height={270}
                videoId={this.state.activeMovieTrailerKey}
              />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.setParams({
                query: "someText",
              });
              this.props.navigation.pop();
            }}
          >
            <MaterialCommunityIcons
              style={styles.BackHomeButton}
              name="chevron-left"
              size={24}
              color={"#fff"}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.favoriteProcess(this.movieItem)}
          >
            <MaterialCommunityIcons
              style={styles.FavoriteHeart}
              name={this.state.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={"#fff"}
            />
          </TouchableWithoutFeedback>
          <Image
            style={styles.poster}
            resizeMode={"cover"}
            source={{
              uri: this.movieItem.backdrop_path,
            }}
          />
          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={styles.TitleBar}
            >
              <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <Text style={styles.title}>{this.movieItem.title}</Text>
                <Text style={styles.subtitle}>
                  {this.movieItem.release_date}
                </Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.rating}>{this.movieItem.vote_average}</Text>
              </View>
            </View>

            <ChipGroup datas={this.movieItem.genres} />

            <Text style={styles.header}>Overview</Text>
            <Text >{this.movieItem.overview}</Text>
            <Text style={styles.header}>Teasers & Trailers</Text>
            <View style={styles.TeasersCards}>
              {this.state.teaserTrailers.map((item, index) => {
                return (
                  <TrailerItem
                    poster={this.movieItem.backdrop_path}
                    key={item.key}
                    onPressFunction={() => {
                      this.setState({
                        modalVisible: true,
                        activeMovieTrailerKey: item.key,
                      });
                    }}
                    data={item}
                    modalVisible={this.state.modalVisible}
                    itemIndex={index}
                  />
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
    container: {
    flex: 1,
    backgroundColor: "white",
  },
  rating: {
    fontFamily: "poppins-sb",
  },
  ratingBadge: {
    width: 48,
    height: 48,
    backgroundColor: "#999",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "poppins-l",
  },
  poster: {
    height: 281,
  },
  title: {
    fontSize: 17,
    fontFamily: "poppins-r",
  },
  header: {
    fontSize: 20,
    fontFamily: "poppins-sb",
    marginTop: 10,
  },
  ExitButton:{
    backgroundColor: "#222",
    width: 48,
    height: 48,
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    justifyContent: "center",
    alignItems: "center",
    left: 20,
    borderRadius: 10,
  },
  BackHomeButton:{
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    left: 10,
    zIndex: 1,
    paddingRight: 20,
    paddingBottom: 20,
  },
  IframeBackground:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  FavoriteHeart:{
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    right: 10,
    zIndex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  TeasersCards:{
    flexWrap: "wrap", 
    flexDirection: "row",
  },
  TitleBar:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  }
    
})