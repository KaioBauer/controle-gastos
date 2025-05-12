import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { sendPasswordResetEmail, auth } from '../firebase';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Erro', 'Informe o e-mail.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('E-mail enviado!', 'Verifique sua caixa de entrada.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao enviar e-mail', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Senha</Text>

            <TextInput
                style={styles.input}
                placeholder="Seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Enviar link de redefinição</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.link}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
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
        textDecorationLine: 'underline'
    }
});
