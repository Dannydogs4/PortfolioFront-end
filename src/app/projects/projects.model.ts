export interface projectsInterface{
  gitHubLink: string;
  imageDescription: string;
  imageGif: any;
  projectLink: string;

}
export class Projects{
  image: any;
  imageDescription: string;
  projectsInterface: projectsInterface[][];
  constructor(image: any, imageDescription: string, projectsInterface: projectsInterface[][]){
    this.image = image;
    this.imageDescription = imageDescription;
    this.projectsInterface = projectsInterface;
  }
}
