<template>
  <div class="details-wrapper">
    <div class="contact">
      <div v-show="!isDisconnectModalVisible && !loader && !isAddNewAvatarVisible && !isEditEmailAndPhone && !isDeleteModalVisible && !isAddLocationVisible && !isAddCreditCardVisible">
        <div class="d-flex justify-space-between">
          <img
            class="pointer"
            src="~@/assets/img/arrow-left.svg"
            alt="Arrow left"
            @click="handleArrowLeftClick"
          />
         </div>

        <section class="contact__main main d-flex">
          <div class="d-flex">
            <div @click="updateProfileAvatar">
              <img v-if="this.updateContact.photoBase64 || this.getProfileAvatar" class="contact__img" :src="this.getProfileAvatar || `data:image/jpeg;base64,${this.updateContact.photoBase64}`" alt="User logo" />
              <img v-else src="../../assets/img/avatar_placeholder.png" class="contact__img"/>
            </div>

            <div class="main__info d-flex flex-column">
              <div class="main_row">
                <span class="contact__name">{{this.updateContact.name}}</span>
                <span class="main__label" v-if="this.updateContact.id"> ID: {{this.updateContact.id.slice(-8)}} </span>
              </div>

              <div class="main__row">
                <span class="main__label">Phone number</span>
                <span>{{this.updateContact.phone}}</span>
              </div>

              <div class="main__row">
                <span class="main__label">Email</span>
                <span>{{this.updateContact.email}}</span>
              </div>

              <div class="main__row">
                <span class="main__label">Created</span>
                <span>{{createData}}</span>
              </div>
            </div>
          </div>
          <button @click="showEditEmailAndPhone" class="pencil-button">
            <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
          </button>
        </section>
        <!-- Preference -->
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
                  <button @click="showAddLocationModal('home')" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div class="preferences__value">
                  <div v-if="!updateContact.homeAdress" @click="showAddLocationModal('home')" class="d-flex align-center">
                    <span style="font-weight: bold">Not Address</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span>{{updateContact.homeAdress}}</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.homeAdressNotes || 400, color: updateContact.homeAdressNotes || 'black', 'margin-right': '5px' }">Notes</span>
                  <button @click="isEditHomeAddressNotes" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div>

                  <div class="main__row">

                    <span v-if="!preference.editHomeAddressNotes" style="font-size: 14px">{{updateContact.homeAdressNotes || 'No notes'}}</span>

                    <div v-if="preference.editHomeAddressNotes" class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.homeAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'Work Address Notes'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top: 32px;display: grid; grid-template-columns: 300px 1fr; grid-gap: 32px; height: 70px;">
              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdress || 400, color: updateContact.workAdress || 'black', 'margin-right': '5px' }">Work address</span>
                  <button @click="showAddLocationModal('work')" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div class="preferences__value">
                  <div v-if="!updateContact.workAdress " @click="showAddLocationModal('work')" class="d-flex align-center">
                    <span style="font-weight: bold">Not Address</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span> {{updateContact.workAdress}}</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdressNotes || 400, color: updateContact.workAdressNotes || 'black', 'margin-right': '5px' }">Notes</span>
                  <button @click="isEditWorkAddressNotes" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <div>

                  <div class="main__row">

                    <span v-if="!preference.editWorkAddressNotes" style="font-size: 14px">{{updateContact.workAdressNotes || 'No notes'}}</span>

                    <div v-else class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.workAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'Work Address Notes'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact__preferences-options d-flex justify-space-between" style="margin-top: 50px ">
              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Temperature
                  <button @click="isEditTemperature" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>

                <v-radio-group v-if="preference.editTemperature" v-model="updateContact.temperatureLevel">
                  <v-radio
                    class="radio"
                    v-for="( el, i ) in 3"
                    color="black"
                    :key="i"
                    :label="preference.temperature[el - 1]"
                    :value="el - 1"
                  ></v-radio>
                  <temperature-input
                    v-if="updateContact.temperatureLevel === 1"
                    v-model="updateContact.temperatureWarm"
                    class="contact__preferences-option__radio-temperature"/>
                  <temperature-input
                    v-if="updateContact.temperatureLevel === 2"
                    v-model="updateContact.temperatureCool"
                    class="contact__preferences-option__radio-temperature"/>
                </v-radio-group>
                <span v-else style="font-size: 12px">
                  {{preference.temperature[updateContact.temperatureLevel] || preference.passenger[0]}}
                  {{updateContact.temperatureLevel === 1 ? `${updateContact.temperatureWarm}°F`: null }}
                  {{updateContact.temperatureLevel === 2 ? `${updateContact.temperatureCool}°F`: null }}
                </span>
              </div>

              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Conversation
                  <button @click="isEditConversation" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <v-radio-group v-if="preference.editConversation"  v-model="updateContact.conversationLevel">
                  <v-radio
                    class="radio"
                    v-for="( el, i ) in 3"
                    color="black"
                    :key="i"
                    :label="preference.conversation[el - 1]"
                    :value="el - 1"
                  ></v-radio>
                </v-radio-group>
                <span v-else style="font-size: 12px">{{ preference.conversation[updateContact.conversationLevel] || preference.passenger[0] }}</span>
              </div>

              <div class="contact__preferences-option__radio">
                <div class="preferences__label">
                  Front passenger seat
                  <button @click="isEditPassenger" class="pencil-button">
                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />
                  </button>
                </div>
                <v-radio-group v-if="preference.editPassenger" v-model="updateContact.frontPassengerSeat">
                  <v-radio
                    class="radio"
                    v-for="( el, i ) in 2"
                    color="black"
                    :key="i"
                    :label="preference.passenger[el - 1]"
                    :value="el - 1"
                  ></v-radio>
                </v-radio-group>
                <span v-else style="font-size: 12px">{{ preference.passenger[updateContact.frontPassengerSeat] || preference.passenger[0] }}</span>
              </div>
            </div>
          </slide-up-down>
        </section>

        <!-- Service -->
        <section class="contact__preferences preferences">
          <div class="preferences__title d-flex justify-space-between" @click.stop="triggerServiceProvideVisible">
            <span>Service Provider</span>
            <v-icon color="black" v-if="isPreferencesVisible">mdi-chevron-down</v-icon>
            <v-icon color="black" v-else>mdi-chevron-up</v-icon>
          </div>
          <v-divider />

          <slide-up-down :active="Boolean(isServiceProvideVisible)">
            <div style="margin-top: 32px;display: grid; grid-template-columns: 300px 1fr; grid-gap: 32px; height: 70px;">
              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.homeAdress || 400, 'margin-right': '5px' }">Purus at</span>
