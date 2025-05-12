import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            Alert.alert('Login realizado com sucesso!');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erro ao logar', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Criar nova conta" onPress={() => navigation.navigate('Register')} />
            <Button
                title="Esqueci minha senha"
                onPress={() => navigation.navigate('ForgotPassword')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20
    },
    title: {
        fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20
    },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 5
    },
});
