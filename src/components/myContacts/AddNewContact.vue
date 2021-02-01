<template>
  <div class="add-contact">
    <div>
      <img
        class="pointer"
        src="~@/assets/img/arrow-left.svg"
        alt="Arrow left"
        @click="handleArrowLeftClick"
      />
    </div>

    <div class="d-flex justify-center header" >
      Adding new
    </div>
  <div v-show="!isConnectContact">
    <section  class="add-contact__main main d-flex justify-center">
      <div class="flex-column contact__block">
        <div class="add-contact__radio">
          <v-radio-group v-model="radioGroup">
            <v-radio
              v-for="( el, i ) in 3"
              color="black"
              :key="i"
              :label="radioLabel[el - 1]"
              :value="el"
            ></v-radio>
          </v-radio-group>
        </div>

        <section class="add-contact__body">
          <IndividualForm @setFormData="onFormData" v-if="radioGroup === 1"/>
          <GroupForm v-if="radioGroup === 2"/>
          <ImportContactForm v-if="radioGroup === 3" @getImportFile="getImportFile"/>
        </section>

        <div class="add-contact__buttons d-flex justify-center">
          <ui-button type="dark-border" class="add-contact__buttons-btn" @click="handleArrowLeftClick">Cancel</ui-button>
          <ui-button class="add-contact__buttons-btn" @click="handleAddClick">Add</ui-button>
        </div>
      </div>
    </section>
  </div>
    <div class="content__contact" v-show="isConnectContact">
      <div class="content__contact-wrapper">
        <span class="content__contact-text"> User with such phone number already exists in the system -
          would you like to connect with them?</span>
        <span class="content__contact-icon"><slot></slot></span>

        <v-tooltip top max-width="200" content-class="content__contact-tooltip" nudge-right="60">
          <template v-slot:activator="{ on, attrs }" class="content__contact-tooltip">
              <span
                class="content__contact-tooltip-icon"
                v-bind="attrs"
                v-on="on"
              >
                <QuestionMarkIcon />
              </span>
          </template>
          <span class="content__contact-tooltip-text">This will allow this contact to see any trips details they are associated with, automatically receive updates and live map location of the vehicle and chauffeur for their trip</span>
        </v-tooltip>
      </div>
      <div class="add-contact__buttons d-flex justify-center">
        <ui-button type="dark-border" class="add-contact__buttons-btn" @click="handleArrowLeftClick">No</ui-button>
        <ui-button class="add-contact__buttons-btn" @click="connectedContact">Yes</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import IndividualForm from '@/components/myContacts/IndividualForm.vue';
import QuestionMarkIcon from '@/components/UI/icons/QuestionMarkIcon.vue';
import GroupForm from '@/components/myContacts/GroupForm.vue';
import ImportContactForm from '@/components/myContacts/ImportContactForm.vue';
import {
  addContact, getContactList, importContactList, connectNewContact,
} from '@/store/modules/contacts/constants';
import { createNamespacedHelpers } from 'vuex';

const {
  mapActions: mapBookingsActions,
  mapGetters: mapContactsGetters,
} = createNamespacedHelpers('contacts');

export default {
  name: 'AddNewContact',
  components: {
    ImportContactForm, GroupForm, UiButton, IndividualForm, QuestionMarkIcon,
  },
  data() {
    return {
      isConnectContact: false,
      IndividualForm: {},
      contactData: {},
      files: undefined,
      radioGroup: 1,
      radioLabel: ['Individual', 'Group', 'Import contact list'],
      regEx: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };
  },
  computed: {
    ...mapContactsGetters(['getImportContacts', 'getNewContactData']),
  },
  methods: {
    ...mapBookingsActions([addContact, getContactList, importContactList, connectNewContact]),
    showConnectContact() {
      this.isConnectContact = !this.isConnectContact;
    },

    handleArrowLeftClick() {
      this.$router.push('/my-contacts');
    },

    handleAddClick() {
      if (this.radioGroup === 1) return this.addNewContact();
      if (this.radioGroup === 2) return null;
      if (this.radioGroup === 3) return this.addNewContactList();
      return null;
    },

    async connectedContact() {
      // try {
      console.log(this.contactData);
      const { id } = this.contactData;
      await this.connectNewContact(id);
      this.handleArrowLeftClick();
      // } catch (e) {
      //   this.handleArrowLeftClick();
      // }
    },

    getImportFile(file) {
      this.files = file;
      this.addNewContactList();
    },

    async addNewContact() {
      const isData = Object.keys(this.IndividualForm).length;
      // console.log(this.IndividualForm.email);
      // console.log(this.regEx.test(this.IndividualForm.email));
      if (this.IndividualForm.name.length === 0) return;
      if (!isData || !this.regEx.test(this.IndividualForm.email)) return;
      const dataToSend = JSON.parse(JSON.stringify(this.IndividualForm));
      if (this.IndividualForm.email === '') dataToSend.email = null;
      await this.addContact([dataToSend]);
      const { status } = this.contactData;
      if (status === 1) {
        this.showConnectContact();
        return;
      }
      this.handleArrowLeftClick();
    },

    async addNewContactList() {
      if (this.files === undefined) return;
      await this.importContactList(this.files);
      await this.addContact(this.getImportContacts);
      await this.getContactList();
      this.$router.push('/add-new-contact/success-import');
    },

    onFormData(data) {
      this.IndividualForm = data;
    },
  },
  watch: {
    getNewContactData(data) {
      this.contactData = data;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

.v-label {
  color: black !important;
}

.theme--light.v-icon {
  color: black;
}
.v-input--selection-controls__input:hover {
  background: none;
}

.header {;
  margin-top: -24px;
  font-weight: bold;
  font-size: 16px;
}
.content__contact-tooltip {
  background-color: white;
  height: 75px;
  line-height: 13px;
}

.content__contact {
  &-wrapper {
    width: 400px;
    margin: 25px auto 0 auto;
  }

  &-text {
    font-size: 14px;
  }

  &-tooltip {
    &-icon {
      vertical-align: middle;
      margin-left: 5px;
    }

    &-text {
      width: 200px;
      border-radius: 2px;
      color: black;
      font-size: 10px !important;
    }
  }
}

.add-contact {
  &__main {
    position: relative;
    margin: 25px auto auto;
    max-width: 600px;
  }

  &__body {
    height: 175px;
  }

  &__buttons {
    margin-top: 50px;

    &-btn {
      width: 170px !important;
      margin: 15px;
    }
  }

  &__required {
    position: absolute;
    right: 0;
    font-weight: 300;
    font-size: 12px;

    &::before {
      content: '•';
      color: #C7511F;
      position: absolute;
      left: -7px;
    }
  }
}
</style>
