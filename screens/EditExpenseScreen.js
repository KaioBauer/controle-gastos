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
import { db, doc, updateDoc } from '../firebase';

export default function EditExpenseScreen({ route, navigation }) {
    function formatDateToBR(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const { id, description: initialDesc, value: initialValue, date: initialDate } = route.params;

    const [description, setDescription] = useState(initialDesc);
    const [value, setValue] = useState(String(initialValue));
    const [date, setDate] = useState(formatDateToBR(new Date(initialDate.seconds * 1000)));

    const handleUpdate = async () => {
        function parseBrazilianDate(dateStr) {
            const [day, month, year] = dateStr.split('/');
            return new Date(`${year}-${month}-${day}T00:00:00`);
        }

        try {
            await updateDoc(doc(db, 'expenses', id), {
                description,
                value: parseFloat(value),
                date: parseBrazilianDate(date)
            });

            Alert.alert('Gasto atualizado!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao atualizar gasto', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Editar Gasto</Text>

                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição"
                />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder="Valor"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                    placeholder="Data (dd/mm/aaaa)"
                />

                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
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
