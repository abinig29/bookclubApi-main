import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum BorrowStatus {
  Taken = 'BORROWED',
  WaitList = 'WAITLIST',
  Accepted = 'ACCEPTED',
  Returned = 'RETURNED',
}

@Schema({ timestamps: true })
export class Borrow {
  @ApiProperty({ name: 'id' })
  readonly _id: string;

  @IsOptional()
  @IsString()
  @Prop({ type: String, enum: Object.values(BorrowStatus), default: BorrowStatus.WaitList })
  status?: BorrowStatus;

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true, ref: 'User' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true, ref: 'Book' })
  bookId: string;

  @IsOptional()
  @Prop({ type: String })
  userName?: string;

  @IsOptional()
  @Prop({ type: String, ref: 'Donation' })
  instanceId?: string;

  @IsOptional()
  @IsString()
  @Prop({ type: String, required: false, ref: 'Donation' })
  instanceUid?: string;

  @IsOptional()
  @Prop({ type: String })
  bookName?: string;

  @IsOptional()
  @Prop({ type: String })
  note?: string;
  //requested date is got from timestamp

  @IsOptional()
  @Prop({ type: Date, required: false })
  takenDate?: Date; //Created Date

  @IsOptional()
  @Prop({ type: Date, required: false })
  returnedDate?: Date;

  @IsOptional()
  @Prop({ type: Date, required: false })
  dueDate?: Date;
}

export type BorrowDocument = Borrow & Document;
export const BorrowSchema = SchemaFactory.createForClass(Borrow);
// Create indexes
BorrowSchema.index({ name: 'text' });

export class BorrowAccept {
  @IsOptional()
  body: string;

  @IsNotEmpty()
  instanceId: string;
}

export class BookTaken {
  @IsOptional()
  note: string;

  @IsNotEmpty()
  takenDate: string;

  @IsNotEmpty()
  dueDate: string;
}

export class BookReturned {
  @IsNotEmpty()
  returnedDate: string;
}
