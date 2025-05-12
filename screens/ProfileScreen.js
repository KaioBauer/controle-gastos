import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { auth, db, doc, getDoc, signOut } from '../firebase';

export default function ProfileScreen({ navigation }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const ref = doc(db, 'users', user.uid);
                const snapshot = await getDoc(ref);
                if (snapshot.exists()) {
                    setUserData(snapshot.data());
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigation.replace('Login');
    };

    if (!userData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2b8085" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minha Conta</Text>
            <Text style={styles.label}>Nome: <Text style={styles.value}>{userData.nome}</Text></Text>
            <Text style={styles.label}>Email: <Text style={styles.value}>{userData.email}</Text></Text>
            <Text style={styles.label}>Telefone: <Text style={styles.value}>{userData.phone}</Text></Text>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2b8085',
        textAlign: 'center',
        marginBottom: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 12,
        fontWeight: '600'
    },
    value: {
        fontWeight: 'normal',
        color: '#333'
    },
    button: {
        backgroundColor: '#2b8085',
        paddingVertical: 14,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginTop: 30
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
