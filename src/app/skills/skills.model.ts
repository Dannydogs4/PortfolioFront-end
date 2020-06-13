// Author: Daniel Skwarcha

export class Skills{

  image: any;
  imageDescription: string;
  programmingLanguages: string[];
  frameworks: string[];
  ide: string[];
  databases: string[];
  constructor(image: any, imageDescription: string, programmingLanguages: string[], frameworks: string[], ide: string[], databases: string[]){
    this.image = image;
    this.imageDescription = imageDescription;
    this.programmingLanguages = programmingLanguages;
    this.frameworks = frameworks;
    this.ide = ide;
    this.databases = databases;
  }
}

