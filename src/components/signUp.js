import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      passwd: "",
      name: "",
      lastName: "",
      passwdAgain: "",
      job : ""
    }
  }

  handleSignUp = () => {
    if(this.state.passwdAgain !== this.state.passwd){
      alert("Passwords Does Not Match")
    }
    else {
      let newUser = {
        firstname :  this.state.firstName,
        lastname : this.state.lastName,
        email : this.state.email,
        job: this.state.job,
        password : this.state.passwd
      }
      console.log(newUser)
      axios.post("http://192.168.0.23:3000/user/signup", newUser)
      .then(res=> {
          MainStore.token = res.data.token
          this.props.navigation.navigate("App")
      })
      .catch(err => Alert.alert("Unable To Create New User"))
    }
   
  }


  render (){

    return (
      <>
        <StatusBar barStyle = "dark-content"/>
        <SafeAreaView style = {styles.container}>
          <View>
            <Image source = {require("./../images/logo.jpg")} style = {styles.logo}/>
          </View>
          <View style = {styles.authButtons}>
            <TextInput  placeholder = 'Name' style = {styles.loginInputs} onChangeText= {(text) => this.setState({name : text})}/>
            <TextInput  placeholder = 'LastName' style = {styles.loginInputs} onChangeText= {(text) => this.setState({lastName : text})}/>
            <TextInput  placeholder = 'Job' style = {styles.loginInputs}  onChangeText= {(text) => this.setState({job : text})}/>
            <TextInput  placeholder = 'E-posta' style = {styles.loginInputs} onChangeText= {(text) => this.setState({email : text})}/>
            <TextInput  placeholder = 'Şifre' secureTextEntry = {true} style = {styles.loginInputs} onChangeText= {(text) => this.setState({passwd : text})}/>
            <TextInput  placeholder = 'Şifre Tekrar' secureTextEntry = {true} style = {styles.loginInputs}  onChangeText= {(text) => this.setState({passwdAgain : text})}/>
            <TouchableOpacity style = {styles.signButton} onPress = {() => {
               this.handleSignUp()
               }}>
              <Text style = {styles.signText}>Kayit Ol</Text>
            </TouchableOpacity>
            <View style = {{flexDirection: 'row', marginTop: 10, left: '20%'}}>
              <Text style = {styles.footerText}>Have an account ? </Text>
              <TouchableOpacity  onPress = {() => this.props.navigation.navigate("Giris")}>
                <Text style = {styles.footerTextLast}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    height : screenHeight,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo : {
    width : 112,
    height: 80,
    top: 3*screenHeight/100,
    
  },
  authButtons : {
    width: '75%',
    top: screenHeight*10/100,
  
  },
  signButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 15,
    marginTop: 20
  },
  signText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400'
  },
  loginInputs :{ 
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 16,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
    height: screenHeight*5/100
  },
  unuttum : {
    fontSize: 10,
    color: '#000',
    textDecorationLine: "underline",
    textAlign: "right"
  },
  footerText: {
    color: '#000',
    textAlign: 'center'
  },
  footerTextLast:{
    color: '#000',
    
  }
});

export default SignUp;
