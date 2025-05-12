import { useEffect, useState } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
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

            <View style={styles.actions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditExpense', item)}>
                    <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Meus Gastos</Text>
                <Text style={styles.total}>Total gasto: R$ {total.toFixed(2)}</Text>
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    renderSectionHeader={renderSectionHeader}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2b8085',
        marginBottom: 10,
        marginTop: 10
    },
    total: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#e0f2f1',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 14,
        marginBottom: 6
    },
    item: {
        backgroundColor: '#f5f5f5',
        padding: 14,
        borderRadius: 8,
        marginBottom: 10
    },
    desc: {
        fontSize: 16,
        fontWeight: '500'
    },
    value: {
        fontWeight: 'bold',
        color: '#2b8085',
        marginTop: 6,
        marginBottom: 12
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editBtn: {
        backgroundColor: '#2b8085',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6
    },
    editText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    deleteBtn: {
        backgroundColor: '#d9534f',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