<!--                  <button @click="() => { }" class="pencil-button">-->
<!--                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />-->
<!--                  </button>-->
                </div>
                <div class="preferences__value">
                  <div v-if="false" class="d-flex align-center">
                    <span style="font-weight: bold">No text</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span>Consequat enim ac</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': service.estvel || 400, 'margin-right': '5px' }">Est vel</span>
<!--                  <button @click="() => {}" class="pencil-button">-->
<!--                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />-->
<!--                  </button>-->
                </div>
                <div>

                  <div class="main__row">

                    <p v-if="true" style="font-size: 14px">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor </p>

                    <div v-if="service.estvel" class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.homeAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'text'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top: 32px;display: grid; grid-template-columns: 300px 1fr; grid-gap: 32px; height: 70px;">
              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdress || 400, 'margin-right': '5px' }">Mauris tristique</span>
<!--                  <button @click="() => {}" class="pencil-button">-->
<!--                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />-->
<!--                  </button>-->
                </div>
                <div class="preferences__value">
                  <div v-if="false" class="d-flex align-center">
                    <span style="font-weight: bold">No Text</span>
                  </div>
                  <div v-else class="d-flex align-center">
                    <span> Bibendum ullamcorper turpis</span>
                  </div>
                </div>
              </div>

              <div class="preferences__row">
                <div class="preferences__label">
                  <span :style="{'font-weight': updateContact.workAdressNotes || 400, 'margin-right': '5px' }">Senectus fermentum</span>
