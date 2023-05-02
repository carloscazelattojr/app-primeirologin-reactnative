import React, {useState} from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[status, setStatus] = useState('');
  const[showToken, setShowToken] = useState(false);

  const handelVerifyLogin = async () =>{
    setStatus('');
    setShowToken(false);
    
    const req = await fetch('https://api.b7web.com.br/loginsimples/', {
      method: 'POST',
      body:JSON.stringify({email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    });

    const json = await req.json();

    if (json.status == 'ok'){
      setStatus('AUTORIZADO');
      setShowToken(true);
    } else {
      setStatus('NEGADO');
      setShowToken(false);
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login Simples</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Digite seu Login'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder='Digite sua Senha'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}  
      />
      <Button title='Entrar'onPress={handelVerifyLogin}/>
      <Text style={styles.status}> {status} </Text>
      
      { showToken &&
        <View style={styles.area}>
          <Text style={styles.token}>Token </Text>
          <Text style={styles.codeToken}> JHAUS123 </Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
  }, 
  header: {
    color: '#FFF',
    fontSize: 25, 
    textAlign: 'center',
    marginBottom: 30,
  },
  input:{
    height: 45,
    fontSize: 18,
    color: '#FFF',
    backgroundColor: '#555',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  
  status:{
    margin: 50,
    color: '#FFF',
    fontSize: 18, 
    textAlign: 'center',
  },

  area:{
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 30, 
  },
  token: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color:'#555'
  }, 
  codeToken:{
    textAlign: 'center',
    fontSize: 25,
    color:'#555'
  }

});

export default App;