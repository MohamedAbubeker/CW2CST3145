const app = Vue.createApp({
    data() {
        return {
            lessons: [],
            name: "",
            password: ""
        }
    },
    created() {
        fetch('http://127.0.0.1:4000/lessons')
            .then((res) => res.json())
            .then((data) => { 
                this.lessons = data;
            })
            .catch((err) => console.log(err));
    }
});

app.mount("#App");