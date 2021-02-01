<template>
  <div class="details-wrapper">
    <div class="contact">
      <div v-show="!isDisconnectModalVisible && !isDeleteModalVisible && !isAddLocationVisible && !isAddCreditCardVisible">
        <div class="d-flex justify-space-between">
          <img
            class="pointer"
            src="~@/assets/img/arrow-left.svg"
            alt="Arrow left"
            @click="handleArrowLeftClick"
          />
          <v-icon v-if="!editMode" v-show="this.getCurrentContactStatus === 0 || this.getCurrentContactStatus === 1" @click="editContact">mdi-pencil</v-icon>
          <v-icon v-else v-show="this.getCurrentContactStatus === 0 || this.getCurrentContactStatus === 1" @click="cancelEditContact">mdi-close</v-icon>
        </div>

        <section class="contact__main main d-flex justify-space-between">
          <div class="d-flex">
            <div>
              <img v-if="this.getCurrentContact.photoBase64" class="contact__img" :src="'data:image/jpeg;base64,' + this.getCurrentContact.photoBase64" alt="User logo" />
              <img v-else src="../../assets/img/avatar_placeholder.png" class="contact__img"/>
            </div>

            <div class="main__info d-flex flex-column">
              <div v-if="!editMode" class="main_row">
                <span class="contact__name">{{this.getCurrentContact.name}}</span>
                <span class="main__label" v-if="this.getCurrentContact.id"> ID: {{this.getCurrentContact.id.slice(-8)}} </span>
              </div>
              <div v-else class="contact__form-block">
                <base-input
                  v-model="updateContact.name"
                  class="contact__form-input"
                  :placeholder="'John Doe'" />
              </div>

              <div v-if="!editMode" class="main__row">
                <span class="main__label">Phone number</span>
                <span>{{this.getCurrentContact.phone}}</span>
              </div>
              <div v-else class="contact__form-block">
                <base-input
                  v-model="updateContact.phone"
                  class="contact__form-input"
                  :placeholder="'Phone'" />
              </div>

              <div v-if="!editMode" class="main__row">
                <span class="main__label">Email</span>
                <span>{{this.getCurrentContact.email}}</span>
              </div>
              <div v-else class="contact__form-block">
                <base-input
                  v-model="updateContact.email"
                  class="contact__form-input"
                  :placeholder="'Email'" />
              </div>

              <div class="main__row">
                <span class="main__label">Created</span>
                <span>{{getFormatData(this.getCurrentContact.dateTimeCreated)}}</span>
              </div>

            </div>
          </div>

          <div v-if="this.getCurrentContactStatus === 3" class="d-flex flex-column">
            <div class="d-flex align-center contact__main-connect">
              <span class="main__label connect" >Connected</span>
              <trexoz-connect class="status__status" :width="25" :height="25"/>
            </div>

            <div class="contact__leave-comment" >
              <v-icon color="black">mdi-comment</v-icon>
            </div>
          </div>
        </section>

        <section class="contact__preferences preferences">
          <div class="preferences__title d-flex justify-space-between" @click.stop="triggerPreferencesVisible">
            <span>Trip preferences</span>
            <v-icon color="black" v-if="isPreferencesVisible">mdi-chevron-down</v-icon>
            <v-icon color="black" v-else>mdi-chevron-up</v-icon>
          </div>
          <v-divider />

          <slide-up-down :active="Boolean(isPreferencesVisible)">
            <div style="margin-top: 32px;display: grid; grid-template-columns: 300px 1fr; grid-gap: 32px; height: 70px;">
              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.homeAdress || 400, color: updateContact.homeAdress || 'black', 'margin-right': '5px' }">Home address</span>
                  <button v-if="updateContact.homeAdress && editMode" @click="showAddLocationModal('home')" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div class="preferences__value">
                  <div v-if="!updateContact.homeAdress && editMode" @click="showAddLocationModal('home')" class="d-flex align-center">
                    <add-icon :height="16" :width="16" style="margin-right: 5px" /> <span style="font-weight: bold">Add address</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span>{{updateContact.homeAdress}}</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.homeAdressNotes || 400, color: updateContact.homeAdressNotes || 'black', 'margin-right': '5px' }">Notes</span>
                  <button v-if="editMode" @click="isEditHomeAddressNotes" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div>

                  <div v-if="editMode" class="main__row">

                    <span v-if="!editHomeAddressNotes && editMode" style="font-size: 14px">{{updateContact.homeAdressNotes}}</span>

                    <div v-if="editHomeAddressNotes" class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.homeAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'Work Address Notes'" />
                    </div>
                  </div>

                  <div v-else class="main__row">
                    <span style="font-size: 14px">{{updateContact.homeAdressNotes || 'No notes'}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top: 32px;display: grid; grid-template-columns: 300px 1fr; grid-gap: 32px; height: 70px;">
              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdress || 400, color: updateContact.workAdress || 'black', 'margin-right': '5px' }">Work address</span>
                  <button v-if="updateContact.workAdress && editMode" @click="showAddLocationModal('work')" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div class="preferences__value">
                  <div v-if="!updateContact.workAdress && editMode" @click="showAddLocationModal('work')" class="d-flex align-center">
                    <add-icon :height="16" :width="16" style="margin-right: 5px" /> <span style="font-weight: bold">Add address</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span> {{updateContact.workAdress}}</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdressNotes || 400, color: updateContact.workAdressNotes || 'black', 'margin-right': '5px' }">Notes</span>
                  <button v-if="editMode" @click="isEditWorkAddressNotes" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div>

                  <div v-if="editMode" class="main__row">

                    <span v-if="!editWorkAddressNotes" style="font-size: 14px">{{updateContact.workAdressNotes}}</span>

                    <div v-else class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.workAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'Work Address Notes'" />
                    </div>
                  </div>

                  <div v-else class="main__row">
                    <span style="font-size: 14px">{{updateContact.workAdressNotes || 'No notes'}}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact__preferences-options d-flex justify-space-between" style="margin-top: 50px ">
              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Temperature
                </div>

                <v-radio-group v-if="editMode" v-model="radioGroupTemperature">
                  <v-radio
                    v-for="( el, i ) in 3"
                    color="black"
                    :key="i"
                    :label="temperature[el - 1]"
                    :value="el"
                  ></v-radio>
                  <temperature-input
                    v-if="radioGroupTemperature > 1"
                    v-model="temperatureValue"
                    class="contact__preferences-option__radio-temperature"/>
                </v-radio-group>
                <span v-else style="font-size: 12px">{{ temperature[radioGroupTemperature - 1] }}</span>
              </div>

              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Conversation
                </div>
                <v-radio-group v-if="editMode" v-model="radioGroupConversation">
                  <v-radio
                    v-for="( el, i ) in 3"
                    color="black"
                    :key="i"
                    :label="conversation[el - 1]"
                    :value="el"
                  ></v-radio>
                </v-radio-group>
                <span v-else style="font-size: 12px">{{ conversation[radioGroupConversation - 1] }}</span>
              </div>

              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Front passenger seat
                </div>
                <v-radio-group v-if="editMode" v-model="radioGroupPassenger">
                  <v-radio
                    v-for="( el, i ) in 2"
                    color="black"
                    :key="i"
                    :label="passenger[el - 1]"
                    :value="el"
                  ></v-radio>
                </v-radio-group>
                <span v-else style="font-size: 12px">{{ passenger[radioGroupPassenger - 1] }}</span>
              </div>
            </div>
          </slide-up-down>
        </section>

        <section class="contact__preferences preferences">
          <div class="preferences__title d-flex justify-space-between" @click.stop="triggerPaymentsVisible">
            <span>Payment options</span>
            <v-icon color="black" v-if="isPaymentsVisible">mdi-chevron-down</v-icon>
            <v-icon color="black" v-else>mdi-chevron-up</v-icon>
          </div>
          <v-divider />

          <slide-up-down :active="Boolean(isPaymentsVisible)">
            <div class="d-flex justify-end mt-4" style="cursor: pointer" @click="showAddCreditCard">
              <add-icon :width="20" :height="20"/>
            </div>
          </slide-up-down>
        </section>

        <div class="d-flex justify-space-between mt-8">

          <div v-if="this.getCurrentContactStatus === 3" class="contact__delete" @click="showDisconnectModal">
            Disconnect contact
          </div>
          <div v-else class="contact__delete" @click="showDeleteModal">
            Delete contact
          </div>

          <div class="d-flex justify-center" v-if="this.editMode">
            <ui-button type="dark-border" class="add-contact__buttons-btn" @click="editContact">Cancel</ui-button>
            <ui-button class="add-contact__buttons-btn" @click="updateContactOnBackend">Save</ui-button>
          </div>
        </div>
      </div>

      <AddLocation
        v-show="isAddLocationVisible"
        :place="howEditPlace"
        @showAddLocationModal="showAddLocationModal"
        @changeAddress="onChangeAddress"
      />

      <AddCreditCard
        v-show="isAddCreditCardVisible"
        @showAddCreditCard="showAddCreditCard"
      />

      <div class="disconnect" v-show="isDisconnectModalVisible">
        <h3 class="disconnect__title">
          Disconnect contact
        </h3>
        <div class="disconnect__text">
          Are you sure you want to disconnect this contact?
        </div>

        <div class="disconnect__buttons">
          <ui-button type="dark-border" size="small" @click="showDisconnectModal">No</ui-button>
          <ui-button size="small" @click="handleDisconnectContact">Yes</ui-button>
        </div>
      </div>

      <div class="disconnect" v-show="isDeleteModalVisible">
        <h3 class="disconnect__title">
          Delete contact
        </h3>
        <div class="disconnect__text">
          All data associated with this contact will be permanently lost, are you sure you want to delete this contact?
        </div>

        <div class="disconnect__buttons">
          <ui-button type="dark-border" size="small" @click="cancelEditContact">No</ui-button>
          <ui-button size="small" @click="handleDeleteContact">Yes</ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ConfirmDisconnectContactModal from '@/components/myContacts/ConfirmDisconnectContactModal.vue';
