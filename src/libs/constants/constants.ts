export const AUTH_SERVICE_NAME = "auth";
export const UTILITY_SERVICE_NAME = "utility";
export const UNIT_OF_WORK_PROVIDER = "unit_of_work";
export const CMS_LOGS_SLACK_CHANNEL = "cms-proj-logs";
export const AZURE_STORAGE_BASE_URL =
  "https://abitestingresourcead2c.blob.core.windows.net/abicmsstore/";

export const CMS_AI_URL =
  "https://5f59-102-89-45-124.ngrok-free.app/deeptech/api/process_file";

export const DOCUMENT_REPO_CSV_EXPECTED_HEADER = [
  "title",
  "contractType",
  "initiatedBy",
  "value",
  "startDate",
  "expirationDate",
  "renewalDate",
  "vendor",
  "vendorEmail",
  "vendorSigner",
  "initiatorDepartment",
  "legalSigner",
  "contractApprover",
];

export const Events = {
  DOCUMENT_REPO_CSV_FILE_UPLOADED_TO_STORAGE:
    "document-repo-csv-file-uploaded-to-storage",
  DOCUMENT_ADDED_TO_CONTRACT: "document-added-to-contract",
  REPO_DOCUMENT_UPLOADED : "repo-document-uploaded"
};

export enum InjectionTokens {
  EMAIL_CLIENT = 'EMAIL_CLIENT',
}