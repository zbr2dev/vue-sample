<template >
    <div class="import-block d-flex flex-column justify-center" v-cloak @drop.prevent="loadFile" @dragover.prevent>
      <DownloadIcon class="import-icon"/>
      <span class="import-text">Drag&Drop files here</span>
      <span class="import-subtext">or</span>

      <ui-button type="dark-border" class="import-btn">
        <input class="import-block-input" @change="loadBrowseFile" id="file-input" type="file" ref="file">
        <label class="import-block-label" for="file-input">Browse Files</label>
      </ui-button>

        <a @click="downloadTemplated" download class="import-link"> Download template</a>

    </div>
</template>

<script>
import UiButton from '@/components/UI/UiButton.vue';
import DownloadIcon from '@/components/UI/DownloadIcon.vue';
import { createNamespacedHelpers } from 'vuex';
import { importContactList, downloadTemplated } from '@/store/modules/contacts/constants';

const {
  mapActions: mapBookingsActions,
  mapGetters: mapContactsGetters,
} = createNamespacedHelpers('contacts');

export default {
  name: 'GroupForm',
  components: { DownloadIcon, UiButton },
  data() {
    return {
      files: undefined,
      showModalTroubles: false,
    };
  },
  computed: {
    ...mapContactsGetters(['getDownloadTemplatedLink']),
  },
  methods: {
    ...mapBookingsActions([importContactList, downloadTemplated]),
    loadBrowseFile() {
      const { files } = this.$refs.file;
      this.loadFile(null, files);
    },

    loadFile(e, browseFile = null) {
      const droppedFiles = browseFile || e.dataTransfer.files;
      const filterFile = [...droppedFiles].filter((file) => file.name.slice(-4) === 'xlsx');
      if (!filterFile) return;
      // eslint-disable-next-line consistent-return
      if (filterFile.length > 1) return alert('Please load one file');
      const formData = new FormData();
      const file = filterFile[0];
      formData.append('file', file, file.name);
      this.files = formData;
      this.$emit('getImportFile', formData);
    },

    onCloseTroublesModal(value) {
      this.showModalTroubles = value;
    },

    onOpenTroublesModal(value) {
      this.showModalTroubles = value;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/variables.scss";

.import-icon{
  margin: auto;
  color: $grey;
}

.import-text {
  margin: 17px auto 0;
  color: $grey;
  font-weight: 400;
  font-size: 14px;
}

.import-subtext {
  margin: 5px auto;
  color: $grey;
  font-weight: 400;
  font-size: 12px;
}

.import-block{
  margin: auto;

  &-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    position: absolute;
    z-index: -10;
  }

  &-label {
    &:hover{
      cursor: pointer;
    }
  }
}

.import-link {
  color: #005FEE !important;
  text-decoration: none;
  font-size:  12px;
  font-weight: 600;
  margin: 5px auto;
  cursor: pointer;
}

.import-btn {
  width: 150px !important;
  height: 28px !important;
  font-size: 12px;
  padding: 0 !important;
  margin: auto;
}
</style>
