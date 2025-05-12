import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Erro ao logar', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require('../assets/logoControleGastos.png')}
                style={styles.image}
            />
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkAlt}>Criar nova conta</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 130,
        height: 130,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2b8085',
        marginBottom: 24
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#2b8085',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 16,
        fontSize: 16,
        color: '#333'
    },
    button: {
        backgroundColor: '#2b8085',
        paddingVertical: 14,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    link: {
        color: '#2b8085',
        fontSize: 15,
        marginBottom: 12,
        textDecorationLine: 'underline'
    },
    linkAlt: {
        color: '#444',
        fontSize: 15
    }
});
