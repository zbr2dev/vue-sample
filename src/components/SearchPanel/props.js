// eslint-disable-next-line import/prefer-default-export
import { LOADING_STATUSES } from '@/utils/constants';

export const dateType = {
  type: [Object, Date],
};

export const mapResultStatusType = {
  type: String,
  validate(newValue) {
    return [
      LOADING_STATUSES.SUCCESS,
      LOADING_STATUSES.FAILURE,
      LOADING_STATUSES.IDLE,
    ].includes(newValue);
  },
};

export const vehicleTypeTypes = {
  type: Array,
};
