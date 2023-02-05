
const app = Vue.createApp({
    data() {
        return {
            lessons: [],
            cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
            name: document.getElementById('name'),
            phoneNumber: document.getElementById('number')
        }
    },
    created() {
        fetch('http://localhost:4000/lessons')
                //here I convert the json to js objects
                .then((res) => res.json())
                .then((data) => {
                    this.lessons = data;
                    localStorage.setItem("lessons", JSON.stringify(this.lessons));
                })
                .catch((err) => console.log(err));

        if (!JSON.parse(localStorage.getItem("lessons"))) {
            console.log("erorr getting data");
        } else {
            this.lessons = JSON.parse(localStorage.getItem("lessons"));
        }
    },


    methods: {

        addLessonToCart(lesson) {
            if (lesson.space > 0) {
                this.cart.push({
                    id: lesson.id,
                    subject: lesson.topic,
                    location: lesson.location,
                    price: lesson.price,
                    imageName: lesson.image
                });

                let lessonIndex = this.lessons.indexOf(lesson);
                this.lessons[lessonIndex].space = this.lessons[lessonIndex].space - 1;
            }
            localStorage.setItem("cart", JSON.stringify(this.cart));
            localStorage.setItem("lessons", JSON.stringify(this.lessons));
        },
        removeLessonFromcart(lesson) {
            let cartIndex = this.cart.indexOf(lesson);
            this.cart.splice(cartIndex, 1);
            localStorage.setItem("cart", JSON.stringify(this.cart));

            for (let i = 0; i < this.lessons.length; i++) {
                if (this.lessons[i].id === lesson.id) {
                    this.lessons[i].space += 1;
                    localStorage.setItem("lessons", JSON.stringify(this.lessons));
                }
            }
        },

        isLessonFull(lesson) {
            if (lesson.space === 0) return true;
        },

        iscartEmpty() {
            if (this.cart.length === 0) return true;
        },

        async checkoutOrder(name, phoneNumber){
            this.cart.push({"name": this.name, "phoneNumber": this.phoneNumber});
            localStorage.setItem("cart", JSON.stringify(this.cart));
            let tempCart = localStorage.getItem("cart");
           
            
            fetch('http://localhost:4000/lessons', {
                method: "POST",
                body: tempCart,
                headers: {"Content-type": "application/json; charset=UTF-8"}
            }).then((res) => console.log("lesson added"))
             .catch((err) => console.log(err))
            },
            
        async removeOrderAtCheckout(){
            


            }

        


    }

});

app.mount("#App");