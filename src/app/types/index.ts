export interface Book {
    _id: string;
    title: string;
    ISBN: string;
    publishedDate: Date;
    stockQuantity: number;
  }
  
  export interface Author {
    _id: string;
    name: string;
    biography: string;
    dateOfBirth: Date;
    numberOfBooksPublished: number;
  }
  