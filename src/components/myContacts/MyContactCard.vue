<template>
  <div :class="{opened: isMyPassengersVisible || isContactActionsVisible}" @click.stop="triggerContactActionVisibility">
    <div class="card contact" :class="{action: isContactActionsVisible}" >
      <div class="card__logo">
        <img v-if="user.photoBase64" class="card__logo-img--rounded" :src="'data:image/jpeg;base64,' + user.photoBase64" alt="User logo" />
        <img v-else src="../../assets/img/avatar_placeholder.png" class="card__logo-img--rounded"/>
      </div>

      <div class="contact__full-name" :key="user.status">
        {{user.name}}
        <span class="item__icon"><slot></slot></span>
        <v-tooltip color="rgb(255, 255, 255)" nudge-right="50" width="200" top>
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="status-container"
            >
              <trexoz-connect class="status" v-if="user.status === 3"/>
              <trexoz-pending class="status" v-if="user.status === 2"/>
            </div>
          </template>
          <span class="status-container-text" v-if="user.status === 3">You are connected with this user</span>
          <span class="status-container-text" v-if="user.status === 2">Pending connection</span>
        </v-tooltip>
      </div>

      <div class="contact__info">
        <div v-if="user.phone">{{user.phone}}</div>
        <div v-if="user.email">{{user.email}}</div>
      </div>

      <div class="card__passengers-count" v-if="user.passengers" @click.stop="triggerMyPassengersVisibility">
        <span>+ {{ user.passengers.length }} passengers</span>
        <v-icon color="black" :class="['card__arrow',
          {
            'card__arrow--opened': isMyPassengersVisible,
            'card__arrow--closed': !isMyPassengersVisible
          }
          ]"
        >mdi-chevron-left</v-icon>
      </div>

      <div class="card__leave-comment" >
        <v-icon v-if="!user.connect" color="black">mdi-comment</v-icon>
      </div>

      <ui-button
        type="dark-border"
        size="small"
        style="margin-left: 19px; align-self: center; min-width: 106px"
        @click="$emit('detailsClick', user)"
      >
        Details
      </ui-button>
    </div>

    <slide-up-down :active="Boolean(isContactActionsVisible)" :style="isContactActionsVisible ? '' : 'padding-top: 0; padding-bottom:0;'" class="contact-action-btn">
      <div class="invite" v-if="user.status === 0">
        <ui-button
          type="dark"
          size="small"
          :disabled="isInvitedWithPhone"
          style="margin: 10px 0; width: 145px"
          @click.stop="$emit('inviteWithText', user.id); isInvitedWithPhone = true;"
          v-if="user.phone"
        >
          Send invite text
        </ui-button>
        <ui-button
          type="dark"
          size="small"
          :disabled="isInvitedWithEmail"
          @click.stop="$emit('inviteWithEmail', user.id); isInvitedWithEmail = true;"
          v-if="user.email"
        >
          Send invite email
        </ui-button>
      </div>
        <ui-button
          v-else-if="user.status === 1"
          type="dark"
          size="small"
          :disabled="isInvitedToConnect"
          @click.stop="$emit('connectWithUser', user.id); isInvitedToConnect = true;"
        >
          Connect
        </ui-button>
    </slide-up-down>

    <slide-up-down :active="Boolean(isMyPassengersVisible && user.passengers)">
      <my-contacts-list :passengers="user.passengers" />
    </slide-up-down>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
import UiButton from '@/components/UI/UiButton.vue';
import MyContactsList from '@/components/myContacts/MyContactsList.vue';
import TrexozConnect from '@/components/UI/TrexozConnect.vue';
import TrexozPending from '@/components/UI/TrexozPending.vue';

export default {
  name: 'MyContactCard',
  components: {
    MyContactsList, UiButton, SlideUpDown, TrexozConnect, TrexozPending,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      isMyPassengersVisible: false,
      isContactActionsVisible: false,
      isInvitedWithPhone: false,
      isInvitedWithEmail: false,
      isInvitedToConnect: false,
    };
  },
  methods: {
    triggerMyPassengersVisibility() {
      this.isMyPassengersVisible = !this.isMyPassengersVisible;
    },
    triggerContactActionVisibility() {
      this.isContactActionsVisible = !this.isContactActionsVisible;
    },
    log() {
      console.log(this.user);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../myTripsDetails/styles";
@import "~@/assets/styles/variables.scss";

.card {
  padding: 15px;
  &__logo {
    flex-basis: auto;
  }

  &__logo-img--rounded {
    $size: 50px;
    width: 50px;
    height: 50px;
  }
  &__leave-comment {
    width: 24px;
    height: 24px;
  }

  &__passengers-count {
    margin: 0 auto;
    align-self: center;
    font-family: $Montserrat;
    font-size: 14px;
    font-weight: 600;
    color: #333333;
    cursor: pointer;
  }
}

.status-container {
  height: 15px;
  padding-left: 15px;

  &-text {
    background: none;
    border-radius: 2px;
    color: black;
    font-size: 10px;
  }
}

.action {
  border-bottom: none;
}

.opened {
  background: $light-grey;
}

.contact-action-btn {
  padding: 10px 0 10px 16px;
}

.contact {
  &__full-name {
    width: 150px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    font-family: $Montserrat;
    font-size: 14px;
    font-weight: 600;
  }

  &__info {
    display: grid;
    align-items: center;
    grid-gap: 8px;
    font-size: 14px;
  }
}
</style>
