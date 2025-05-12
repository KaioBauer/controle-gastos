import { View, Text, Button, StyleSheet } from 'react-native';


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tela Inicial funcionando ✅</Text>
            <Button title="Minha Conta" onPress={() => navigation.navigate('Profile')} />
            <Button title="Adicionar Gasto" onPress={() => navigation.navigate('AddExpense')} />
            <Button title="Ver gastos" onPress={() => navigation.navigate('Expenses')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});
