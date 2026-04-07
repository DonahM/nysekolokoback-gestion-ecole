import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const exception = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    return new HttpException(
      {
        message: 'Invalid reference',
        prismaErrorCode: error.code,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: error.message,
      },
    );
  }
  return error;
};

export default exception;
