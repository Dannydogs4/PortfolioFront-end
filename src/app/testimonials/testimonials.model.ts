// Author: Daniel Skwarcha

interface TestimonialsInterface{
  quote: string;
  testimonial: string;
  author: string;
}
export class Testimonials{
  image: any;
  imageDescription: string;
  testimonials: TestimonialsInterface[];
  constructor(image: any, imageDescription: string, testimonials: TestimonialsInterface[]){
    this.image = image;
    this.imageDescription = imageDescription;
    this.testimonials = testimonials;
  }
}
