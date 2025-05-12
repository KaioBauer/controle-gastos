import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela Inicial</Text>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>Minha Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddExpense')}>
                    <Text style={styles.buttonText}>Adicionar Gasto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Expenses')}>
                    <Text style={styles.buttonText}>Ver Gastos</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2b8085',
        textAlign: 'center',
        marginBottom: 30
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    button: {
        backgroundColor: '#2b8085',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
        elevation: 2
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    }
});
