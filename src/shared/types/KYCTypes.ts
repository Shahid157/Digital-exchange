// eslint-disable-next-line import/prefer-default-export, no-shadow
export enum KycVerificationStatusEnum {
  DELETED = 'deleted', // Able  to start a new verification flow
  REJECTED = 'rejected', // rejected, talk to support team
  VERIFIED = 'verified', // OK
  NON_VERIFIED = 'nonVerified', // Able  to start a new verification flow
  REVIEW_NEEDED = 'reviewNeeded', // in progress
}
