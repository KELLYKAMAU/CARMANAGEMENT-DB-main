
export interface Location {
  Id: number;
  Name: string;
  Address: string;
  ContactNumber?: string | null;
}

export type CreateLocationDTO = {
  Name: string;
  Address: string;
  ContactNumber?: string | null;
};

export type UpdateLocationDTO = Partial<CreateLocationDTO>;
