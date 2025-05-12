import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
        navigation.replace('Login'); // volta pra tela de login
    };

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome: {userData.nome}</Text>
            <Text style={styles.label}>Email: {userData.email}</Text>
            <Text style={styles.label}>Telefone: {userData.phone}</Text>
            <Button title="Sair" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    label: { fontSize: 18, marginBottom: 10 }
});
