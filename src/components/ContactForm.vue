<template>
  <form v-show="visible">
    <label>First Name</label>
    <input id="fname" type="text" v-model="contact.firstname">
    <label>Last Name</label>
    <input id="lname" type="text" v-model="contact.lastname">
    <div id="email">
      <label>Email</label>
      <input type="text" v-for="(addr, index) in contact.email" v-model="contact.email[index]" :key="index">
      <button id="btnAddEMail" @click.prevent="addEmail">Add email</button>
    </div>
    <div id="phone">
      <label>Phone</label>
      <input type="text" @keyup="purgeNumber(index)" v-for="(number, index) in contact.phoneNumber" v-model="contact.phoneNumber[index]" :key="index">
      <button id="btnAddNumber" @click.prevent="addPhone">Add Phone</button>
    </div>
    <div>
      <button id="btnSubmit" @click.prevent="submit">Submit</button>
      <button id="btnDelete" v-show="!newCon" @click.prevent="removeContact">Delete Contact</button>
      <button id="btnCancel" @click.prevent="cancel">Cancel</button>
    </div>
  </form>
</template>

<script>
/**
 * Event bus for contact
 */
import { ContactBus } from '../bus/ContactBus'

export default {
  name: 'ContactForm',
  props: {
    contact: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean
    },
    newCon: {
      type: Boolean
    },
    index: {
      type: [Number, String]
    }
  },
  computed: {
    validatedEmail: function () {
      /**
       * Returns false if any email
       * in contact.email array is invalid
       * and true otherwise
       */
      // const re = /\S+@\S+\.\S+/
      // return this.contact.email.every(val => re.test(val))
      return true
    },
    validatedPhone: function () {
      /**
       * Returns false if a phone number
       * in contact.phoneNumber array is
       * invalid and true otherwise
       */
      return true
      // const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g
      // return this.contact.phoneNumber.every(val => re.test(val))
    }
  },
  methods: {
    submit: function () {
      if (this.contact.firstname && this.contact.lastname) {
        if (this.validatedEmail || this.validatedPhone) {
          ContactBus.$emit('addCon', this.contact)
        } else {
          ContactBus.$emit('noAddCon', [])
        }
      } else {
        ContactBus.$emit('noAddCon', [])
      }
    },
    purgeNumber: function (index) {
      this.contact.phoneNumber[index] = this.contact.phoneNumber[index].replace(/\D/g, '')
    },
    cancel: function () {
      ContactBus.$emit('close', true)
    },
    removeContact: function () {
      ContactBus.$emit('delCon', this.index)
    },
    addEmail: function () {
      /**
       * Appends empty string to the end of
       * contact.email array
       */
      this.contact.email = [
        ...this.contact.email, '']
    },
    addPhone: function () {
      /**
       * Appends empty string to the end of
       * contact.phoneNumber array
       */
      this.contact.phoneNumber = [
        ...this.contact.phoneNumber, ''
      ]
    }
  }
}
</script>

<style scoped>
form {
  margin: 30px;
}
input {
  margin: 20px 10px;
}
</style>
