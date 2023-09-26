import {
  HttpStatus,
  HttpException,
  Logger,
  BadRequestException,
} from "@nestjs/common";
import axios from "axios";
import { Config } from "src/config";
import { CMS_LOGS_SLACK_CHANNEL } from "src/libs/constants";

interface FileValidationProps {
  supportedFormats: string[];
  maxFileSize: number;
  file;
}

const handleDbErrors = (err) => {
  //foreign key voiation error
  if (err.number === 547) {
    // Handle foreign key violation error here
    throw new BadRequestException("Invalid Foreign Key");
  }
  //duplicate value
  else if (err.number === 2627 || err.number === 2601) {
    throw new BadRequestException("DB duplicate error value already exists");
  }
};

export const handleErrorCatch = (err, source?: string) => {
  handleDbErrors(err);

  if (
    err.status === HttpStatus.NOT_FOUND ||
    err.status === HttpStatus.BAD_REQUEST ||
    err.status === HttpStatus.UNAUTHORIZED ||
    err.status === HttpStatus.FORBIDDEN ||
    err.status === HttpStatus.CONFLICT
  ) {
    throw new HttpException(
      {
        status: err.status,
        error: err.response.message || err.response.error,
      },
      err.status
    );
  }

  if (source) {
    sendLogMessageToSlack(
      CMS_LOGS_SLACK_CHANNEL,
      JSON.stringify({
        source: source,
        err: {
          message: err.message,
          stack: err.stack,
        },
      })
    );
  }

  throw new HttpException(
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: `An error occured with the message: ${err.message}`,
    },
    HttpStatus.INTERNAL_SERVER_ERROR
  );
};

export const sendLogMessageToSlack = (channel: string, messsage: string) => {
  try {
    const slackUrl = "https://slack.com/api/chat.postMessage";
    axios.post(
      slackUrl,
      {
        channel,
        text: messsage,
      },
      { headers: { authorization: `Bearer ${Config.SLACK_TOKEN}` } }
    );
  } catch (err) {
    Logger.log(`Error sending slack message: ${err.message}`);
  }
};

export const validateFile = (fileValidationProps: FileValidationProps) => {
  if (!fileValidationProps.file) {
    throw new BadRequestException("no file detected");
  }

  const checkFormat = fileValidationProps.supportedFormats.find(
    (format) => format == fileValidationProps.file.mimetype
  );

  if (!checkFormat) {
    throw new BadRequestException("file format not supported");
  }

  //900kb 900 000
  if (fileValidationProps.file.size > fileValidationProps.maxFileSize) {
    throw new BadRequestException("file too large");
  }
};
