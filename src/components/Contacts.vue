<template>
  <div id="contact-list">
    <ul v-bind="contacts" v-for="(contact, index) in contacts" @click="edit(index)" :key="index" class="con">
      <li>{{ contact.firstname }} {{ contact.lastname }} </li>
      <li v-for="email in contact.email" :key="email"  >{{ email }} </li>
      <li v-for="number in contact.phoneNumber" :key="number">{{ number }} </li>
    </ul>
  <!-- Your solution here -->
  </div>
</template>
<script>
import { ContactBus } from '../bus/ContactBus'

export default {
  name: 'Contact',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    edit: function (index) {
      ContactBus.$emit('editCon', index)
    }
  },
  props: {
    contacts: {
      type: Array
    }
  }
}
</script>
<style scoped>
ul {
  list-style-type:none;
}
ul li {
  display: inline-block;
  min-width: 200px;
  max-width: 300px;
}
</style>
