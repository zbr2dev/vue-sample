<template>
  <div class="block trips">
    <div class="block__type-panel">
      <div class="block__type-list">
        <ui-button size="small" type="dark">All contacts ({{this.contactsFilter.length}})</ui-button>
        <ui-button size="small" type="grey">Individuals (0)</ui-button>
        <ui-button size="small" type="grey">Groups (0)</ui-button>
      </div>
      <router-link style="text-decoration: none" to="/add-new-contact"><plus-btn/></router-link>
    </div>

    <div class="block__filters-panel block__filters-panel-contacts">
      <search-input v-model="searchString" @search="updateCounter++"/>
      <contact-statuses-select v-model="contactStatus" @input="updateCounter++"/>
      <sort-by-select v-model="sortValue" @input="updateCounter++"/>
    </div>

    <div class="trips__list-wrapper">
      <my-contact-card
        v-for="(user, index) in this.contactsFilter"
        :key="index"
        :user="user"
        @detailsClick="handleDetailsClick"
        @inviteWithText="handleInviteWithTextClick"
        @inviteWithEmail="handleInviteWithEmailClick"
        @connectWithUser="handleConnectClick"
      />
    </div>
  </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import ContactStatusesSelect from '@/components/selects/ContactStatusesSelect/ContactStatusesSelect.vue';
import SortBySelect from '@/components/selects/SortBySelect/SortBySelect.vue';
import PlusBtn from '@/components/UI/PlusBtn.vue';
import MyContactCard from '@/components/myContacts/MyContactCard.vue';
import SearchInput from '@/components/UI/inputs/SearchInput.vue';
import { createNamespacedHelpers } from 'vuex';
import {
  getContactList,
  getContactDetail,
  sendInviteWithText,
  sendInviteWithEmail, connectContact,
} from '@/store/modules/contacts/constants';

const {
  mapState: mapContactsState,
  mapGetters: mapContactsGetters,
  mapMutations: mapContactsMutations,
  mapActions: mapContactsActions,
} = createNamespacedHelpers('contacts');

export default {
  name: 'Contacts',
  components: {
    SearchInput,
    MyContactCard,
    PlusBtn,
    SortBySelect,
    ContactStatusesSelect,
    UiButton,
  },
  data() {
    return {
      contactStatus: 'All Statuses',
      sortValue: 'Newest',
      drivers: [],
      updateCounter: 0,
      searchString: '',
    };
  },
  computed: {
    ...mapContactsState(['contacts']),
    ...mapContactsGetters(['getContacts']),
    contactsFilter() {
      const contacts = [...this.getContacts];
      // if (this.sortValue === 'Latest') contacts.sort();
      // if (this.sortValue === 'A-Z') contacts.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      // if (this.sortValue === 'Z-A') contacts.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1));
      //
      // if (this.contactStatus === 0) return contacts;
      // if (this.contactStatus === 1) return contacts.filter((el) => el.status === 0 || el.status === 1);
      return contacts;
    },
    getQueryObject() {
      return {
        limit: 10,
        offset: 0,
        // eslint-disable-next-line no-nested-ternary
        status: this.contactStatus === 0 ? null : this.contactStatus === 1 ? 'NotConnect' : this.contactStatus === 2 ? 'Pending' : this.contactStatus === 3 ? 'Connected' : null,
        order: this.sortValue.replace('-', ''),
        find: this.searchString ? this.searchString : null,
      };
    },
  },
  mounted() {
    this.getContactList({ limit: 10, offset: 0 });
  },
  watch: {
    updateCounter() {
      this.getContactList(this.getQueryObject);
    },
  },
  methods: {
    ...mapContactsMutations([]),
    ...mapContactsActions([getContactList, getContactDetail, sendInviteWithText, sendInviteWithEmail, connectContact]),
    async handleDetailsClick(data) {
      await this.getContactDetail(data);
      this.$router.push(`/my-contacts/${data.id}}`);
    },
    handleInviteWithTextClick(id) {
      this.sendInviteWithText(id);
    },
    handleInviteWithEmailClick(id) {
      this.sendInviteWithEmail(id);
    },
    handleConnectClick(id) {
      this.connectContact(id);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "styles";
  .trips {
    &__list-wrapper {
      margin-top: 50px;
      border-bottom: 1px solid #D4D4D4;
    }
  }
</style>
