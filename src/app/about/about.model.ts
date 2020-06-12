export class About{
  public image: any
  public imageName: string;
  public graduate: string;
  public interestsTech: string;
  public interestsNonTech: string;
  public explainWebsite: string;
  public goals: string;
  public resume: any;

  constructor(image: any, imageName: string, graduate: string, interestsTech: string, interestsNonTech: string, explainWebsite: string, goals: string, resume: string)
  {
    this.image = image;
    this.imageName = imageName;
    this.graduate = graduate;
    this.interestsTech = interestsTech;
    this.interestsNonTech = interestsNonTech;
    this.explainWebsite = explainWebsite;
    this.goals = goals;
    this.resume = resume;
  }
}
