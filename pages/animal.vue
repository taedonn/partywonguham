<script setup>
    import { doc, collection, onSnapshot, setDoc, getDoc, deleteDoc } from "firebase/firestore";

    // Server Side
    const { data } = await useFetch('/api/animal');

    // Client Side *데이터가 업데이트되면 실시간으로 변경사항 반영
    onMounted(async() => {
        const { firestore } = useFirebase();
        const docRef = doc(firestore, 'animals', 'dogs');
        onSnapshot(docRef, (snap) => {
            data.value = snap.data();
        });
    });

    // Load firebase collection
    const { firestore } = useFirebase();
    const myCollection = collection(firestore, 'animals');

    // CREATE
    const createDog = async () => {
        try {
            await setDoc(doc(myCollection, 'dogs'), {
                name: `dog-${Math.floor(Math.random() * 1000)}`,
            });
        } catch (err) {
            console.log(err);
        }
    }
    const createCat = async () => {
        try {
            await setDoc(doc(myCollection, 'cats'), {
                name: `cat-${Math.floor(Math.random() * 1000)}`,
            });
        } catch (err) {
            console.log(err);
        }
    }

    // READ
    const getDog = async () => {
        try {
            const docRef = doc(firestore, "animals", "dogs");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                onSnapshot(docRef, (snap) => {
                    data.value = snap.data();
                });
            } else {
                console.log("강아지 없음");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const getCat = async () => {
        try {
            const docRef = doc(firestore, "animals", "cats");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                onSnapshot(docRef, (snap) => {
                    data.value = snap.data();
                });
            } else {
                console.log("고양이 없음");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // UPDATE
    const updateDog = async () => {
        try {
            await setDoc(doc(myCollection, 'dogs'), {
                name: `dog-${Math.floor(Math.random() * 1000)}`,
            });
        } catch (err) {
            console.log(err);
        }
    }
    const updateCat = async () => {
        try {
            await setDoc(doc(myCollection, 'cats'), {
                name: `cat-${Math.floor(Math.random() * 1000)}`,
            });
        } catch (err) {
            console.log(err);
        }
    }

    // DELETE
    const deleteDog = async () => {
        try {
            await deleteDoc(doc(firestore, 'animals', 'dogs'));
        } catch (err) {
            console.log(err);
        }
    }
    const deleteCat = async () => {
        try {
            await deleteDoc(doc(firestore, 'animals', 'cats'));
        } catch (err) {
            console.log(err);
        }
    }
</script>

<template>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <h2>Data</h2>
        <pre>{{ "name: " + data.name }}</pre>
        <button @click="createDog">Create Dog</button>
        <button @click="createCat">Create Cat</button>
        <button @click="getDog">Get Dog</button>
        <button @click="getCat">Get Cat</button>
        <button @click="updateDog">Update Dog</button>
        <button @click="updateCat">Update Cat</button>
        <button @click="deleteDog">Delete Dog</button>
        <button @click="deleteCat">Delete Cat</button>
    </div>
</template>