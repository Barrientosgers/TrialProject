class Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;

  constructor(
    listingTitle: string,
    listingDescription: string,
    listingPrice: number,
    listingImage: string
  ) {
    this.title = listingTitle;
    this.description = listingDescription;
    this.price = listingPrice;
    this.image = listingImage;

    this.id = new Date().toISOString();
  }
}

export default Listing;
