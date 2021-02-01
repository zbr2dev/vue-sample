import * as queryString from 'qs';
import TrexozApi from '../common/TrexozApi';

class UserRelationshipApi extends TrexozApi {
  resource = '/UserRelationship';

  getCurrentProfilePhoto() {
    return this.get(`${this.resource}/SUStartScreen`);
  }

  createContact(data) {
    return this.put(`${this.resource}/CreateOrUpdateContact`, data);
  }

  getContactList(query) {
    const queryParams = queryString.stringify(query);
    return this.get(`${this.resource}/SUContactList?${queryParams}`);
  }

  getContactDetail(id) {
    return this.get(`${this.resource}/ContactDetail?contactId=${id}`);
  }

  downLoadTemplated() {
    return this.get(`${this.resource}/DownLoadTemplate`, { responseType: 'blob' });
  }

  getProfileDetail(userId) {
    return this.get(`${this.resource}/ProfileDetail?userId=${userId}`);
  }

  getCurrentProfileDetail(userId) {
    return this.get(`${this.resource}/CurrentProfile?connectUserId=${userId}`);
  }

  putCurrentProfileDetail(data) {
    const {
      name, homeAdress, workAdress, workAdressNotes, homeAdressNotes, conversationLevel, temperatureLevel, temperatureWarm, temperatureCool, frontPassengerSeat,
    } = data;
    const preparedObject = {
      name,
      tripPreferences: {
        homeAdress: homeAdress || undefined,
        workAdress: workAdress || undefined,
        homeAdressNotes: homeAdressNotes || undefined,
        workAdressNotes: workAdressNotes || undefined,
        conversationLevel,
        temperatureLevel,
        temperatureWarm,
        temperatureCool,
        frontPassengerSeat,
      },
    };

    return this.put(`${this.resource}/UpdateCurrentProfile`, preparedObject);
  }

  deleteContact(id) {
    return this.delete(`${this.resource}/Contact?id=${id}`);
  }

  uploadTemplate(file) {
    return this.put(`${this.resource}/UploadTemplate`, file, {
      'Content-Type': 'text/plain',
    });
  }

  uploadAvatar(file) {
    return this.put(`${this.resource}/CurrentProfilePhoto`, file, {
      'Content-Type': 'image/jpeg',
    });
  }

  connectContact(id) {
    return this.put(`${this.resource}/SendConnectAndInvite?connectUserId=${[id]}`);
  }

  disconnectContact(id) {
    return this.delete(`${this.resource}/DisconnectContact?id=${id}`);
  }

  inviteWithText(id) {
    return this.put(`${this.resource}/SendConnectAndInvite?invitePhoneUserId=${[id]}`);
  }

  inviteWithEmail(id) {
    return this.put(`${this.resource}/SendConnectAndInvite?inviteEmailUserId=${[id]}`);
  }
}

const userRelationshipApi = new UserRelationshipApi();
export default userRelationshipApi;
