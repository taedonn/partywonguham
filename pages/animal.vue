<template>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2>Data</h2>
        <pre>{{ data }}</pre>
        <button @click="updateAnimal">Update dog</button>
    </div>
</template>

<script setup>
    import { doc, onSnapshot, updateDoc } from "firebase/firestore";

    // Server Side
    const { data } = useFetch('/api/animal');

    // Client Side
    onMounted(async() => {
        const { firestore } = useFirebase();
        const docRef = doc(firestore, `animals`, 'dogs');
        onSnapshot(docRef, (snap) => {
            data.value = snap.data();
        });
    });

    const updateAnimal = async() => {
        const { firestore } = useFirebase();
        const docRef = doc(firestore, `animals`, 'dogs');
        await updateDoc(docRef, {
            name: `dog-${Math.floor(Math.random() * 1000)}`,
        });
    }
</script>