import { createNamespacedHelpers } from 'vuex';
import {
  getContactDetail, addContact, disconnectContact, removeContact,
} from '@/store/modules/contacts/constants';
import SlideUpDown from 'vue-slide-up-down';
import BaseInput from '@/components/UI/inputs/BaseInput.vue';
import AddIcon from '@/components/UI/icons/AddIcon.vue';
import PencilIcon from '@/components/UI/icons/PencilIcon.vue';
import BaseTextarea from '@/components/UI/inputs/BaseTextarea.vue';
import TemperatureInput from '@/components/UI/inputs/TemperatureInput.vue';
import UiButton from '@/components/UI/UiButton.vue';
import TrexozConnect from '@/components/UI/TrexozConnect.vue';
import AddLocation from '@/views/myDetails/AddLocation.vue';
import AddCreditCard from '@/views/myDetails/AddCreditCard.vue';

const {
  mapGetters: mapContactsGetters,
  mapActions: mapContactsActions,
} = createNamespacedHelpers('contacts');

export default {
  name: 'MyDetailedContact',
  components: {
    AddLocation, SlideUpDown, BaseInput, UiButton, TemperatureInput, TrexozConnect, BaseTextarea, AddIcon, PencilIcon, AddCreditCard,
  },
  data() {
    return {
      currentSelectedPlace: '',
      status: 0,
      isDisconnectModalVisible: false,
      isDeleteModalVisible: false,
      isAddLocationVisible: false,
      isAddCreditCardVisible: false,
      addLocalAddress: false,
      temperatureValue: 72,
      editMode: false,
      editHomeAddress: false,
      editWorkAddress: false,
      editHomeAddressNotes: false,
      editWorkAddressNotes: false,
      isPreferencesVisible: false,
      isPaymentsVisible: false,
      updateContact: {},
      radioGroupTemperature: 1,
      radioGroupConversation: 1,
      radioGroupPassenger: 1,
      temperature: ['No preferences', 'Warm', 'Cool'],
      conversation: ['No preferences', 'I like to talk', 'I prefer quietness'],
      passenger: ['No preferences', 'Move forward'],
    };
  },
  computed: {
    ...mapContactsGetters(['getCurrentContact', 'getCurrentContactStatus']),
    howEditPlace() {
      return (this.editHomeAddress && 'homeAdress') || (this.editWorkAddress && 'workAdress');
    },
  },
  methods: {
    ...mapContactsActions([getContactDetail, addContact, disconnectContact, removeContact]),
    onChangeAddress({ place, address, edit }) {
      this.updateContact[place] = address;
      if (edit === 'work') this.isEditWorkAddress();
      if (edit === 'home') this.isEditHomeAddress();
    },
    handleArrowLeftClick() {
      this.$router.push('/my-contacts');
    },
    showDisconnectModal() {
      this.isDisconnectModalVisible = !this.isDisconnectModalVisible;
    },
    showAddLocationModal(place) {
      if (place === 'work') {
        if (this.editHomeAddress) this.isEditHomeAddress();
        this.isEditWorkAddress();
      }
      if (place === 'home') {
        if (this.editWorkAddress) this.isEditWorkAddress();
        this.isEditHomeAddress();
      }
      this.isAddLocationVisible = !this.isAddLocationVisible;
    },
    showAddCreditCard() {
      this.isAddCreditCardVisible = !this.isAddCreditCardVisible;
    },
    showDeleteModal() {
      this.isDeleteModalVisible = !this.isDeleteModalVisible;
    },
    editContact() {
      this.editMode = !this.editMode;
    },
    cancelEditContact() {
      const stateDate = JSON.parse(JSON.stringify(this.getCurrentContact));
      const {
        email,
        name,
        phone,
      } = stateDate;
      const {
        homeAdress, workAdress, homeAdressNotes, workAdressNotes,
      } = stateDate.tripPreferences;
      const contactData = {
        email,
        name,
        phone,
        homeAdress: homeAdress || '',
        workAdress: workAdress || '',
        homeAdressNotes: homeAdressNotes || '',
        workAdressNotes: workAdressNotes || '',
      };
      this.updateContact = contactData;
      this.editMode = !this.editMode;
    },
    handleDisconnectContact() {
      this.disconnectContact(this.getCurrentContact.id);
      this.$router.push('../my-contacts');
    },
    handleDeleteContact() {
      this.removeContact(this.getCurrentContact.id);
      this.$router.push('../my-contacts');
    },
    async updateContactOnBackend() {
      await this.addContact([this.updateContact]);
      this.editMode = false;
      await this.getContactDetail({ id: this.getCurrentContact.id, status: this.getCurrentContactStatus });
    },
    getFormatData(date) {
      const newDate = new Date(Number(date));
      const dateString = newDate.toDateString();
      const setDateFormat = dateString.split(' ').splice(1);

      return `${setDateFormat[0]} ${setDateFormat[1]}, ${setDateFormat[2]}`;
    },
    triggerPreferencesVisible() {
      this.isPreferencesVisible = !this.isPreferencesVisible;
    },
    triggerPaymentsVisible() {
      this.isPaymentsVisible = !this.isPaymentsVisible;
    },
    isEditWorkAddressNotes() {
      this.editWorkAddressNotes = !this.editWorkAddressNotes;
    },
    isEditHomeAddressNotes() {
      this.editHomeAddressNotes = !this.editHomeAddressNotes;
    },
    isEditWorkAddress() {
      this.editWorkAddress = !this.editWorkAddress;
    },
    isEditHomeAddress() {
      this.editHomeAddress = !this.editHomeAddress;
    },
  },
  watch: {
    getCurrentContact: {
      immediate: true,
      handler(data) {
        console.log(data);
        const stateDate = JSON.parse(JSON.stringify(data));
        const {
          id,
          email,
          name,
          phone,
        } = stateDate;
        const {
          homeAdress, workAdress, homeAdressNotes, workAdressNotes,
        } = stateDate.tripPreferences;

        function isNullData(str) {
          if (str === null) return '';
          return str;
        }

        const contactData = {
          id,
          email,
          name,
          phone,
          homeAdress: isNullData(homeAdress),
          workAdress: isNullData(workAdress),
          homeAdressNotes: isNullData(homeAdressNotes),
          workAdressNotes: isNullData(workAdressNotes),
        };
        this.updateContact = contactData;
      },
    },
    getCurrentContactStatus(data) {
      console.log(data);
      this.status = data;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.details-wrapper {
  .contact {
    &__main {
      margin-top: 22px;
      height: 130px;
      display: flex;
    }

    &__name {
      font-weight: bold;
    }

    &__leave-comment {
      text-align: end;
    }

    &__main-connect {
      margin-bottom: 10px;
    }

    .connect {
      margin-right: 5px;
      font-size: 14px;
    }

    &__status {
      width: 25px !important;
      height: 25px !important;
    }

    &__img {
      $size: 112px;
      width: $size;
      height: $size;
      border-radius: 50%;
    }

    &__delete {
      color: #ee0000;
      cursor: pointer;
    }

    &__form-input {
      .base-input__input {
        height: 25px !important;
      }
    }

    &__form-block:nth-child(2n) {
      margin: 15px 0;
    }

    &__form-item {
      position: relative;

      &::after {
        content: '•';
        color: #C7511F;
        position: absolute;
        right: -7px;
        top: -5px;
      }
    }

    &__block {
      width: 100%;
    }

    &__form-input {
      width: 100% !important;

      .base-input__body {
        border: 1px solid black;
        border-radius: 4px;
      }

      .base-input__input {
        &:focus {
          border: none;
        }
      }
    }
  }

  .contact__main.main {
    @at-root #{&} .main {
      // It will compile in .contact__main.main .main__info
      &__info {
        margin-left: 24px;
      }

      &__contact-name {
        font-weight: 600;
        font-size: 14px;
      }

      &__row {
        font-size: 14px;

        &:nth-child(2n) {
          margin: 10px 0;
        }
      }

      &__label {
        margin-right: 5px;
        color: #7E7E7E;
      }
    }
  }

  .contact__preferences.preferences {
    @at-root #{&} .preferences {
      &__title {
        margin-top: 24px;
        font-family: $Montserrat;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      }

      &__row {
        display: grid;
        align-self: baseline;
        grid-gap: 8px;
      }

      &__label {
        color: $grey;
        font-size: 12px;
      }

      &__value {
        font-size: 14px;
      }
    }
  }

  .contact__preferences-option__radio {
    position: relative;
    height: 135px;
    width: 150px;

    &-temperature {
      position: absolute;
      width: 80px;
      right: -35px;
      bottom: 5px;
      border: 1px solid #000;
      border-radius: 5px;
    }

    .v-icon {
      font-size: 20px;
    }

    .v-label {
      font-size: 14px;
    }
  }

  .disconnect {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {

    }

    &__text {
      margin-top: 16px;
      margin-bottom: 24px;
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      max-width: 500px;
    }

    &__buttons {
      display: grid;
      align-items: center;
      grid-template-columns: minmax(110px, 120px) minmax(110px, 120px);
      grid-gap: 8px;
    }
  }
}
.pencil-button {
  outline: none;
}
</style>
