import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import MainStore from './store'
import {observer} from 'mobx-react'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

@observer
class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  static navigationOptions = {
    headerMode: 'none'
  }

  getAll = () => {
      axios.get("http://192.168.0.23:3000/user/all", {
          headers: {
              token : MainStore.token
          }
      })
      .then(res=> {
          MainStore.users = res.data.result
      })
      .catch(err => Alert.alert("Uups! An error accured while retrieving all users"))
  }

  handleDelete = (email) => {
      let body = {
          email: email
      }
      axios.post("http://192.168.0.23:3000/user/delete", body, {
          headers: {
              token : MainStore.token
          }
      })
      this.getAll()
  }

  componentDidMount(){
    this.getAll()
  }

  render (){
    const renderUsers = MainStore.users.map(user => {
      return ((
        <View style = {styles.userContainer}>
          <Text style = {styles.userText}>{user.firstname} {user.lastname}</Text>
          <Text style = {styles.userText}>{user.email}</Text>
          <Text style = {styles.userText}>{user.job}</Text>
          <TouchableOpacity style=  {styles.userButton} onPress = {() => this.handleDelete(user.email)}>
            <Text style = {styles.userDelete}>Delete User</Text>
          </TouchableOpacity>
        </View>

      ))
    })

    return (
      <>
        <StatusBar barStyle = "dark-content"/>
        <SafeAreaView style = {styles.container}>
          <ScrollView>
          {renderUsers}
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    height : screenHeight,
    width: screenWidth,
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    color: "#5572b5",
    fontSize: 24, 
    top: 6*screenHeight/100,
    textAlign: 'center'
  },  
  userContainer: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    width: 80*screenWidth/100,
    marginLeft: '10%',
    marginTop: 50,
    justifyContent: 'center'
  },
  userButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 15
  },
  userDelete: {
    color: '#fff',
    textAlign: 'center'
  },
  userText: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  }

});

export default MainPage;