<!--                  <button @click="() => {}" class="pencil-button">-->
<!--                    <pencil-icon style="cursor: pointer;"  :height="12" :width="12" />-->
<!--                  </button>-->
                </div>
                <div>

                  <div class="main__row">

                    <span v-if="true" style="font-size: 14px; max-width: 400px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor </span>

                    <div v-else class="contact__form-block">
                      <base-textarea
                        v-model="updateContact.workAdressNotes"
                        class="contact__form-input"
                        :maxLength="140"
                        :placeholder="'Text'" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slide-up-down>
        </section>

        <!-- Payment -->
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

        <!-- Security -->
        <section class="contact__preferences preferences">
          <div class="preferences__title d-flex justify-space-between" @click.stop="triggerSecurityVisible">
            <span>Security</span>
            <v-icon color="black" v-if="isSecurityVisible">mdi-chevron-down</v-icon>
            <v-icon color="black" v-else>mdi-chevron-up</v-icon>
          </div>
          <v-divider />

          <slide-up-down :active="Boolean(isSecurityVisible)">
            <v-switch
              class="switch"
              color="secondary"
              v-model="authentication"
              inset
              :label="`Two-Factor Authentication`"
            ></v-switch
>         <div>
            <a href="#" style="color: #00b0ff"> Settings</a>
          </div>
          </slide-up-down>
        </section>

        <div class="d-flex justify-end" >
          <ui-button type="dark-border" class="add-contact__buttons-btn" @click="() => {this.$router.push({name: 'Home'})}">Cancel</ui-button>
          <ui-button class="add-contact__buttons-btn" @click="updateProfileOnBackend">Save</ui-button>
        </div>
      </div>

      <AddLocation
        v-if="isAddLocationVisible"
        :place="howEditPlace"
        @showAddLocationModal="showAddLocationModal"
        @changeAddress="onChangeAddress"
      />
      <EditEmailAndPhone
        v-show="isEditEmailAndPhone"
        :email="updateContact.email"
        :name="updateContact.name"
        :phone="updateContact.phone"
        @showEditEmailAndPhone="showEditEmailAndPhone"
        @onChangeEmailAndPhone="onChangeEmailAndPhone"
      />
      <AddCreditCard
        v-show="isAddCreditCardVisible"
        @showAddCreditCard="showAddCreditCard"
      />
      <div v-show='loader' class="d-flex justify-center align-center loader">
        <v-progress-circular
          v-show='loader'
          :size="100"
          :width="10"
          color="teal"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
// import ConfirmDisconnectContactModal from '@/components/myContacts/ConfirmDisconnectContactModal.vue';
import { createNamespacedHelpers, mapState } from 'vuex';
import SlideUpDown from 'vue-slide-up-down';
import AddIcon from '@/components/UI/icons/AddIcon.vue';
import PencilIcon from '@/components/UI/icons/PencilIcon.vue';
import BaseTextarea from '@/components/UI/inputs/BaseTextarea.vue';
import TemperatureInput from '@/components/UI/inputs/TemperatureInput.vue';
import AddLocation from '@/views/myDetails/AddLocation.vue';
import AddCreditCard from '@/views/myDetails/AddCreditCard.vue';
import EditEmailAndPhone from '@/views/myDetails/EditEmailAndPhone.vue';
import UiButton from '@/components/UI/UiButton.vue';

const {
  mapGetters: mapProfileGetters,
  mapActions: mapProfileActions,
} = createNamespacedHelpers('profile');

