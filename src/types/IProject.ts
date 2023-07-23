export interface IProjectResource {
  name: string,
  count: number,
};

export interface IProjectCoordinates {
  x: number,
  z: number,
}

export interface IProject {
  _id: string,
  name: string,
  creators: string[],
  description: string,
  resources: IProjectResource[],
  coordinates: IProjectCoordinates,
  images: string[],
  createdAt: Date,
  updatedAt: Date,
};
