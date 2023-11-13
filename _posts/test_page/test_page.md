### test

:::escape
<div id="vue-app">
  <div>{{ message }}</div>
  <div>count: {{ count }}</div>
  <button class="plus-btn" @click="count++">plus 1!</button>
</div>
:::

```
<div id=\"vue-app\" data-v-app=\"\">
<div>hello vue</div>
<div>count: 0</div>
<button class=\"plus-btn\">plus 1!</button>
</div>"
 Client: 
 "<div id=\"vue-app\">\n
 <div>{{ message }}</div>\n
 <div>count: {{ count }}</div>\n
 <button class=\"plus-btn\" @click=\"count++\">
 plus 1!
 </button>\n
 </div>
```

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.8/vue.global.min.js" integrity="sha512-KIbZu0J3AOx0bmI4fHEpxyM6/YKIRBgCXDrrF0OBFTHvjDeAZ/vBIvVqZwdehD7dJN228/7lK9KJ55k4ZziQTA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
  const app = Vue.createApp({data() {
    return {
      count: 0,
      message: 'hello vue'
    }
  }})
  app.mount('#vue-app')
</script>

<style>
.plus-btn {
  border: 1px solid gray;
  border-radius: 7px;
  padding: 10px;
  background: #fff;
}
</style>