export default {
  name: 'MyDetailedProfile',
  components: {
    AddLocation, SlideUpDown, EditEmailAndPhone, TemperatureInput, BaseTextarea, AddIcon, PencilIcon, AddCreditCard, UiButton,
  },
  data() {
    return {
      currentSelectedPlace: '',
      createdData: null,
      loader: true,
      photo: null,
      newAvatar: null,
      status: 0,
      isDisconnectModalVisible: false,
      isDeleteModalVisible: false,
      isAddLocationVisible: false,
      isAddNewAvatarVisible: false,
      isAddCreditCardVisible: false,
      isEditEmailAndPhone: false,
      authentication: false,
      preference: {
        addLocalAddress: false,
        // input
        editHomeAddress: false,
        editWorkAddress: false,
        editHomeAddressNotes: false,
        editWorkAddressNotes: false,
        // radio
        radioGroupTemperature: 1,
        radioGroupConversation: 1,
        radioGroupPassenger: 1,
        editPassenger: false,
        editConversation: false,
        editTemperature: false,
        temperatureValue: 72,
        temperature: ['No preferences', 'Warm', 'Cool'],
        conversation: ['No preferences', 'I like to talk', 'I prefer quietness'],
        passenger: ['No preferences', 'Move forward'],
      },
      service: {
        purus: '',
        mauris: '',
        estvel: '',
        senectus: '',
        // input
        editPurus: false,
        editMauris: false,
        editEstvel: false,
        editSenectus: false,
      },
      isPreferencesVisible: true,
      isPaymentsVisible: true,
      isServiceProvideVisible: true,
      isSecurityVisible: true,
      updateContact: {},
    };
  },
  computed: {
    ...mapProfileGetters(['getProfileData']),
    ...mapState({
      userProfile: (state) => state.auth.userProfile,
    }),
    createData() {
      const data = this.createdData;
      const newDate = new Date(Number(data));
      const dateString = newDate.toDateString();
      const setDateFormat = dateString.split(' ')
        .splice(1);
      return `${setDateFormat[0]} ${setDateFormat[1]}, ${setDateFormat[2]}`;
    },
    howEditPlace() {
      return (this.preference.editHomeAddress && 'homeAdress') || (this.preference.editWorkAddress && 'workAdress');
    },
  },
  updated() {
    if (this.getFormatData) {
      this.loader = false;
    }
  },
  async mounted() {
    await this.getMyProfileDetail(this.$route.params.id.slice(0, -1));
  },
  methods: {
    ...mapProfileActions(['getMyProfileDetail', 'putCurrentProfileDetail']),
    async updateProfileOnBackend() {
      const id = this.userProfile.UserId;
      await this.putCurrentProfileDetail({ id, ...this.updateContact });
    },
    updateProfileAvatar() {
      this.$router.push('/edit-photo');
    },
    onChangeAddress({ place, address, edit }) {
      this.updateContact[place] = address;
      if (edit === 'work') this.isEditWorkAddress();
      if (edit === 'home') this.isEditHomeAddress();
    },
    onChangeEmailAndPhone({ name, email, phone }) {
      this.updateContact.name = name;
      this.updateContact.email = email;
      this.updateContact.phone = phone;
      this.isEditEmailAndPhone = false;
    },
    onChangeAvatar(avatar) {
      this.photo = avatar;
      this.newAvatar = null;
      this.isAddNewAvatarVisible = false;
    },

    showEditEmailAndPhone() {
      this.isEditEmailAndPhone = !this.isEditEmailAndPhone;
    },
    showAddNewAvatar() {
      this.isAddNewAvatarVisible = !this.isAddNewAvatarVisible;
    },
    handleArrowLeftClick() {
      this.$router.back();
    },
    showDisconnectModal() {
      this.isDisconnectModalVisible = !this.isDisconnectModalVisible;
    },
    showAddLocationModal(place) {
      if (place === 'work') {
        if (this.preference.editHomeAddress) this.isEditHomeAddress();
        this.isEditWorkAddress();
      }
      if (place === 'home') {
        if (this.preference.editWorkAddress) this.isEditWorkAddress();
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
    cancelEditContact() {
      const stateDate = JSON.parse(JSON.stringify(this.getProfileData));
      const {
        email,
        name,
        phone,
        photoBase64,
      } = stateDate;
      // debugger;
      const contactData = {
        photoBase64,
        email,
        name,
        phone,
        tripPreferences: stateDate.tripPreferences,
        // tripPreferences: {
        //   homeAdress: homeAdress || undefined,
        //   workAdress: workAdress || undefined,
        //   homeAdressNotes: homeAdressNotes || undefined,
        //   workAdressNotes: workAdressNotes || undefined,
        //   temperatureCool: temperatureCool || undefined,
        //   temperatureWarm: temperatureWarm || undefined,
        // },
      };
      this.updateContact = contactData;
    },
    getFormatData(date) {
      const newDate = new Date(Number(date));
      const dateString = newDate.toDateString();
      const setDateFormat = dateString.split(' ')
        .splice(1);

      return `${setDateFormat[0]} ${setDateFormat[1]}, ${setDateFormat[2]}`;
    },
    triggerPreferencesVisible() {
      this.isPreferencesVisible = !this.isPreferencesVisible;
    },
    triggerPaymentsVisible() {
      this.isPaymentsVisible = !this.isPaymentsVisible;
    },
    triggerSecurityVisible() {
      this.isSecurityVisible = !this.isSecurityVisible;
    },
    triggerServiceProvideVisible() {
      this.isServiceProvideVisible = !this.isServiceProvideVisible;
    },
    isEditWorkAddressNotes() {
      this.preference.editWorkAddressNotes = !this.preference.editWorkAddressNotes;
    },
    isEditHomeAddressNotes() {
      this.preference.editHomeAddressNotes = !this.preference.editHomeAddressNotes;
    },
    isEditWorkAddress() {
      this.preference.editWorkAddress = !this.preference.editWorkAddress;
    },
    isEditHomeAddress() {
      this.preference.editHomeAddress = !this.preference.editHomeAddress;
    },

    isEditPassenger() {
      this.preference.editPassenger = !this.preference.editPassenger;
      this.preference.editTemperature = false;
      this.preference.editConversation = false;
    },
    isEditTemperature() {
      this.preference.editTemperature = !this.preference.editTemperature;
      this.preference.editPassenger = false;
      this.preference.editConversation = false;
    },
    isEditConversation() {
      this.preference.editConversation = !this.preference.editConversation;
      this.preference.editTemperature = false;
      this.preference.editPassenger = false;
    },
  },
  watch: {
    getProfileData: {
      handler(data) {
        const stateDate = JSON.parse(JSON.stringify(data));
        const {
          photoBase64,
          id,
          email,
          name,
          phone,
          dateTimeCreated,
        } = stateDate;

        function isNullData(str) {
          if (str === null) return '';
          return str;
        }
        const {
          homeAdress, workAdress, homeAdressNotes, workAdressNotes,
          conversationLevel, frontPassengerSeat, temperatureCool,
          temperatureWarm, temperatureLevel,
        } = stateDate.tripPreferences;

        const contactData = {
          conversationLevel,
          frontPassengerSeat,
          temperatureCool,
          temperatureWarm,
          temperatureLevel,
          photoBase64,
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
        this.createdData = dateTimeCreated;
      },
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";
.details-wrapper {
  .contact {
    .loader {
      margin-top: 200px;
    }

    .switch {
      .v-input--switch__track {
        width: 40px;
        height: 17px !important;
      }

      .v-label {
        top: -5px;
        left: -5px !important;
      }

      .v-input--selection-controls__ripple {
        &::before {
          content: none !important;
        }
      }

      .v-input--switch__thumb {
        top: calc(50% - 12.5px) !important;
        height: 12px !important;
        width: 12px !important;
      }
    }

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
    &:hover {
      .pencil-button {
        opacity: 1;
        height: 20px !important;
      }
    }

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

        &:hover {
          .pencil-button {
            opacity: 1;
          }
        }
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
    width: 150px;
    height: 100% !important;

    &:first-child {
      position: relative;
    }

    .v-input__control {
      display: block;
    }

    &:hover {
      .pencil-button {
        opacity: 1;
      }
    }

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
  opacity: 0;
  outline: none;
}
</style>
