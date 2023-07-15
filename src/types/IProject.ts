export interface IProjectResources {
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
  resources: IProjectResources[],
  coordinates: IProjectCoordinates,
  images: string[],
};
