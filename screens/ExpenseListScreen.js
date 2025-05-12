import { View, Text, SectionList, StyleSheet, Button } from 'react-native';
import {
    auth,
    db,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    deleteDoc,
    doc
} from '../firebase';
import { useEffect, useState } from 'react';

export default function ExpenseListScreen({ navigation }) {
    const [sections, setSections] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const q = query(
                    collection(db, 'expenses'),
                    where('userId', '==', user.uid),
                    orderBy('date', 'desc')
                );

                const querySnapshot = await getDocs(q);
                const grouped = {};

                querySnapshot.forEach(docSnap => {
                    const data = docSnap.data();
                    const dateKey = new Date(data.date.seconds * 1000).toLocaleDateString('pt-BR');

                    if (!grouped[dateKey]) grouped[dateKey] = [];

                    grouped[dateKey].push({
                        id: docSnap.id,
                        ...data
                    });
                });

                const sectionsArray = Object.keys(grouped).map(date => ({
                    title: date,
                    data: grouped[date]
                }));
                const totalValue = querySnapshot.docs.reduce((acc, docSnap) => {
                    const data = docSnap.data();
                    return acc + parseFloat(data.value || 0);
                }, 0);

                setTotal(totalValue);
                setSections(sectionsArray);


                setSections(sectionsArray);
            } catch (error) {
                console.log('Erro ao buscar gastos:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'expenses', id));
            setSections(prev =>
                prev.map(section => ({
                    ...section,
                    data: section.data.filter(item => item.id !== id)
                })).filter(section => section.data.length > 0)
            );
        } catch (error) {
            console.log('Erro ao excluir:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.desc}>{item.description}</Text>
            <Text style={styles.value}>R$ {item.value.toFixed(2)}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('EditExpense', item)} />
            <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>

    );

    return (
        <View style={styles.container}>
            <Text style={styles.total}>Total gasto: R$ {total.toFixed(2)}</Text>
            <Text style={styles.title}>Meus Gastos por Data</Text>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
    header: { fontSize: 18, fontWeight: 'bold', marginTop: 16, backgroundColor: '#ddd', padding: 6 },
    item: { backgroundColor: '#f5f5f5', padding: 10, marginBottom: 10, borderRadius: 6 },
    desc: { fontSize: 16 },
    value: { fontWeight: 'bold', marginTop: 4 },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
});
