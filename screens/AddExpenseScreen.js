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
import { auth, db, collection, addDoc } from '../firebase';

export default function AddExpenseScreen({ navigation }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const handleAddExpense = async () => {
        const user = auth.currentUser;

        function parseBrazilianDate(dateStr) {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}T00:00:00`);
        }

        if (!user) {
            Alert.alert('Erro', 'Usuário não autenticado.');
            return;
        }

        if (!description || !value || !date) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            await addDoc(collection(db, 'expenses'), {
                userId: user.uid,
                description,
                value: parseFloat(value),
                date: parseBrazilianDate(date)

            });
            setDescription('');
            setValue('');
            setDate('');
            Alert.alert('Gasto adicionado com sucesso!');
        } catch (error) {
            Alert.alert('Erro ao adicionar gasto', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Novo Gasto</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor (ex: 99.90)"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Data (dd/mm/aaaa)"
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2b8085',
        textAlign: 'center',
        marginBottom: 24
    },
    input: {
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
        alignItems: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
