import { mount, shallowMount } from '@vue/test-utils'
import ContactForm from '@/components/ContactForm.vue'
import Vue from 'vue'
import App from '@/App.vue'

describe('App', () => {
  it('should be an object', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(typeof vm.contacts).toEqual('object')
  })

  it('should be equal to 2', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[0].id).toEqual(2)
  })

  it('should be equal to John', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[0].firstname).toEqual('John')
  })

  it('should be equal to Brown', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[0].lastname).toEqual('Brown')
  })

  it('should be equal to Burrell', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[1].lastname).toEqual('Burrell')
  })
})

describe('Computed', () => {
  it('should filter contacts', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    vm.query = 'm'
    expect(vm.search.length).toEqual(5)
  })

  it('should filter contacts, case of query should not matter', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    vm.query = 'M'
    expect(vm.search.length).toEqual(5)
  })

  it('should filter contacts by phone', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    vm.query = '313'
    expect(vm.search.length).toEqual(1)
  })
})

describe('Sorting', () => {
  it('should display the third element (index=2) with id=5', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[2].id).toEqual(5)
  })

  it('should display the third element (index=2) with firstname=randy', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.contacts[2].firstname.toLowerCase()).toEqual('randy')
  })
})

describe('ContactBubble Directive', () => {
  it('should have background colour defined', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.style.backgroundColor.toLowerCase()).toEqual('rgb(159, 159, 199)')
  })

  it('should have font size 20px', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.style.fontSize.toLowerCase()).toEqual('20px')
  })
})

describe('CreateContact', () => {
  it('should have property visible = false by default', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.formSettings.visible).toEqual(false)
  })

  it('should have property newCon = false by default', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.formSettings.newCon).toEqual(false)
  })

  it('should not add a new contact if empty form was submitted', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.contacts.length).toEqual(5)
    wrapper.find('button').trigger('click')
    wrapper.find('#btnSubmit').trigger('click')
    expect(wrapper.vm.contacts.length).toEqual(5)
  })
})

describe('DeleteContact', () => {
  it('should delete a contact if a contact was chosen and "delete contact" was clicked', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.contacts.length).toEqual(5)
    wrapper.find('#contact-list ul').trigger('click')
    
    const appForm = shallowMount(ContactForm, {
      propsData: {
        contact: {}
      }
    })

    appForm.find('#btnDelete').trigger('click')
    expect(wrapper.vm.contacts.length).toEqual(4)
  })
})

describe('Filtering Contacts', () => {
  it('should display filtered contacts if search input was set', async () => {
    const wrapper = mount(App)
    expect(wrapper.findAll('#contact-list ul')).toHaveLength(5)
    expect(wrapper.find('#contact-list ul').text()).toContain("John Brown")
    
    await wrapper.find("#search").setValue("kai")

    expect(wrapper.findAll('#contact-list ul')).toHaveLength(1)
    expect(wrapper.find('#contact-list ul').text()).not.toContain("John Brown")
    expect(wrapper.find('#contact-list ul').text()).toContain("Kaien")
  })
})

describe('ContactForm', () => {
  it('should display 2 inputs for emails after clicked "add number" once', () => {
    const wrapper = shallowMount(ContactForm, {
      propsData: {
        contact: {
          id: 1,
          firstname: '',
          lastname: '',
          email: [''],
          phoneNumber: ['']
        }
      }})
    wrapper.find('#btnAddEMail').trigger('click')
    expect(wrapper.vm.contact.email.length).toEqual(2)
  })

  it('should display 3 inputs for numbers after clicked "add number" twice', async () => {
    const wrapper = shallowMount(ContactForm, {
      propsData: {
        contact: {
          id: 1,
          firstname: '',
          lastname: '',
          email: [''],
          phoneNumber: ['2345']
        }
      }})
    const addNumber = wrapper.find('#btnAddNumber')

    await addNumber.trigger('click')
    await addNumber.trigger('click')
    await Vue.nextTick()

    expect(wrapper.vm.contact.phoneNumber.length).toEqual(3)
  })
})

